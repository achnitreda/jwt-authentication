const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // add catchAsync because it's async fn try catch
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body; // ES6

  // 1: check if email & pass exist
  if (!email || !password) {
    return next(new AppError("please provide email and pass", 400));
  }

  // 2: check user exist and pass correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPass(password, user.password))) {
    return next(new AppError("Incorrect PASS or EMAIL", 401));
  }

  // 3: if everything is ok, send token to the client
  const token = signToken(user._id);
  res.status(201).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1/ getting a token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token)

  if(!token){
    return(next(new AppError('you are not logged in, login to get access', 401)))
  }
  next();
});
