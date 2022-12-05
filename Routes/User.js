const router = require("express").Router();
const passport = require("passport");
const UserController = require("../Controller/User");
router.post("/Signup", UserController.signup);
router.post("/Login", UserController.login);
router.get(
  "/Profile",
  passport.authenticate("jwt", { session: false }),
  UserController.profile
);
module.exports = router;
