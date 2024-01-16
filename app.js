const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const teacherRoutes = require("./routes/teacher");
const authRoute = require("./routes/login");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api", authRoute);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/build/index.html"));
});

module.exports = app;

// const pathname = path.resolve(__dirname, "/build/index.html");
// console.log(pathname);