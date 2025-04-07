const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skill_name: String,
  skill_id: String,
});

module.exports = mongoose.model("skills", skillSchema);
