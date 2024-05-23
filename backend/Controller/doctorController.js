// doctorController.js

const db = require("../db"); // Assuming db.js is your database connection file

// Get all doctors
exports.getAllDoctors = (req, res) => {
  const sql = "SELECT * FROM doctor";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
};

// Get doctor by ID
exports.getDoctorById = (req, res) => {
  const sql = "SELECT * FROM doctor WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.json("Doctor not found");
    }
  });
};

// Create new doctor
exports.createDoctor = (req, res) => {
  const sql = "INSERT INTO doctor (`name`, `specialty`, `email`, `phone`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.specialty,
    req.body.email,
    req.body.phone,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
};

// Update doctor by ID
exports.updateDoctorById = (req, res) => {
  const sql = "UPDATE doctor SET `name`=?, `specialty`=?, `email`=?, `phone`=? WHERE `id`=?";
  const values = [
    req.body.name,
    req.body.specialty,
    req.body.email,
    req.body.phone,
  ];

  db.query(sql, [...values, req.params.id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    if (data.affectedRows > 0) {
      return res.json("Success");
    } else {
      return res.json("Doctor not found");
    }
  });
};

// Delete doctor by ID
exports.deleteDoctorById = (req, res) => {
  const sql = "DELETE FROM doctor WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    if (data.affectedRows > 0) {
      return res.json("Success");
    } else {
      return res.json("Doctor not found");
    }
  });
};
