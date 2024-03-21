import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yub from 'yup';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
let navigate =useNavigate()

  async function registerSubmit(values) {
    setLoading(true)
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setApiError(err.response.data.message)
        setLoading(false)
      });
    if (data.message == 'success') {
      setLoading(false);
      navigate("/login")
    }
    console.log(values);
  }

 

  let validationSchema = Yub.object({
    name: Yub.string().required("Name is required").min(3, 'min length is 3').max(10, 'max length is 10'),
    email: Yub.string().required("Email is required").email('invalide email'),
    password: Yub.string().required("password is required").matches(/^[A-Z][\w @]{5,8}$/, 'invalid password ex) Ahmed@123'),
    rePassword: Yub.string().required("repassword is required").oneOf([Yub.ref("password")], "password and repassword don't match"),
    phone: Yub.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, 'we need egyption number')
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ''
    }, validationSchema
    , onSubmit: registerSubmit
  })
  return <>
    <div className="w-75 mx-auto py-4">
      <h2>Register Now</h2>
      <form onSubmit={formik.handleSubmit}>

        {apiError ? <div className="alert alert-danger py-2">{apiError}</div> : null}


        <label htmlFor="name"> Name : </label>
        <input type="text" id='name' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2">{formik.errors.name}</div> : null}

        <label htmlFor="email"> Email : </label>
        <input type="email" id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}

        <label htmlFor="password"> Password : </label>
        <input type="password" id='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : null}

        <label htmlFor="rePassword"> rePassword : </label>
        <input type="password" id='rePassword' name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger py-2">{formik.errors.rePassword}</div> : null}

        <label htmlFor="phone"> Phone : </label>
        <input type="tel" id='phone' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger py-2">{formik.errors.phone}</div> : null}

        {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='button' className='btn bg-main text-light'>
          <BallTriangle
            height={30}
            width={30}
            radius={5}
            color="#fff"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>
        }
        <Link className='ps-3 test' to={'/login'}> Login Now</Link>

      </form>
    </div>

  </>
}
