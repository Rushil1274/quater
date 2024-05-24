const db = require("../db");

// Get all doctors
exports.getAllDoctors = (req, res) => {
  const sql = "SELECT * FROM doctor";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
};

// Get doctor by doctor_id
exports.getDoctorById = (req, res) => {
  const sql = "SELECT * FROM doctor WHERE doctor_id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json("Doctor not found");
    }
  });
};

// Create new doctor
exports.createDoctor = (req, res) => {
  const sql = `
    INSERT INTO doctor (
      name, email, password, role, age, gender, hospital, number, specialization, experience, doc_pic
    ) VALUES (?)
  `;
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.role,
    req.body.age,
    req.body.gender,
    req.body.hospital,
    req.body.number,
    req.body.specialization,
    req.body.experience,
    req.body.doc_pic
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    return res.json("Success");
  });
};

// Update doctor by doctor_id
exports.updateDoctorById = (req, res) => {
  const sql = `
    UPDATE doctor SET 
      name=?, email=?, password=?, role=?, age=?, gender=?, hospital=?, number=?, specialization=?, experience=?, doc_pic=?
    WHERE doctor_id=?
  `;
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.role,
    req.body.age,
    req.body.gender,
    req.body.hospital,
    req.body.number,
    req.body.specialization,
    req.body.experience,
    req.body.doc_pic,
    req.params.id
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    if (data.affectedRows > 0) {
      return res.json("Success");
    } else {
      return res.status(404).json("Doctor not found");
    }
  });
};

// Delete doctor by doctor_id
exports.deleteDoctorById = (req, res) => {
  const sql = "DELETE FROM doctor WHERE doctor_id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    if (data.affectedRows > 0) {
      return res.json("Success");
    } else {
      return res.status(404).json("Doctor not found");
    }
  });
};
