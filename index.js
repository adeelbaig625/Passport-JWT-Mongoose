const express = require("express");
const app = express();
const connectDB = require("./connectDb");
const passport = require("passport");
const port = 3000;
const User = require("./Model/User");
const UserRoutes = require("./Routes/User");
const ErrorHandler = require("./Middleware/ErrorHandler");
app.use(express.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/", UserRoutes);
app.use(ErrorHandler);
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
