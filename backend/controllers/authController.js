const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    db.query(
      "INSERT INTO users(username, password) VALUES (?, ?)",
      [username, hash],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Register berhasil",
        });
      },
    );
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Password salah",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        "SECRET_KEY",
        {
          expiresIn: "1d",
        },
      );

      res.json({
        token,
      });
    },
  );
};
