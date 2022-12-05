const router = require("express").Router();

const UserController = require("../Controller/User");
router.post("/Signup", UserController.signup);
router.post("/Login", UserController.login);
module.exports = router;
