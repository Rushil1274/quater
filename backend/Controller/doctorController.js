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
      name=?, email=?, password=?, role=?, age=?, gender=?, hospital=?, hospital_loc=?, fees=?, education=?, number=?, specialization=?, experience=?, doc_pic=?
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
    req.body.hospital_loc,
    req.body.number,
    req.body.specialization,
    req.body.experience,
    req.body.education,
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

exports.saveDoctorProfile = (req, res) => {
  const { name, mobile, gender, experience, specialization, fees, hospital, hospital_loc, education, email } = req.body;

  // Check if the user exists in the login table
  const checkUserSql = "SELECT login_id, name, email, password, role FROM login WHERE email = ?";
  db.query(checkUserSql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to save profile" });
    }

    if (result.length === 0) {
      // User not found in the login table
      return res.status(404).json({ error: "User not found" });
    }

    const { login_id } = result[0];

    // Check if the doctor already exists
    const checkDoctorSql = "SELECT * FROM doctor WHERE login_id = ?";
    db.query(checkDoctorSql, [login_id], (err, existingDoctor) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to save profile" });
      }

      if (existingDoctor.length > 0) {
        // Update the existing doctor record
        const updateSql =
          "UPDATE doctor SET name = ?, number = ?, gender = ?, experience = ?, education = ?, specialization = ?, fees = ?, hospital = ?, hospital_loc = ? WHERE login_id = ?";
        const updateValues = [name, mobile, gender, experience, education, specialization, fees, hospital, hospital_loc, login_id];

        db.query(updateSql, updateValues, (err, updateResult) => {
          if (err) {
            console.error("Error updating doctor details:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          return res.json({ message: "Doctor details updated successfully" });
        });
      } else {
        // Insert new doctor record if not found (optional based on your application logic)
        const insertSql =
          "INSERT INTO doctor (login_id, name, number, gender, experience, education, specialization, fees, hospital, hospital_loc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const insertValues = [login_id, name, mobile, gender, experience, education, specialization, fees, hospital, hospital_loc];

        db.query(insertSql, insertValues, (err, insertResult) => {
          if (err) {
            console.error("Error inserting new doctor:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          return res.json({ message: "Doctor profile created successfully" });
        });
      }
    });
  });
};
