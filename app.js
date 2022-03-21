const express = require("express");
const app = express();
const path = require("path");
const adminRouter = require("./routes/admin.route");
const userRouter = require("./routes/user.route");
const mongoose = require("mongoose");
const port = process.env.PORT || 5555

const bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://root:root@cluster0.8em2i.mongodb.net/BookMyMeal?retryWrites=true&w=majority"
);

module.exports = mongoose.connection;

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("server Started");
});
