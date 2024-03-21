import React, { useEffect, useState } from 'react';
import styles from './AllOrders.module.css';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';

export default function AllOrders() {

  const [orders, setOrders] = useState({})
  const [loading, setLoading] = useState(true)

  async function getOrders() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`)
    console.log(data);
    setOrders(data);
    setLoading(false)
  }

  useEffect(() => {
    getOrders();
  }, [])


  return <>
    <h2 className='text-main text-center my-5 fw-bolder'>AllOrders</h2>
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
      {orders.map((order) => <div key={order.id} className='row g-3 border-1 \ p-2 m-0 text-center'>
        <p className='bg-main text-light py-2 mt-2'>Updated Order at :{order.updatedAt}</p>
        {order.cartItems.map((item, index) =><div  key={index} className="col-md-2 bg-light ">
            <div className=" item">
              <img  src={item.product.imageCover} className='w-100' alt={item.product.title} />
              <h6 className='text-main mt-2'>{item.product.title.split(' ').slice(0, 2).join(' ')}</h6>
            </div>
          </div> )}
      </div>)}
    </>
    }
  </>
}


