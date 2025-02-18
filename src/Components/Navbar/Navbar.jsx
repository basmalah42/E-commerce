import React, { useContext, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext.js';
import { useSelector } from 'react-redux';


export default function Navbar() {
 let {userToken , setUserToken , itemCart , setItemCart} =useContext(UserContext);

let {count} = useSelector(({counter})=> counter)

 let navigate = useNavigate();
 function logOut() {
  localStorage.removeItem("user token");
  setUserToken(null)
  setItemCart(null)
  navigate("/login")
 }
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken != null ? <>
              <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/wishList">WishList</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">Brands</Link>
            </li>
            
</> :''}
           
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
            {userToken != null ?<>
              <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart"><i className="fa-solid fa-cart-shopping text-main"></i> 
              <div className='position-absolute  top-0 end-0'>{itemCart}</div>
              </Link>
            </li>
              <li className="nav-item">
              <span onClick={logOut} className="nav-link cursor-pointer" >Logout</span>
            </li>
            
            </> : <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            </>}

          </ul>

        </div>
      </div>
    </nav>
  </>
}
