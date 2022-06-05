const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Row = new Schema(
  {
    id: {
      type: Number,
    },
    high_price: {
      type: Number,
    },
    low_price: {
      type: Number,
    },
    difference: {
      type: Number,
    },
  },
  {
    collection: "rows",
  }
);

module.exports = mongoose.model("Row", Row);
