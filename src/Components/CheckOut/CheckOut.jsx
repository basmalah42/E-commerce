import React, { useContext, useState } from 'react';
import styles from './CheckOut.module.css';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext.js';

export default function CheckOut() {
let { checkOutSession } = useContext(CartContext);
let { id }=useParams();
  async function getCheckOut(values) {
    let {data} = await checkOutSession( id , values)
  console.log(data);
  if(data.status == 'success'){
    window.location.href=data.session.url;
  }
  }


  let formik = useFormik({
    initialValues: {
      details: "",
      phone: '',
      city: '',}
    , onSubmit: getCheckOut
  })
  return <>
    <div className="w-75 mx-auto py-4">
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="details"> Details : </label>
        <input type="text" id='details' name='details' onChange={formik.handleChange} className='form-control mb-3' />
       
        <label htmlFor="phone"> Phone : </label>
        <input type="tel" id='phone' name='phone' onChange={formik.handleChange} className='form-control mb-3' />
        
        <label htmlFor="city"> city : </label>
        <input type="text" id='city' name='city' onChange={formik.handleChange} className='form-control mb-3' />
       
        <button type='submit'  className='btn my-5 bg-main w-100 text-light'>Pay Now</button>
        
       
      </form>
    </div>

  </>
}
