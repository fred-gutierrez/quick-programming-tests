const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  skill_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["conceptual", "technical"],
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      option: String,
      correct: Boolean,
    },
  ],
});

module.exports = mongoose.model("questions", questionSchema);
