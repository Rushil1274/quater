// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col } from 'reactstrap';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8081/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         toast.error('Error fetching users');
//       }
//     };

//     fetchUsers();
//   }, []);

//   const deleteUser = async (loginId) => {
//     try {
//       await axios.delete(`http://localhost:8081/users/${loginId}`);
//       setUsers(users.filter(user => user.login_id !== loginId)); // Remove deleted user from state
//       toast.success('User deleted!');
//     } catch (error) {
//       console.error('Error deleting user:', error.response?.data || error.message);
//       toast.error(`Error deleting user: ${error.response?.data?.details || error.message}`);
//     }
//   };

//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="12">
//             <h4 className='user-h4'>Users</h4>
//           </Col>
//           <Col lg="12" className="pt-5">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Username</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                     <tr key={user.login_id}>
//                       <td>{user.name}</td>
//                       <td>{user.email}</td>
//                       <td>{user.role}</td>
//                       <td>
//                         <button
//                           className="btn-deluser btn-danger"
//                           onClick={() => deleteUser(user.login_id)} // Use login_id here
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 }
//               </tbody>
//             </table>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Users;


import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users); // Initialize filteredUsers with all users on load
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users');
    }
  };

  const deleteUser = async (loginId) => {
    try {
      await axios.delete(`http://localhost:8081/users/${loginId}`);
      setUsers(users.filter(user => user.login_id !== loginId));
      setFilteredUsers(filteredUsers.filter(user => user.login_id !== loginId)); // Update filteredUsers after deletion
      toast.success('User deleted!');
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
      toast.error(`Error deleting user: ${error.response?.data?.details || error.message}`);
    }
  };

  const filterUsersByRole = (role) => {
    if (role === 'all') {
      setFilteredUsers(users); // Show all users
    } else {
      const filtered = users.filter(user => user.role === role);
      console.log(filtered); // Add this line to log the filtered array
      setFilteredUsers(filtered);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className='user-h4'>Users</h4>
          </Col>
          <Col lg="12" className="pt-3">
            <div className="text-center">
              <Button className="mr-2" onClick={() => filterUsersByRole('all')}>All Users</Button>
              <Button className="mr-2" onClick={() => filterUsersByRole('Doctor')}>Doctors</Button>
              <Button onClick={() => filterUsersByRole('Patient')}>Patients</Button>
            </div>
          </Col>
          <Col lg="12" className="pt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.login_id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn-deluser btn-danger"
                        onClick={() => deleteUser(user.login_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
