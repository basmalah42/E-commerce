import React, { useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yub from 'yup';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext.js';

export default function Login() {

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  let { setUserToken } = useContext(UserContext)

  let navigate = useNavigate()

  async function loginSubmit(values) {
    setLoading(true)
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setApiError(err.response.data.message)
        setLoading(false)
      });
    if (data.message == 'success') {
      setLoading(false);
      localStorage.setItem("user token", data.token);
      setUserToken(data.token)
      navigate("/")
    }
  }

  let validationSchema = Yub.object({
    email: Yub.string().required("Email is required").email('invalide email'),
    password: Yub.string().required("password is required").matches(/^[A-Z][\w @]{5,8}$/, 'invalid password ex) Ahmed@123'),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    }, validationSchema
    , onSubmit: loginSubmit
  })

  return <>
    <div className="w-75 mx-auto py-4">
      <h2>login Now</h2>
      <form onSubmit={formik.handleSubmit}>

        {apiError ? <div className="alert alert-danger py-2">{apiError}</div> : null}

        <label htmlFor="email"> Email : </label>
        <input type="email" id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}

        <label htmlFor="password"> Password : </label>
        <input type="password" id='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : null}

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
        </button> :   <div className="d-flex justify-content-between align-items-center">
          <div className="items">
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login</button>
            <Link className='ps-3 test' to={`/forgetPassword/${formik.values.email}`}> forget your password ?</Link>
          </div>
          <div className="reg">
            <Link className='ps-3 test' to={'/register'}> Register Now</Link>
          </div>
        </div> }

      </form>
    </div>

  </>
}
