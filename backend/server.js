const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 8081;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM login WHERE `email`=? AND `password`=? AND `role`=?";
  db.query(
    sql,
    [req.body.email, req.body.password, req.body.role],
    (err, data) => {
      if (err) {
        return res.json("Error");
      }
      if (data.length > 0) {
        return res.json("Success");
      } else {
        return res.json("Failed");
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
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
