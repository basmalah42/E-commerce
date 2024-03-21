import React, { useEffect, useState } from 'react';
import styles from './SubCategories.module.css';
import Categories from '../Categories/Categories.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';

export default function SubCategories() {
  let { id, name } = useParams();
  const [isLoading, setLoading] = useState(true)
  const [subCategories, setSubCategories] = useState(null)
 async function getSubCategories() {
    let { data } = await  axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`);
    setSubCategories(data)
    setLoading(false)
  }
  useEffect(() => {
    getSubCategories();
  }, [])
  
  
  return <>
    <Categories />
    {isLoading ? <>
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
      <h2 className='text-center text-main fs-1 fw-bold'>{name}</h2>
      <div className="row g-4 text-center py-5 ">
        {subCategories.data.map(subCategory => <div key={subCategory._id} className="col-md-4 rounded-3">
          <div className="contact border border-1 rounded-3 pr py-3">
            <h4 className='fs-3 fw-bold'>{subCategory.name}</h4>
          </div>
        </div>)}
      </div>
    </>}
  </>
}
