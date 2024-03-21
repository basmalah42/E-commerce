import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { wishListContext } from './../../Context/WishListContext';
import { BallTriangle } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext.js';

export default function WishList() {
  let {addToCart} =useContext(CartContext);
  let { setItemCart} = useContext(UserContext);
  const [wishList, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)
  
  let { getWishList ,deleteWishList} = useContext(wishListContext);

  async function getAllwishList() {
    let { data } = await getWishList();
    setWishlist(data)
    setLoading(false)
  }

  async function deleteItem(id) {
    setLoading(true)
    let { data } = await deleteWishList(id);
    getAllwishList()
  }

  

  useEffect(() => {
    getAllwishList();
  }, [])

  async function postToCart(id){
    let {data} =await addToCart(id)
    setItemCart(data.numOfCartItems)
    if (data.status == 'success') {
      toast.success(data.message,{duration :2000})
    }
   }

  return <>

    <div className="bg-main-light p-2 mt-5">
      <h2>My wish List</h2>
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
        {wishList.data.map((item , index) => <div key={index} className="row align-items-center p-2 m-0  border-1 border-bottom">
          <div className="col-md-2">
            <div className="img">
              <img src={item.imageCover} className='w-100' alt={item.category.name} />
            </div>
          </div>
           <div className="col-md-8">
            <div className="item">
              <h3 className='h5 fw-bold'>{item.category.name.split(' ').slice(0,3).join(' ')}</h3>
              <p className='text-main fw-bold'>Price : {item.price} EGP</p>
              <button onClick={()=>{deleteItem(item._id)}} className='btn'><i className='fas fa-trash-can text-danger me-2'></i> Remove</button>
            </div>
          </div>
          <div className="col-md-2">
            <div className="cart">
            <button onClick={()=> postToCart(item._id)} className='btn text-light bg-main btn-sm w-100'> Add To Card</button>
            </div>
          </div>
        </div>)}
       </>}
    </div>
  </>
}

