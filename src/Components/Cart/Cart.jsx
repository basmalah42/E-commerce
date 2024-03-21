import React, { useContext, useEffect } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext.js';
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext.js';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState(null)
  const [loading, setLoading] = useState(true)
  let { setItemCart } = useContext(UserContext);

  let { getCartItems, deleteCartItem, deleteAllCart, updateCartItem } = useContext(CartContext);
  async function getItems() {
    let { data } = await getCartItems();
    setCartItems(data)
   
    setLoading(false)
  }
  async function deleteAll() {
    setLoading(true);
    let { message } = await deleteAllCart();
    setItemCart(0)
    getItems()
  }

  async function deleteItem(id) {
    setLoading(true)
    let { data } = await deleteCartItem(id);
    setCartItems(data)
    setItemCart(data.numOfCartItems)
    setLoading(false)
  }

  async function updateItem(id, count) {
    if (count < 1) {
      deleteItem(id);
    } else {
      let { data } = await updateCartItem(id, count);
      setCartItems(data)
      setItemCart(data.numOfCartItems)
    }

  }

  useEffect(() => {
    getItems();
  }, [])

  return <>

    <div className="bg-main-light p-2 mt-5">
      <h2>Cart</h2>
      {loading ? <>
        <div className="loading">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass="text-main"
            visible={true}
          />
        </div>
      </> : <>
        {cartItems? <>
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="item">
          <p className='text-main'> numOfCartItems : {cartItems.numOfCartItems}</p>
          <p className='text-main'> totalCartPrice : {cartItems.data.totalCartPrice}</p>
          </div>
          <Link to={`/checkOut/${cartItems.data._id}`}>
          <button className='btn fw-bold bg-main text-light m-3'>Online Payment</button>
          </Link>
        </div>
          {cartItems.data.products.map(product => <div key={product.product.id} className="row align-items-center p-2 m-0  border-1 border-bottom">
            <div className="col-md-1">
              <div className="img">
                <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
              </div>
            </div>
            <div className="col-md-10">
              <div className="item">
                <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                <p className='text-main fw-bold'>Price : {product.price} EGP</p>
                <button onClick={() => { deleteItem(product.product.id) }} className='btn'><i className='fas fa-trash-can text-danger me-2'></i> Remove</button>
              </div>
            </div>
            <div className="col-md-1">
              <div className="count">
                <button onClick={() => { updateItem(product.product.id, product.count + 1) }} className='btn brdr p-1'>+</button>
                <span className='mx-2'>{product.count}</span>
                <button onClick={() => { updateItem(product.product.id, product.count - 1) }} className='btn brdr p-1'>-</button>
              </div>
            </div>
          </div>)}
          <button onClick={()=>{deleteAll()}} className=" btn btn-lg d-block mx-auto my-5 text-main border border-2"> Clear Your Cart</button>
        </> : <h2 className='fs-2 fw-bolder py-5'> your cart is empty</h2>}
      </>}
    </div>
  </>
}
