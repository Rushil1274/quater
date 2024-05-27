const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// Create a MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patinetRoutes");

app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);

app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM login WHERE `email`=? AND `password`=? AND `role`=?";
  db.query(
    sql,
    [req.body.email, req.body.password, req.body.role],
    (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ status: "Error", message: "Database error" });
      }
      if (data.length > 0) {
        const user = data[0];
        return res.json({
          status: "Success",
          user: { name: user.name, role: user.role },
        });
      } else {
        return res.json({ status: "Failed", message: "Invalid credentials" });
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO login (`name`, `email`, `password`, `role`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.role,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json({ status: "Error", message: "Error during signup" });
    }
    return res.json({ status: "Success", message: "Signup successful" });
  });
});

app.post("/forgotpassword", (req, res) => {
  const sql = "UPDATE login SET `password`=? WHERE `email`=? AND `role`=?";
  db.query(
    sql,
    [req.body.password, req.body.email, req.body.role],
    (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.json({
          status: "Error",
          message: "Error updating password",
        });
      }
      if (data.affectedRows > 0) {
        return res.json({
          status: "Success",
          message: "Password updated successfully",
        });
      } else {
        return res.json({
          status: "Failed",
          message: "No user found with provided details",
        });
      }
    }
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));
