import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import axios from 'axios';
import "./App.css"
const AccountDetails = ({ user }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/patients/${user.id}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [user.id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // Formats date to 'MM/DD/YYYY' by default
  };

  return (
    <div className="account-details">
      <AiOutlineUser className="user-icon" />
      <h4>Name: {patient.name}</h4>
      <p>Role: {patient.role}</p>
      <p>Email: {patient.email}</p>
      <p>Mobile: {patient.number}</p>
      <p>Adhar No: {patient.adhar_no}</p>
      <p>Date of Birth: {formatDate(patient.dob)}</p>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <p>Insurance: {patient.insurance}</p>
      <p>Address: {patient.address}</p>
    </div>
  );
};


const MyAppointments = ({ user }) => {
  const [Appointments, setAppointments] = useState([]);

  return (
    <div className="my-appointments">
      {/* <h4>My Orders</h4> */}
      {Appointments.length === 0 ? (
        <p>You have not make any appointments.</p>
      ) : (
        <ul>
          {Appointments.map(order => (
            <li key={order.id}>
              <p>Appointments ID: {Appointments.id}</p>
              <p>Total: {Appointments.totalAmount}</p>
              <p>Items:</p>
              <ul>
                {order.cartItems.map(item => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.productName} style={{ maxWidth: '100px' }} />
                    <div>
                      <p>Appointment Id: { }</p>
                      <p>Doctor's name: { }</p>
                      <p>Price: { }</p>
                      <p>Quantity: { }</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    adhar_no: "",
    dob: "",
    gender: "",
    insurance: "",
    address: "",
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/patients/${user.id}`
        );
        const patientData = response.data;
        setFormData({
          ...patientData,
          dob: patientData.dob ? new Date(patientData.dob).toISOString().split('T')[0] : ""
        });
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/patients/${user.id}`, formData);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="update-profile">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            {" "}
            Name:{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Email Id:{" "}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Mobile No:{" "}
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              minLength="10"
              maxLength="10"
              pattern="[0-9]{10}"
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Aadhaar No:{" "}
            <input
              type="text"
              name="adhar_no"
              value={formData.adhar_no}
              onChange={handleChange}
              required
              minLength="12"
              maxLength="12"
              pattern="\d{12}"
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Date of Birth:{" "}
            <input
              type="date"
              name="dob"
              value={formData.dob}
              max={today}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="gender">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input"
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="insurance">
          <label>Insurance:</label>
          <select
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
            className="input"
          >
            <option value=""></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="address-text">
          <label>
            {" "}
            Address:{" "}
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              cols={60}
            />
          </label>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

const MyProfile = () => {
  const user = { id: 1 }; // Ensure user object has an id

  return (
    <div className="user-profile">
      <nav>
        <ul>
          <li>
            <Link to="">Account Details</Link>
          </li>
          <li>
            <Link to="myappointments">My Appointments</Link>
          </li>
          <li>
            <Link to="updateprofile">Update Profile</Link>
          </li>
        </ul>
      </nav>

      <div className="profile-content">
        <Routes>
          <Route path="/" element={<AccountDetails user={user} />} />
          <Route
            path="myappointments"
            element={<MyAppointments user={user} />}
          />
          <Route path="updateprofile" element={<UpdateProfile user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyProfile

