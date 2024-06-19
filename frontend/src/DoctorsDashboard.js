import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Divider, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
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
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [pastAppointments, setPastAppointments] = useState(0);

  const doctorId = JSON.parse(localStorage.getItem('user')).doctor_id;

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  useEffect(() => {
    filterAppointmentsByDate(selectedDate);
  }, [selectedDate]);

  const fetchAllAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:8081/appointments/doctor/${doctorId}`);
      if (response.ok) {
        const data = await response.json();
        const updatedData = data.map(appointment => ({
          ...appointment,
          status: 'Pending'
        }));
        setAllAppointments(updatedData);
        calculateAppointmentCounts(updatedData);
      } else {
        console.error('Failed to fetch appointments');
        setAllAppointments([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setAllAppointments([]);
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

  const filterAppointmentsByDate = (date) => {
    const filteredAppointments = allAppointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointment_date).toDateString();
      return appointmentDate === date.toDateString();
    });
    setAppointments(filteredAppointments);
  };

  const handleDateClick = (value) => {
    setSelectedDate(value);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateAppointmentStatus = async (index, status) => {
    const appointment = appointments[index];
    try {
      const response = await fetch(`http://localhost:8081/appointments/${appointment.appointment_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        const updatedAppointments = [...appointments];
        updatedAppointments[index].status = status;
        setAppointments(updatedAppointments);
        const updatedAllAppointments = allAppointments.map(appt => 
          appt.appointment_id === appointment.appointment_id ? { ...appt, status } : appt
        );
        setAllAppointments(updatedAllAppointments);
      } else {
        console.error('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
    if (isToday(date) && view === 'month') {
      return 'today';
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className="container-dd">
        <Grid container spacing={3} className='dd-main-container'>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Total Appointments</Typography>
              <Typography variant="body1">{totalAppointments}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Today's Appointments</Typography>
              <Typography variant="body1">{todayAppointments}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Upcoming Appointments</Typography>
              <Typography variant="body1">{upcomingAppointments}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="grid-item">
              <Typography variant="h6" gutterBottom>Past Appointments</Typography>
              <Typography variant="body1">{pastAppointments}</Typography>
            </Paper>
          </Grid>
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
                dayClassName={dayClassName}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className="appointments-container">
              <Typography className='app-tyrography' variant="h6" gutterBottom>Appointments for {selectedDate.toDateString()}</Typography>
              <Divider style={{ margin: '1rem 0', borderWidth: '2px', backgroundColor: theme.palette.primary.main }} />
              {appointments.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((appointment, index) => (
                        <TableRow key={index}>
                          <TableCell>{appointment.appointment_time}</TableCell>
                          <TableCell>{appointment.patient_name}</TableCell>
                          <TableCell>{appointment.notes}</TableCell>
                          <TableCell>{appointment.status}</TableCell>
                          <TableCell>
                            {appointment.status === 'Pending' && (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => updateAppointmentStatus(index, 'Approved')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => updateAppointmentStatus(index, 'Rejected')}
                                  style={{ marginLeft: '8px' }}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {appointment.status === 'Approved' && (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => updateAppointmentStatus(index, 'Completed')}
                                >
                                  Complete
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => updateAppointmentStatus(index, 'Canceled')}
                                  style={{ marginLeft: '8px' }}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography className='appt-tyrography' variant="body1">No appointments for this date</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default DoctorsDashboard;