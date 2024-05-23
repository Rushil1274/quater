import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import "./App.css"


const AccountDetails = ({ user }) => (
  <div className="account-details">
    <AiOutlineUser className='user-icon' />
    <h4>Name: </h4>
    <p>Email: </p>
    <p>Mobile: </p>
    <p>Adhar No: </p>
    <p>Date of Birth: </p>
    <p>Age: </p>
    <p>Gender: </p>
    <p>Insurance: </p>
    <p>Address: </p>
  </div>
);

const MyAppointments = ({ user }) => {
  const [Appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const ordersRef = collection(db, `users/${user.uid}/orders`);
  //       const q = query(ordersRef);
  //       const querySnapshot = await getDocs(q);
  //       const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //       setOrders(ordersData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [user]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="my-appointments">
      {/* <h4>My Orders</h4> */}
      {Appointments.length === 0 ? (
        <p>You have not make any appointments.</p>
      ) : (
        <ul>
          {Appointments.map(order => (
            <li key={order.id}>
              <p>Appointments ID: {Appointments.id}</p>
              <p>Total: {Appointments.totalAmount}</p>
              <p>Items:</p>
              <ul>
                {order.cartItems.map(item => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.productName} style={{ maxWidth: '100px' }} />
                    <div>
                      <p>Appointment Id: { }</p>
                      <p>Doctor's name: { }</p>
                      <p>Price: { }</p>
                      <p>Quantity: { }</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const UpdateProfile = ({ user }) => {

  const [gender, setGender] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const today = new Date().toISOString().split('T')[0];

  // const [streetAddress, setStreetAddress] = useState(user.streetAddress || '');
  // const [city, setCity] = useState(user.city || '');
  // const [state, setState] = useState(user.state || '');
  // const [country, setCountry] = useState(user.country || '');
  // const [postalCode, setPostalCode] = useState(user.postalCode || '');
  // const [updating, setUpdating] = useState(false);

  // const handleUpdateAddress = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setUpdating(true);
  //     const userRef = doc(db, 'users', user.uid);
  //     await updateDoc(userRef, {
  //       streetAddress,
  //       city,
  //       state,
  //       country,
  //       postalCode
  //     });
  //     setUpdating(false);
  //   } catch (error) {
  //     console.error("Error updating address:", error);
  //     setUpdating(false);
  //   }
  // };

  return (
    <div className="update-profile">
      {/* <form onSubmit={handleUpdateAddress}> */}
      <form>
        <div>
          <label> Name : { }</label>
        </div>
        <div>
          <label> Email Id : { }</label>
        </div>
        <div>
          <label> Mobile No : <input type='number' placeholder='Enter your mobile no' /></label>
        </div>
        <div>
          <label> Adhar No : <input type='number' placeholder='Enter your adhar no' /></label>
        </div>
        <div>
          <label> Date of Birth : <input type='date' max={today} /></label>
        </div>
        <div className='gender'>
          <label>Gender:</label>
          <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
          <label htmlFor="male">Male</label>
          <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
          <label htmlFor="female">Female</label>
          <input type="radio" id="other" name="gender" value="other" checked={gender === 'other'} onChange={handleGenderChange} />
          <label htmlFor="other">Other</label>
        </div>
        <div>
          <label> Insurance : <input type='number' /></label>
        </div>
        <div className='address-text'>
          <label> Address: <textarea placeholder='Enter your address' rows={2} cols={60}  /></label>
        </div>
        <button type="submit" >Update Profile</button>
      </form>
    </div>
  );
};

const MyProfile = () => {
  return (
    <div className="user-profile">
      <nav>
        <ul>
          <li><Link to="">Account Details</Link></li>
          <li><Link to="myappointments">My Appointments</Link></li>
          <li><Link to="updateprofile">Update Profile</Link></li>
        </ul>
      </nav>

      <div className="profile-content">
        <Routes>
          <Route path="" element={<AccountDetails />} />
          <Route path="myappointments" element={<MyAppointments />} />
          <Route path="updateprofile" element={<UpdateProfile />} />
        </Routes>
      </div>
    </div>)
}

export default MyProfile