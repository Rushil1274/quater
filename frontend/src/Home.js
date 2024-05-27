import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckDouble, FaClock, FaHeadset, FaHouseUser } from "react-icons/fa";
import img1 from "./images/specialities-01.png";
import img2 from "./images/specialities-02.png";
import img3 from "./images/specialities-03.png";
import img4 from "./images/specialities-04.png";
import img5 from "./images/specialities-05.png";
import { useState, useEffect } from 'react';
import axios from 'axios';


function Home() {
    const user = JSON.parse(localStorage.getItem('user'));
    // const role = user.role; // Can be 'Doctor', 'Receptionist', or 'Patient'

    const [filter, setFilter] = useState({ name: '', specialization: '', fees: '', location: '' });
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8081/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const bufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer.data);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        doctor.specialization.toLowerCase().includes(filter.specialization.toLowerCase()) &&
        (filter.fees === '' || doctor.fees.includes(filter.fees)) &&
        (filter.location === '' || doctor.location.toLowerCase().includes(filter.location.toLowerCase()))
    );

    return (
        <>
            <section id="hero" className="d-flex align-items-center">
                <div className="container">
                    <div>
                        <p>TOTAL HEALTH CARE SOLUTION</p>
                        <h1>Your Most Trusted <br />Health Partner</h1>
                        <p className='hero-p'>A repudiandae ipsam labore ipsa voluptatum quidem quae laudantium quisquam aperiam maiores sunt fugit,</p>
                        <p className='hero-p'>deserunt rem suscipit placeat.</p>
                    </div>
                    <div className="d-flex justify-content-start gap-2">
                        {/* Conditional rendering based on user role */}
                        {user.role === 'patient' && (
                            <Link to={'/doctors'} className="btn-get-started scrollto">Book Appointment</Link>
                        )}
                        {(user.role === 'doctor' || user.role === 'receptionist') && (
                            <Link to={'/doctors-dashboard'} className="btn-get-started scrollto">Track Appointment</Link>
                        )}
                    </div>
                </div>
            </section>
            <section className="why-us mt-5 mt-md-0">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-4 d-flex align-items-stretch">
                            <div className="content">
                                <h3>Why Choose Us?</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                                    Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
                                </p>
                                <div className="text-center">
                                    <Link style={{ textDecoration: 'none' }} to={'/about'} className="more-btn">Learn More <i className="bx bx-chevron-right"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 d-flex align-items-stretch">
                            <div className="icon-boxes d-flex flex-column justify-content-center">
                                <div className="row">
                                    <div className="col-xl-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <FaHouseUser className="icon" />
                                            <h4>Appointment</h4>
                                            <small className='text-secondary'>24 Hours Service</small>
                                            <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <FaHeadset className="icon" />
                                            <h4>Emegency Cases</h4>
                                            <h6 className='text-secondary'>+88 01751 040425</h6>
                                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui facilis perferendis quia maxime. Laborum excepturi pariatur laboriosam nihil, dolor molestias.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <FaClock className="icon" />
                                            <h4>Working Hours</h4>
                                            <small className='text-secondary'>Timing schedule</small>
                                            <ul className='list-group list-group-flush'>
                                                <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Sun - Wed : </p> <p>8:00 - 17: 00</p></li>
                                                <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Thus - Fri : </p> <p>9:00 - 17: 00</p></li>
                                                <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Sat - Sun : </p> <p>10:00 - 17: 00</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='reco-doc'>
                <div className="container-fluid">
                    <div className='mb-5 mt-100 section-title text-center reco-doc-card'>
                        <h2>Recommended Doctors</h2>
                        <div className="cardContainer">
                            {filteredDoctors.slice(0, 5).map((doctor, index) => (
                                <div key={index} className="card">
                                    <img src={`data:image/jpeg;base64,${bufferToBase64(doctor.doc_pic)}`} alt={doctor.name} className="image" />
                                    <h3>{doctor.name}</h3>
                                    <p><strong>Specialization:</strong> {doctor.specialization}</p>
                                    <p><strong>Fees:</strong> {doctor.fees}</p>
                                    <p><strong>Location:</strong> {doctor.location}</p>
                                    <p>{doctor.description}</p>
                                    <button className="bookButton">Book Appointment</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="section section-specialities position-relative">
                <div className="container-fluid">
                    <div className='mb-5 section-title text-center spec-header'>
                        <h2>Clinic and Specialities</h2>
                        <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-9">
                            <div className="specialities-slider d-flex justify-content-center align-items-center gap-5">
                                <div className="speicality-item text-center">
                                    <div className="speicality-img">
                                        <img src={img1} className="img-fluid" alt="" />
                                        <span><i><FaCheckDouble /></i></span>
                                    </div>
                                    <p>Urology</p>
                                </div>
                                <div className="speicality-item text-center">
                                    <div className="speicality-img">
                                        <img src={img2} className="img-fluid" alt="" />
                                        <span><i><FaCheckDouble /></i></span>
                                    </div>
                                    <p>Neurology</p>
                                </div>
                                <div className="speicality-item text-center">
                                    <div className="speicality-img">
                                        <img src={img3} className="img-fluid" alt="" />
                                        <span><i><FaCheckDouble /></i></span>
                                    </div>
                                    <p>Orthopedic</p>
                                </div>
                                <div className="speicality-item text-center">
                                    <div className="speicality-img">
                                        <img src={img4} className="img-fluid" alt="" />
                                        <span><i><FaCheckDouble /></i></span>
                                    </div>
                                    <p>Cardiologist</p>
                                </div>
                                <div className="speicality-item text-center">
                                    <div className="speicality-img">
                                        <img src={img5} className="img-fluid" alt="" />
                                        <span><i><FaCheckDouble /></i></span>
                                    </div>
                                    <p>Dentist</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Rest of your component remains unchanged */}
            {/* Why us section */}
            {/* Clinic and Specialities section */}
        </>
    );
}

export default Home;
