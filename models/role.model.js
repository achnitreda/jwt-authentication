const mongoose = require("mongoose");

const schema = new mongoose.Schema({ name: "string" });
const Role = mongoose.model("Role", schema);

module.exports = Role;
