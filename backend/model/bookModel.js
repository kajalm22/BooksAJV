const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a book name"],
    },

    number: {
      type: Number,
      required: [true, "Please add number of pages in the book"],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Books", bookSchema);
