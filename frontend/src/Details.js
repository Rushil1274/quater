import React from 'react'
import img from './images/userIcon.jpg'
import "./App.css"

const Details = () => {
  return (
    <>
      <div className='details-main-con'>

        <div className='details-con1'>
          <div className='details-doc-img'>
            <img src={img}/>
          </div>
          <div className='details-doc-info'>
            <p>Name: </p>
            <p>Email: </p>
            <p>Specialities: </p>
            <p>Experience: </p>
            <p>Description: </p>
            <p>Hospital: </p>
            <p>Address: </p>
            <p>Fees: </p>
          </div>
        </div>
        <div className='details-con2'>
          <div className='details-sch-header'>
            <h2>Doctor's Schedules</h2>
          </div>

        </div>
      </div>
    </>
  )
}

export default Details