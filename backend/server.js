const app = require("./app");
const db = require("./config/database");


db.createConnection((err, connection) => {
  if (err) {
    if (err.code === "ECONNREFUSED") {
      console.error("Error: MySQL server not running.");
    } else {
      console.error("Error connecting to MySQL:", err);
    }
    return;
  }
  console.log("Connected to the database");
  if (connection) {
    db.releaseConnection(connection);
  }
});


require("dotenv").config({ path: "./config/.env" });

app.listen(process.env.PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", process.env.PORT);
});
