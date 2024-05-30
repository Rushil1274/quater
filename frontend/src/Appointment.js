import React, { useState } from 'react';
import { Steps } from 'antd';
import { useNavigate } from 'react-router-dom';
import './App.css';

const { Step } = Steps;

const AppointmentScheduler = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [paymentType, setPaymentType] = useState('creditCard');

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reasonForVisit: '',
    description: '',
    address: '',
  });

  const [state, setState] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!selectedDate || !selectedTime) {
        alert("Please select both a date and a time before proceeding.");
        return;
      }
    }

    if (currentStep === 1) {
      const { firstName, email, phone, reasonForVisit, description, address } = formValues;
      if (!firstName || !email || !phone || !reasonForVisit || !description || !address) {
        alert('Please fill out all required fields.');
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBack = () => {
    navigate('/doctors');
  }

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  return (
    <div className="container" style={{ marginBottom: '5rem', marginTop: '2rem' }}>
      <Steps current={currentStep}>
        <Step title="Select Appointment Date & Time" />
        <Step title="Patient Information" />
        <Step title="Payment" />
      </Steps>

      {currentStep === 0 && (
        <>
          <div className='appointment-schedule'>
            <div className='container-ap'>
              <div className='info-part'>
                <p className='info-head'> Would you like to schedule an Interview? Pick a Date & Time </p>
                <div className='info-box'>
                  <div className='info-item'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"></path>
                    </svg>
                    <p>With Doctor</p>
                  </div>
                  <div className='info-item'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                    </svg>
                    <p>30 Min</p>
                  </div>
                  <div className='info-item'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path>
                    </svg>
                    <p>Sylhet, Bangladesh<br /><span className="form-text">1020BD, Amertam, NorthEast, Srimongol</span></p>
                  </div>
                  <div className='info-item'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.24-28.239 74.301-28.069 102.325.51 27.75 28.301 26.872 73.935-1.154 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.508 13.905 17.455 20.446 27.294 10.606l37.106-37.106c59.26-59.26 59.26-155.7-.001-214.961z"></path>
                    </svg>
                    <p>Zoom Meeting</p>
                  </div>
                  <div className='info-item'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>
                    <p>Date, Time</p>
                  </div>
                </div>
              </div>
              <div className='calender-div'>
                <div className='calender-date'>
                  <p className="calender-p">
                    {selectedDate ? `Selected Date - ${selectedDate}` : "Select Appointment Date"}
                  </p>
                  <div className="date-picker">
                    {['May 29, 2024', 'May 30, 2024', 'May 31, 2024', 'Jun 01, 2024', 'Jun 02, 2024', 'Jun 03, 2024', 'Jun 04, 2024', 'Jun 05, 2024'].map(date => (
                      <button
                        key={date}
                        className={`btn date-btn ${selectedDate === date ? 'active' : ''}`}
                        onClick={() => handleDateClick(date)}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                <div className='calender-time'>
                  <p className="calender-p">
                    {selectedTime ? `Selected Time - ${selectedTime}` : "Select Appointment Time"}
                  </p>
                  <div className="date-picker">
                    {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'].map(time => (
                      <button
                        key={time}
                        className={`btn time-btn ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => handleTimeClick(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="appointment-btn">
            <button onClick={handleBack}>Back</button>
            <button type="primary" onClick={handleNext} className="next">Next</button>
          </div>
        </>
      )}

      {currentStep === 1 && (
        <>
          <div className='appointment-schedule'>
            <div className='container-ap'>
              <div className='appointment-form'>
                <form className='ap-form'>
                  <label>Name</label>
                  <input
                    className='ap-form-input'
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Email</label>
                  <input
                    className='ap-form-input'
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Mobile</label>
                  <input
                    className='ap-form-input'
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Reason For Visit</label>
                  <input
                    className='ap-form-input'
                    name="reasonForVisit"
                    value={formValues.reasonForVisit}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Description</label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    rows="4"
                    value={formValues.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label>Address</label>
                  <input
                    className='ap-form-input'
                    name="address"
                    value={formValues.address}
                    onChange={handleInputChange}
                    required
                  />
                </form>
              </div>
            </div>
            <div className="appointment-btn">
              <button onClick={handlePrev}>Previous</button>
              <button type="primary" onClick={handleNext} className="next">Next</button>
            </div>
          </div>
        </>
      )}
      {currentStep === 2 && (
        <>
          <div className='appointment-schedule'>
            <div className='container-ap'>
              <div className='appointment-payment'>
                <div className="ap-booking-details">
                  <div className="booking-item">
                    <ul className="booking-date">
                      <li>Date <span>{selectedDate}</span></li>
                      <li>Time <span>{selectedTime}</span></li>
                    </ul>
                    <ul className="booking-fee">
                      <li>Consulting Fee <span>$60</span></li>
                      <li>Booking Fee <span>$10</span></li>
                      <li>Vat (Including 15%) <span>$9</span></li>
                    </ul>
                    <ul className="booking-total">
                      <li className="booking-total-li">
                        <span>Total</span>
                        <span className="total-cost"> $79</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="appointment-btn">
            <button onClick={handlePrev}>Previous</button>
            <button type="primary" onClick={handleNext} className="next">Confirm</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentScheduler;
