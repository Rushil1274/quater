import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Divider, Button } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000080', 
    },
  },
});

const DoctorsDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [pastAppointments, setPastAppointments] = useState(0);

  const doctorId = 1;

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  const fetchAllAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:8081/appointments/doctor/${doctorId}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
        calculateAppointmentCounts(data);
      } else {
        console.error('Failed to fetch appointments');
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setAppointments([]);
    }
  };

  const calculateAppointmentCounts = (data) => {
    const today = new Date();
    const todayStr = today.toDateString();

    let total = data.length;
    let todayCount = 0;
    let upcoming = 0;
    let past = 0;

    data.forEach(appointment => {
      const appointmentDate = new Date(appointment.appointment_date);
      if (appointmentDate.toDateString() === todayStr) {
        todayCount++;
      } else if (appointmentDate > today) {
        upcoming++;
      } else {
        past++;
      }
    });

    setTotalAppointments(total);
    setTodayAppointments(todayCount);
    setUpcomingAppointments(upcoming);
    setPastAppointments(past);
  };

  const handleDateClick = (value) => {
    setSelectedDate(value);
  };

  const fetchAppointments = async (date) => {
    const filteredAppointments = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointment_date).toDateString();
      return appointmentDate === date.toDateString();
    });
    setAppointments(filteredAppointments);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const cancelAppointment = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  const isPastDate = (date) => {
    const today = new Date();
    return date < today.setHours(0, 0, 0, 0);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const changeMonth = (monthsToAdd) => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + monthsToAdd);
      return newDate;
    });
  };

  const dayClassName = ({ date, view }) => {
    // Check if the date is today and if we're in the same view (month view)
    if (isToday(date) && view === 'month') {
      return 'today'; // Apply a class to style today's date
    }
    return null; // No additional class for any other day
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className="container">
        <Grid container spacing={3}>
          {/* Total Appointments */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Total Appointments</Typography>
              <Typography variant="body1">{totalAppointments}</Typography>
            </Paper>
          </Grid>

          {/* Today's Appointments */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Today's Appointments</Typography>
              <Typography variant="body1">{todayAppointments}</Typography>
            </Paper>
          </Grid>

          {/* Upcoming Appointments */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Upcoming Appointments</Typography>
              <Typography variant="body1">{upcomingAppointments}</Typography>
            </Paper>
          </Grid>

          {/* Past Appointments */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Past Appointments</Typography>
              <Typography variant="body1">{pastAppointments}</Typography>
            </Paper>
          </Grid>

          {/* Calendar */}
          <Grid item xs={12} md={4}>
            <Paper className="calendar-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Button onClick={() => changeMonth(-1)}>&lt;</Button>
                <Typography variant="h5">{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</Typography>
                <Button onClick={() => changeMonth(1)}>&gt;</Button>
              </div>
              <Calendar
                value={selectedDate}
                onClickDay={handleDateClick}
                showNavigation={false}
                dayClassName={dayClassName} // Apply custom styling based on conditions
              />
            </Paper>
          </Grid>

          {/* Display Appointments */}
          <Grid item xs={12} md={8}>
            <Paper className="appointments-container">
              <Typography variant="h6" gutterBottom>Appointments for {selectedDate.toDateString()}</Typography>
              <Divider style={{ margin: '1rem 0', borderWidth: '2px', backgroundColor: theme.palette.primary.main }} />
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <React.Fragment key={index}>
                    <div className="appointment-details" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                        {appointment.appointment_time} - {appointment.patient_name} - {appointment.notes}
                      </Typography>
                      {!isPastDate(selectedDate) && !isToday(selectedDate) && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => cancelAppointment(index)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body1">No appointments for this date</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default DoctorsDashboard;
