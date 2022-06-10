const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Row = new Schema(
  {
    highPrice: {
      type: Number,
    },
    lowPrice: {
      type: Number,
    },
  },
  {
    collection: "prices",
  }
);

module.exports = mongoose.model("Row", Row);
