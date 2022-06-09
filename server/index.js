let express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoDb = require("./database/db");

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected");
    },
    (error) => {
      console.log("Database error: " + error);
    }
  );

const rowRoute = require("./routes/row.routes");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// Static directory path **Needs to change, not too sure what this does yet
// app.use(
//   express.static(path.join(__dirname, "dist/angular-mean-crud-tutorial"))
// );

// API root
app.use("/api", rowRoute);

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});

// 404 Handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// Base Route
app.get("/", (req, res) => {
  res.send("Success??");
});

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "dist/angular-mean-crud-tutorial/index.html")
//   );
// });

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
