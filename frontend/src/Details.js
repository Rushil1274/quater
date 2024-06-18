import React, { useState, useEffect } from 'react';
import styles from './Detail.module.css';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BASE_URL } from "./config";

const Detail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/doctors/${id}`);
                setDoctor(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!doctor) {
        return <div>Doctor not found</div>;
    }

    return (
      <div className="container mt-5">
          <div className="row d-flex justify-content-center">
              <div className="col-12 col-md-8 col-lg-7">
                  <div className={`card p-3 py-4 ${styles.card}`} style={{ width: '600px' }}>  {/* Adjust the width as needed */}
                      <div className="text-center">
                          <img src={doctor.doc_pic} width="100" className="rounded-circle" alt="Profile" />
                      </div>
                      <div className="text-center mt-3">
                          <h5 className="mt-2 mb-0">Dr. {doctor.name}</h5>
                          <span>{doctor.education}</span>
                          <div className="px-4 mt-1">
                              <p className={styles.fonts} align='justify'>
                                  {doctor.description}
                              </p>
                              <p align='left'>Email: {doctor.email}</p>
                              <p align='left'>Hospital: {doctor.hospital}</p>
                              <p align='left'>Specialization: {doctor.specialization}</p>
                              <p align='left'>Experience: {doctor.experience}</p>
                              <p align='left'>Fees: {doctor.fees} INR</p>
                              <p align='left'>Address: {doctor.location} </p>
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
}
export default Detail;
