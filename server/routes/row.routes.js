const express = require("express");
const app = express();

const rowRoute = express.Router();
let Row = require("../model/Row");

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Add Row
rowRoute.route("/add-row").post((req, res, next) => {
  Row.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

rowRoute.route("/get-random").get((req, res) => {
  Row.updateMany(
    {},
    {
      highPrice: getRandomArbitrary(1, 500),
      lowPrice: getRandomArbitrary(1, 500),
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        Row.find({}, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
          }
        });
      }
    }
  );
});

// Get all Rows
rowRoute.route("/getAll").get((req, res) => {
  Row.find({}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Row
rowRoute.route("/read-row/:id").get((req, res) => {
  Row.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Row
rowRoute.route("/update-row/:id").put((req, res, next) => {
  Row.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Row updated successfully!");
      }
    }
  );
});

// Delete Row
rowRoute.route("/delete-row/:id").delete((req, res, next) => {
  Row.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = rowRoute;
