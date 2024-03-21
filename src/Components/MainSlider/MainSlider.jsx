import React from 'react';
import styles from './MainSlider.module.css';
import slider1 from "../../Assets/images/images/slider-image-1.jpeg"
import slider2 from "../../Assets/images/images/slider-image-2.jpeg"
import slider3 from "../../Assets/images/images/slider-image-3.jpeg"
import side1 from "../../Assets/images/images/blog-img-1.jpeg"
import side2 from "../../Assets/images/images/blog-img-2.jpeg"
import Slider from 'react-slick';

export default function MainSlider() {
  var settings = {
    dots: false,
    autoplay:true,
    autoplaySpeed:2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return <>
    <div className="row my-3 gx-0">
      <div className="col-md-9">
        <div className="item">
        <Slider {...settings}>
              <img src={slider1} height={400} className='w-100' alt="slider1" />
              <img src={slider2} height={400} className='w-100' alt="slider2" />
              <img src={slider3} height={400} className='w-100' alt="slider3" />
            </Slider>
        </div>
      </div>
      <div className="col-md-3">
        <div className="images">
          <img src={side1} className='w-100' height={200} alt="side1" />
          <img src={side2} className='w-100' height={200} alt="side2" />
        </div>
      </div>
    </div>

  </>
}
