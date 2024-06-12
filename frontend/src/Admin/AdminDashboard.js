import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './Admin.css'

const AdminDashboard = () => {
  return <section>
  <Container>
    <Row>
      <Col className="lg-3">
        <div className="revenue_box">
          <h5>Total Users</h5>
          <span>sdfb</span>
        </div>
      </Col>
      <Col className="lg-3">
      <div className="doctors_box">
          <h5>Total Doctors</h5>
          <span>sfdb</span>
        </div>
      </Col>
      <Col className="lg-3">
      <div className="orders_box">
          <h5>Total Patients</h5>
          <span>sdfb</span>
        </div>
      </Col>
      <Col className="lg-3">
      <div className="products_box">
          <h5>Total Receiptionist</h5>
          <span>sdf</span>
        </div>
      </Col>
    </Row>
  </Container>
</section>
}

export default AdminDashboard