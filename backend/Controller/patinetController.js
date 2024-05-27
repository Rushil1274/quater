// Controller/patientController.js

const db = require("../db");

// Get all patients
exports.getAllPatients = (req, res) => {
  const sql = "SELECT * FROM patient";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
};

// Get patient by patient_id
exports.getPatientById = (req, res) => {
  const sql = "SELECT * FROM patient WHERE patient_id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json("Patient not found");
    }
  });
};

// Create new patient
exports.createPatient = (req, res) => {
  const sql = `
    INSERT INTO patient (
      email, password, role, age, gender, address, number, insurance, adhar_no, created_at, name, dob, patient_pic
    ) VALUES (?)
  `;
  const values = [
    req.body.email,
    req.body.password,
    req.body.role,
    req.body.age,
    req.body.gender,
    req.body.address,
    req.body.number,
    req.body.insurance,
    req.body.adhar_no,
    new Date(), // created_at, set to current date and time
    req.body.name,
    req.body.dob,
    req.body.patient_pic
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    return res.json("Success");
  });
};

// Update patient by patient_id
exports.updatePatientById = (req, res) => {
  const sql = `
    UPDATE patient SET 
      email=?, password=?, role=?, age=?, gender=?, address=?, number=?, insurance=?, adhar_no=?, name=?, dob=?, patient_pic=?
    WHERE patient_id=?
  `;
  const values = [
    req.body.email,
    req.body.password,
    req.body.role,
    req.body.age,
    req.body.gender,
    req.body.address,
    req.body.number,
    req.body.insurance,
    req.body.adhar_no,
    req.body.name,
    req.body.dob,
    req.body.patient_pic,
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
      return res.status(404).json("Patient not found");
    }
  });
};

exports.updatePatient = (req, res) => {
  const { patient_id } = req.params;
  const {
    name,
    email,
    number,
    adhar_no,
    dob,
    gender,
    insurance,
    address,
  } = req.body;

  const sql =
    "UPDATE patient SET name = ?, email = ?, number = ?, adhar_no = ?, dob = ?, gender = ?, insurance = ?, address = ? WHERE patient_id = ?";
  db.query(
    sql,
    [name, email, number, adhar_no, dob, gender, insurance, address, patient_id],
    (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json("Error");
      }
      return res.json("Patient updated successfully");
    }
  );
};

// Delete patient by patient_id
exports.deletePatientById = (req, res) => {
  const sql = "DELETE FROM patient WHERE patient_id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    if (data.affectedRows > 0) {
      return res.json("Success");
    } else {
      return res.status(404).json("Patient not found");
    }
  });
};
