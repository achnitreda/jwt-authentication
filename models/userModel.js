const crypto = require('crypto');
const mongoose = require("mongoose");
const validator = require("validator");
const bycrpt = require("bcryptjs");

// name, email, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true /* Making sure that the email is unique. */,
    lowercase: true /* transform email to lowercase. */,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  role: {
    type: String,
    enum: ['user', 'mod', 'admin'],
    default : 'user'
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 8,
    /* Making sure that the password is not being sent back to the client. */
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // this is only work with create and save
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date
});

/* The above code is a pre-save hook. It is a function that runs before a document is saved to the
database. */
userSchema.pre("save", async function (next) {
  // Only run this fn if pass is modified or created "save"
  if (!this.isModified("password")) return next();

  // hash the pass with cost of 12
  this.password = await bycrpt.hash(this.password, 12);

  // delete passConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPass = async function (cadidatePass, userPass) {
  return await bycrpt.compare(cadidatePass, userPass);
};

userSchema.methods.createPassResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
