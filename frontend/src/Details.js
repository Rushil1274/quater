import React, { useState, useEffect } from 'react';
import styles from './Detail.module.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BASE_URL } from "./config";

const Detail = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/doctors`);
        setDoctors(response.data);
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

  const selectedDoctor = doctors[0];

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-7">
          <div className={`card p-3 py-4 ${styles.card}`}>
            <div className="text-center">
              <img src={selectedDoctor.doc_pic} width="100" className="rounded-circle" alt="Profile" />
            </div>
            <div className="text-center mt-3">
              <h5 className="mt-2 mb-0">Dr. {selectedDoctor.name}</h5>
              <span>{selectedDoctor.education}</span>
              <div className="px-4 mt-1">
                <p className={styles.fonts} align='justify'>
                </p>
                <p align='left'>Email: {selectedDoctor.email}</p>
                <p align='left'>Hospital: {selectedDoctor.hospital}</p>
                <p align='left'>Specialization: {selectedDoctor.specialization}</p>
                <p align='left'>Experience: {selectedDoctor.experience}</p>
                <p align='left'>Fees: {selectedDoctor.fees} INR</p>
                <p align='left'>Address: {selectedDoctor.location} </p>
                <Link to="/appointment" className="bookButton" style={{ textDecoration: 'none' }}>
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
