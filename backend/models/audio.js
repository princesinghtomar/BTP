var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const todoSchema = new Schema({
  inputtext: {
    type: String,
    required: true,
  },
  audioData: {
    type: String,
    required: true,
  },
  outputtext: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Au_dio", todoSchema);
