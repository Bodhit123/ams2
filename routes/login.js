const express = require("express");
const router = express.Router();

const {loginController} = require("../controllers/LoginController");
router.route("/login/:user").post(loginController);

module.exports = router;