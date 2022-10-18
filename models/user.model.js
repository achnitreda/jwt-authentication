const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: "string",
  email: "string",
  password: "string",
  roles : [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});
const User = mongoose.model("User", schema);

module.exports = User;