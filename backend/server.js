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
    "SELECT * FROM login WHERE email=? AND role=?";
  db.query(
    sql,
    [req.body.email, req.body.role],
    (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ status: "Error", message: "Database error" });
      }
      if (data.length > 0) {
        // If there is a user with the given email and role, check the password
        const user = data[0];
        if (user.password === req.body.password) {
          // Password matches, login successful
          return res.json({
            status: "Success",
            user: {
              login_id: user.login_id,
              name: user.name,
              role: user.role,
              email: user.email,
            },
          });
        } else {
          // Password does not match
          return res.json({ status: "Failed", message: "Password does not match" });
        }
      } else {
        // No user found with the given email and role
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

// Fetch patient details by email
app.get("/patients/email/:email", (req, res) => {
  const email = req.params.email;
  const sql = "SELECT * FROM patient WHERE email = ?";

  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Error fetching patient details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patient = data[0];
    return res.json(patient);
  });
});

// Update patient details by email
app.put("/patients/email/:email", (req, res) => {
  const email = req.params.email;
  const { name, email: newEmail, number, adhar_no, dob, gender, insurance, address } = req.body;

  const sql = "UPDATE patient SET name =?, email =?, number =?, adhar_no =?, dob =?, gender =?, insurance =?, address =? WHERE email =?";

  db.query(sql, [name, newEmail, number, adhar_no, dob, gender, insurance, address, email], (err, data) => {
    if (err) {
      console.error("Error updating patient details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.affectedRows > 0) {
      return res.json({ message: "Patient details updated successfully" });
    } else {
      return res.status(404).json({ error: "Patient not found" });
    }
  });
});

app.use("/patients", patientRoutes);

app.post('/appointments', (req, res) => {
  const { doctor_id, patient_id, appointment_date, appointment_time, notes, status } = req.body;

  // Fetch patient data from patients table based on login_id
  db.query(`SELECT name, email, number FROM patient WHERE login_id = ?`, [patient_id], (err, patientData) => {
    if (err) {
      console.error('Error fetching patient data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (patientData.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const { name: patientName, email: patientEmail, number: patientNumber } = patientData[0];

    const sql = 'INSERT INTO appointments (doctor_id, patient_id, appointment_date, appointment_time, patient_name, patient_email, patient_number, notes, status) VALUES (?,?,?,?,?,?,?,?,?)';
    const values = [doctor_id, patient_id, appointment_date, appointment_time, patientName, patientEmail, patientNumber, notes, status];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating appointment:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      return res.json({ message: 'Appointment created successfully' });
    });
  });
});

app.get('/appointments', (req, res) => {
  // Query to fetch all appointments
  const sql = `SELECT * FROM appointments`;

  db.query(sql, (err, appointments) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // If no appointments found
    if (appointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found' });
    }

    // Return appointments data
    return res.json(appointments);                                                                                                                  
  });
});

app.get('/appointments/:login_id', (req, res) => {
  const login_id = req.params.login_id;
  const sql = 'SELECT patient_name, patient_email, patient_number FROM appointments WHERE patient_id = ?';

  db.query(sql, [login_id], (err, result) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});

app.get('/appointments/doctor/:doctor_id', (req, res) => {
  const doctor_id = req.params.doctor_id; // Corrected
  const sql = 'SELECT * FROM appointments WHERE doctor_id = ?';

  db.query(sql, [doctor_id], (err, result) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});


// Fetch doctors details by email
app.get("/doctors/email/:email", (req, res) => {
  const email = req.params.email;
  const sql = "SELECT * FROM doctor WHERE email = ?";

  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Error fetching doctors details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const patient = data[0];
    return res.json(patient);
  });
});



app.put("/doctors/email/:email", (req, res) => {
  const email = req.params.email;
  const { name, number, gender, experience, specialization, hospital, fees } = req.body;

  console.log("Updating doctor details:", req.body);

  const sql = "UPDATE doctor SET name = ?, number = ?, gender = ?, experience = ?, specialization = ?, hospital = ?, fees = ? WHERE email = ?";
  const values = [name, number, gender, experience, specialization, hospital, fees, email];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating doctor details:", err);
      return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }

    if (result.affectedRows > 0) {
      return res.json({ message: "Doctor details updated successfully" });
    } else {
      return res.status(404).json({ error: "Doctor not found" });
    }
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
