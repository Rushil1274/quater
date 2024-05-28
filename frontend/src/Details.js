import React from 'react'
import img from './images/userIcon.jpg'

const Details = () => {
  return (
    <>
      <div className='col-4'>
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
      <div className='col-6'>
        <div>

        </div>
      </div>
    </>
  )
}

export default Details