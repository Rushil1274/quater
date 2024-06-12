import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import axios from 'axios';
import "./App.css"
import { BASE_URL } from './config';

const AccountDetails = ({ user }) => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    setDoctor(user); // Assuming the user object has the same structure as the doctor data
  }, [user]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-details">
      <AiOutlineUser className="user-icon" />
      <h4>Name: {doctor.name}</h4>
      <p>Role: {doctor.role}</p>
      <p>Email: {doctor.email}</p>
      <p>Mobile: {doctor.number}</p>
      <p>Age: {doctor.age}</p>
      <p>Gender: {doctor.gender}</p>
      <p>Hospital Address: {doctor.hospital}</p>
      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience}</p>
      <p>Fees: {doctor.fees}</p>
    </div>
  );
};


const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    // dob: "",
    gender: "",
    Experience: "",
    Specialization: "",
    address: "",
    fees: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        number: user.number || "",
        // dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
        gender: user.gender || "",
        Experience: user.experience || "",
        Specialization: user.specialization || "",
        address: user.hospital || "",
        fees: user.fees || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const response = await axios.put(`${BASE_URL}/doctor/email/${storedUser.email}`, formData);
      console.log("Update response:", response);
      if (response.status === 200) {
        alert("Profile updated successfully");
      } else {
        console.error("Failed to update profile:", response.data);
        alert(`Failed to update profile: ${response.data.message || response.status}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(`Failed to update profile: ${error.response.data.message || error.response.status}`);
      } else {
        alert("Failed to update profile: An unknown error occurred.");
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="update-profile">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
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
            Email Id:
            <p className='update-email' style={{ fontWeight: '400', padding: '8px' }}>{formData.email}</p>
          </label>
        </div>
        <div>
          <label>
            Mobile No:
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              minLength="10"
              maxLength="10"
              pattern="[0-9]{10}"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
            />
          </label>
        </div>
        {/* <div>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              max={today}
              onChange={handleChange}
            />
          </label>
        </div> */}
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
        <div>
          <label>
            Experience:
            <input
              type="text"
              name="Experience"
              value={formData.Experience}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
          Specialization:
            <input
              type="text"
              name="Specialization"
              value={formData.Specialization}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Fees:
            <input
              type="text"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              required
              maxLength={4}
            />
          </label>
        </div>

        <div className="address-text">
          <label>
            Address:
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


const DoctorsProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email) {
      const fetchUserDetails = async () => {
        try {
          setIsLoading(true);
          const role = storedUser.role;
          const response = await axios.get(`${BASE_URL}/${role}s/email/${storedUser.email}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserDetails();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="user-profile">
      <nav>
        <ul>
          <li>
            <Link to="">Account Details</Link>
          </li>
          <li>
            <Link to="updateprofile">Update Profile</Link>
          </li>
        </ul>
      </nav>

      <div className="profile-content">
        <Routes>
          <Route path="/" element={<AccountDetails user={user} />} />
          <Route path="updateprofile" element={<UpdateProfile user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default DoctorsProfile;
