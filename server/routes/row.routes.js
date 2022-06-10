const express = require("express");
const app = express();

const rowRoute = express.Router();
let Row = require("../model/Row");

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
  Row.find({ id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Row
rowRoute.route("/update-row/:id").put((req, res, next) => {
  Row.findOneAndUpdate(
    {"id": req.params.id},
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Row updated successfully!");
      }
    }
  );
});

// Delete Row
rowRoute.route("/delete-row/:id").delete((req, res, next) => {
  Row.findOneAndRemove({ id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = rowRoute;
