import React, { useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./App.css"

const DoctorsDashboard = () => {
  const [monthOffset, setMonthOffset] = useState(0);

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

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        {/* Total Appointments */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={styles.appointmentCard}>
            <Typography variant="h6" gutterBottom>Total Appointments</Typography>
            <Typography variant="body1">25</Typography>
          </Paper>
        </Grid>

        {/* Today's Appointments */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={styles.appointmentCard}>
            <Typography variant="h6" gutterBottom>Today's Appointments</Typography>
            <Typography variant="body1">5</Typography>
          </Paper>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={styles.appointmentCard}>
            <Typography variant="h6" gutterBottom>Upcoming Appointments</Typography>
            <Typography variant="body1">15</Typography>
          </Paper>
        </Grid>

        {/* Past Appointments */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={styles.appointmentCard}>
            <Typography variant="h6" gutterBottom>Past Appointments</Typography>
            <Typography variant="body1">5</Typography>
          </Paper>
        </Grid>

        {/* Combined Calendar with Arrows */}
        <Grid item xs={12} md={4}>
          <Paper style={styles.calendar}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <ArrowBackIcon onClick={goToPreviousMonth} style={{ cursor: 'pointer' }} />
              <Typography variant="h6" gutterBottom>
                {monthOffset === -1 && 'Past Month'}
                {monthOffset === 0 && 'Current Month'}
                {monthOffset === 1 && 'Next Month'}
              </Typography>
              <ArrowForwardIcon onClick={goToNextMonth} style={{ cursor: 'pointer' }} />
            </div>
            <Calendar
              value={getMonth(monthOffset)}
              tileDisabled={tileDisabled}
              prevLabel={null}
              nextLabel={null}
              prev2Label={null}
              next2Label={null}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const styles = {
  appointmentCard: {
    padding: '20px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    height: '100%',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  },
  calendar: {
    padding: '20px',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  },
};

export default DoctorsDashboard;
