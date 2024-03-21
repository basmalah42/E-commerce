import React from 'react';
import styles from './CategorySlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategorySlider() {
  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false
  };

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let { data } = useQuery('categories', getCategories);

  return <>
    <div className="row">
      <Slider {...settings}>
        {data?.data.data.map(category => <div key={category._id} className="col-md-2">
          <div className="images">
            <img height={200} src={category.image} className='w-100' alt={category.name} />
            <span>{category.name}</span>
          </div>
        </div>)}
      </Slider>
    </div>
  </>
}
