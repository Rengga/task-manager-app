const db = require("../config/db");

exports.getLogs = (req, res) => {
  db.query(
    "SELECT * FROM activity_logs WHERE user_id=? ORDER BY created_at DESC",
    [req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
};
