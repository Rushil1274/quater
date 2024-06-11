import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, Divider } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./App.css"

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4', // Cyan color
    },
  },
});

const DoctorsDashboard = () => {
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  const getMonth = (offset) => {
    const date = new Date();
    date.setMonth(date.getMonth() + offset);
    return date;
  };

  const goToPreviousMonth = () => {
    if (monthOffset > -1) {
      setMonthOffset(monthOffset - 1);
    }
  };

  const goToNextMonth = () => {
    if (monthOffset < 1) {
      setMonthOffset(monthOffset + 1);
    }
  };

  const tileDisabled = ({ date }) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const selectedMonth = date.getMonth();

    return !(selectedMonth === currentMonth + monthOffset || selectedMonth === currentMonth + monthOffset - 1 || selectedMonth === currentMonth + monthOffset + 1);
  };

  const handleDateClick = (value) => {
    setSelectedDate(value);
    fetchAppointments(value);
  };

  const fetchAppointments = (date) => {
    // Here you would fetch appointments for the selected date from your data source
    // For demonstration, I'll just retrieve appointments from the appointmentData object
    const formattedDate = formatDate(date);
    const selectedAppointments = appointmentData[formattedDate] || [];
    setAppointments(selectedAppointments);
  };

  const formatDate = (date) => {
    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const cancelAppointment = (index) => {
    // Here you would implement the logic to cancel the appointment
    // For demonstration, let's just remove the appointment from the list
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  const appointmentData = {
    "2024-06-10": [
      { patient: 'chintan', time: '10:00 AM', Reason: 'Test' },
      { patient: 'kushal', time: '11:00 AM', Reason: 'Test' },
    ],
    "2024-06-11": [
      { patient: 'rushil', time: '10:00 AM', Reason: 'Test' },
      { patient: 'tirth', time: '11:00 AM', Reason: 'Test' },
    ],
    "2024-06-14": [
      { patient: 'deep', time: '10:00 AM', Reason: 'Test' },
      { patient: 'jay', time: '11:00 AM', Reason: 'Test' },
    ],
    "2024-06-15": [
      { patient: 'nachiketa', time: '10:00 AM', Reason: 'Test' },
      { patient: 'dhairya', time: '11:00 AM', Reason: 'Test' },
    ],
    "2024-06-07": [
      { patient: 'monish', time: '10:00 AM', Reason: 'Test' },
      { patient: 'jainam', time: '11:00 AM', Reason: 'Test' },
    ],
  };

  const isPastDate = (date) => {
    const today = new Date();
    return date < today.setHours(0, 0, 0, 0);
  };


  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className="container">
        <Grid container spacing={3}>
          {/* Total Appointments */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Total Appointments</Typography>
              <Typography variant="body1">25</Typography>
            </Paper>
          </Grid>

          {/* Today's Appointments */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Today's Appointments</Typography>
              <Typography variant="body1">5</Typography>
            </Paper>
          </Grid>

          {/* Upcoming Appointments */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Upcoming Appointments</Typography>
              <Typography variant="body1">15</Typography>
            </Paper>
          </Grid>

          {/* Past Appointments */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Past Appointments</Typography>
              <Typography variant="body1">5</Typography>
            </Paper>
          </Grid>

          {/* Combined Calendar with Arrows */}
          <Grid item xs={12} md={4}>
            <Paper className="calendar-container">
              <div className="calendar-navigation">
                <ArrowBackIcon onClick={goToPreviousMonth} className="icon" />
                <Typography variant="h6" gutterBottom>
                  {monthOffset === -1 && 'Past Month'}
                  {monthOffset === 0 && 'Current Month'}
                  {monthOffset === 1 && 'Next Month'}
                </Typography>
                <ArrowForwardIcon onClick={goToNextMonth} className="icon" />
              </div>
              <Calendar
                value={getMonth(monthOffset)}
                tileDisabled={tileDisabled}
                prevLabel={null}
                nextLabel={null}
                prev2Label={null}
                next2Label={null}
                onClickDay={handleDateClick} // Add onClickDay prop to handle date clicks
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
                      {appointment.time} - {appointment.patient} - {appointment.Reason}
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

