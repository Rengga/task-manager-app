const db = require("../config/db");

const saveLog = (userId, activity) => {
  db.query("INSERT INTO activity_logs(user_id, activity) VALUES (?, ?)", [
    userId,
    activity,
  ]);
};

exports.getTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
};

exports.createTask = (req, res) => {
  const { title, description, status, due_date } = req.body;

  db.query(
    `INSERT INTO tasks(user_id, title, description, status, due_date)
     VALUES (?, ?, ?, ?, ?)`,
    [req.user.id, title, description, status, due_date],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      saveLog(req.user.id, `Menambahkan task: ${title}`);

      res.json({
        message: "Task berhasil ditambahkan",
      });
    },
  );
};

exports.updateTask = (req, res) => {
  const { title, description, status, due_date } = req.body;

  db.query(
    `UPDATE tasks
     SET title=?, description=?, status=?, due_date=?
     WHERE id=? AND user_id=?`,
    [title, description, status, due_date, req.params.id, req.user.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      saveLog(req.user.id, `Update task: ${title}`);

      res.json({
        message: "Task berhasil diupdate",
      });
    },
  );
};

exports.deleteTask = (req, res) => {
  db.query(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      saveLog(req.user.id, `Menghapus task ID ${req.params.id}`);

      res.json({
        message: "Task berhasil dihapus",
      });
    },
  );
};

exports.getTaskById = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Task tidak ditemukan",
        });
      }

      res.json(result[0]);
    },
  );
};
