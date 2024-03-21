import React, { useContext, useState } from 'react';
import styles from './Home.module.css';
import FeaturedProduct from './../FeaturedProduct/FeaturedProduct';
import MainSlider from '../MainSlider/MainSlider.jsx';
import CategorySlider from './../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';

export default function Home() {

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Card</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <MainSlider />
    <CategorySlider />
    <FeaturedProduct />

  </>
}
