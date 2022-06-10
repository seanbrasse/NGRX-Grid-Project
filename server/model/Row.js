const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Row = new Schema(
  {
    id: {
      type: Number,
    },
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
