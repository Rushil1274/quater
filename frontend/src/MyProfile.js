import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import "./App.css"


const AccountDetails = ({ user }) => (
  <div className="account-details">
    <AiOutlineUser className='user-icon' />
    <h4>Name: </h4>
    <p>Role: </p>
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

  // const handleGenderChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilter({ ...filter, [name]: value });
  // };

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
          <label for="mobileNo">Mobile No: <input type="tel" id="mobileNo" name="mobileNo" placeholder="Enter your mobile number" required minlength="10" maxlength="10" pattern="[0-9]{10,15}" /></label>
        </div>
        <div>
        </div>
        <label for="aadhaarNo">Aadhaar No: <input type="text" id="aadhaarNo" name="aadhaarNo" placeholder="Enter your Aadhaar number" required minlength="12" maxlength="12" pattern="\d{12}" /></label>
        <div>
          <label> Date of Birth : <input type='date' max={today} /></label>
        </div>
        <div className='gender'>
          <label>Gender:</label>
          <select id="gender" name="gender" onChange={handleGenderChange} className='input'>
            <option value="all"></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className='insurance'>
          <label for="insuranceNo">Insurance:</label>
          <select id="insurance" name="insurance" onChange={handleGenderChange} className='input'>
            <option value="all"></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className='address-text'>
          <label> Address: <textarea placeholder='Enter your address' rows={2} cols={60} /></label>
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