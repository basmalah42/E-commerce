import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProduct.module.scss';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext.js';
import { wishListContext } from './../../Context/WishListContext';


export default function FeaturedProduct() {
  let { addToCart } = useContext(CartContext);
  let { addToWishList } = useContext(wishListContext);
  let { setItemCart } = useContext(UserContext);

  async function postToCart(id) {
    let { data } = await addToCart(id)
    setItemCart(data.numOfCartItems)
    if (data.status == 'success') {
      toast.success(data.message, { duration: 2000 })
    }
  }
  async function postToWishlist(id, index) {
    let x = document.getElementById(`heart${index}`)
    x.classList.toggle(`${styles.heart}`)
    let { data } = await addToWishList(id)
    if (data.status == 'success') {
      toast.success(data.message, { duration: 2000 })
    }
  }
  // react query
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading, isError, isFeching } = useQuery("featuredProduct", getProducts)


  return <>
    <h2 className='my-3'>Featured Products</h2>

    {isLoading ? <>
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
      <div className="row gy-4">
        {data?.data.data.map((product, index) =>
          <div key={index} className="col-md-2">
            <div className="product p-2">
              <Link to={`/productdetails/${product.id}`} className='test'>
                <img src={product.imageCover} className='w-100' alt={product.title} />
                <span className='font-sm text-main '>{product.category.name}</span>
                <h3 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className="d-flex justify-content-between align-items-center py-3">
                  <span className='font-sm'>{product.price}EGP</span>
                  <span className='font-sm'>
                    <i className='fas fa-star rating-color me-1'></i>
                    {product.ratingsAverage}</span>
                </div>
              </Link>
              <span onClick={() => postToWishlist(product.id, index)} id={`heart${index}`} className=' ms-auto  fs-3'> <i className={`fa-solid fa-heart `}></i></span>
              <button onClick={() => postToCart(product.id)} className='btn text-main-light bg-main btn-sm w-100'> Add To Card</button>
            </div>

          </div>)}
      </div>
    </>}
  </>
}
