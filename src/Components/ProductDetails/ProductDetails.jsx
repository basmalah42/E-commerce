import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext.js';
import { UserContext } from '../../Context/UserContext.js';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let {addToCart} =useContext(CartContext);
  let { setItemCart} = useContext(UserContext);
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
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  let { id } = useParams();
  async function getProductDetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data);
    setLoading(false)
  }
  async function postToCart(id){
    let {data} =await addToCart(id)
    setItemCart(data.numOfCartItems)
    if (data.status == 'success') {
      toast.success(data.message,{duration :2000})
    }
   }
  useEffect(() => {
    getProductDetails(id);
  }, [])



  return <>
   
    <h1>ProductDetails</h1>
    {loading ? <>
      <div className="row">
        <button type='button' className='btn  d-flex justify-content-center mt-5'>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass="text-main"
            visible={true}
          />
        </button>
      </div>
    </> : <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{details.title}</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
      <div className="row align-items-center">
        <div className="col-md-4">
          <div className="items">
            <Slider {...settings}>
              {details.images.map((image , index)=><img src={image} alt={details.title} key={index} className='w-100' />
              )}
            </Slider>

          </div>
        </div>
        <div className="col-md-8">
          <div className="item">
            <h3 className='h5'>{details.title}</h3>
            <p className='py-3'>{details.description}</p>
            <span className='font-sm text-main '>{details.category.name}</span>
            <div className="d-flex justify-content-between align-items-center py-3">
              <span className='font-sm'>{details.price}EGP</span>
              <span className='font-sm'>
                <i className='fas fa-star rating-color me-1'></i>
                {details.ratingsAverage}</span>
            </div>
            <button onClick={()=> postToCart(details.id)} className='btn text-light bg-main btn-sm w-100'> Add To Card</button>
          </div>
        </div>
      </div>
    </>}
  </>
}
