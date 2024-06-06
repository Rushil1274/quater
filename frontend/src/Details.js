import React, { useState, useEffect } from 'react';
import styles from './Detail.module.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Detail = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/doctors');
        setDoctors(response.data); // Assuming the API response is an array of doctor objects
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      {doctors.map(doctor => (
        <div key={doctor.doctor_id} className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            <div className={`card p-3 py-4 ${styles.card}`}>
              <div className="text-center">
                <img src={doctor.doc_pic} width="100" className="rounded-circle" alt="Profile" />
              </div>
              <div className="text-center mt-3">
                <h5 className="mt-2 mb-0">Dr. {doctor.name}</h5>
                <span>{doctor.specialization}</span>
                <div className="px-4 mt-1">
                  <p className={styles.fonts} align='justify'>
                    {/* Assuming description is not provided in the API data */}
                    {/* {doctor.description} */}
                  </p>
                  <p align='left'>Email: {doctor.email}</p>
                  <p align='left'>Hospital: {doctor.hospital}</p>
                  <p align='left'>Experience: {doctor.experience}</p>
                  <p align='left'>Fees: {doctor.fees} INR</p>
                  {/* Add more details if needed */}
                  <Link to="/appointment" className="bookButton" style={{ textDecoration: 'none' }}>
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Detail;
