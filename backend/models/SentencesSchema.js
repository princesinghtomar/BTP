var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  sentence: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Sentences", todoSchema);
