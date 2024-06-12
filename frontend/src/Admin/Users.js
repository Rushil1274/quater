import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'

const Users = () => {

  const deleteUser = async (id) => {
    // await deleteDoc(doc(db, 'users', id))
    toast.success('User deleted!')
  }

  return <section>
    <Container>
      <Row>
        <Col lg='12'><h4>Users</h4></Col>
        <Col lg='12' className='pt-5'>
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* <h4 className='pt-5'>Loading.....</h4> : usersData?.map(user=>(
              <tr key={user.uid}>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td> <button className='btn btn-danger' onClick={() => { deleteUser(user.uid); }}>Delete</button></td>
              </tr>
              )) */}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  </section>
}

export default Users