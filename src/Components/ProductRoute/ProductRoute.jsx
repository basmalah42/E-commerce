import React from 'react';
import styles from './ProductRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProductRoute(props) {
 if (localStorage.getItem("user token")) {
  return props.children
 }else{
  return <Navigate to={'/login'}/>
 }
 
}
