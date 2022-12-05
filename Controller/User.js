const User = require("../Model/User");
const AppError = require("../AppError");
class UserController {
  signup = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({
        name,
        email,
        password,
      });
      const validateError = user.validateSync();
      if (validateError) {
        next(AppError.badRequest(validateError.message));
      }
      await user.save();
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        next(AppError.badRequest("Please provide email and password"));
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        next(AppError.unauthorized("Invalid credentials"));
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        next(AppError.unauthorized("Invalid credentials"));
      }
      const userToken = await user.getSignedJwtToken();
      user.password = undefined;
      return res.status(200).send({ user, userToken });
    } catch (err) {
      next(err);
    }
  };
  profile = async (req, res, next) => {
    try {
      return res.status(200).send(req.user);
    } catch (err) {
      next(err);
    }
  };
}
module.exports = new UserController();
