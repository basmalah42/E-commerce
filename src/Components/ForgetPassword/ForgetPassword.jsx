import React, { useEffect, useState } from 'react';
import styles from './ForgetPassword.module.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

export default function ForgetPassword() {
  let { email } = useParams()
   let [value, setValue] = useState(null)
  function updatePassword() {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
      email
    })
      .then((response) => response)
      .catch((err) => err)
  }

  async function getNewPasswrd() {
    let { data } = await updatePassword();
    console.log(data);
    if (data.statusMsg == 'success') {
      toast.success(data.message, { duration: 5000 })
    }
  }
  function getCode({resetCode}){
    setValue(resetCode);
  }
  let formik = useFormik({
    initialValues: {
      resetCode: "",}
    , onSubmit: getCode
  })
  useEffect(() => {
    getNewPasswrd()
  }, [])

  return <>
   <form onSubmit={formik.handleSubmit}>
   <label htmlFor="resetCode" className='fs-2 fw-bold py-3'> please enter your verification code : </label>
    <input type="tel" id='number' name='resetCode' onChange={formik.handleChange} placeholder='Code' className='form-control mb-3 py-3' />

   <Link to={`/resetCode/${value}`}><button type='submit' disabled={!formik.dirty} className='btn bg-main text-white fw-bold'>Verify</button></Link>
   </form>


  </>
}
