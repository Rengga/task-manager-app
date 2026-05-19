const express = require("express");
const router = express.Router();

const controller = require("../controllers/activityController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getLogs);

module.exports = router;
