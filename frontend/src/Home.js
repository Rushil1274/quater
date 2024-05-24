import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckDouble } from "react-icons/fa";
import { FaClock, FaHeadset,FaHouseUser  } from "react-icons/fa";

import img1 from "./images/specialities-01.png"
import img2 from "./images/specialities-02.png"
import img3 from "./images/specialities-03.png"
import img4 from "./images/specialities-04.png"
import img5 from "./images/specialities-05.png"

function Home() {

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
                        <Link to={'/doctors'} className="btn-get-started scrollto">Book Appointment</Link>
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
                                    <Link style={{textDecoration:'none'}} to = {'/about'} className="more-btn">Learn More <i className="bx bx-chevron-right"></i></Link>
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
            <section className="section section-specialities position-relative">
                <div className="container-fluid">
                    <div className='mb-5 section-title text-center'>
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
        </>




    )
}

export default Home