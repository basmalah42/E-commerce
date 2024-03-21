import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';

export default function Categories() {
  const [isLoading, setLoading] = useState(true)
  const [categories, setCategories] = useState(null)
 async function getCategories() {
    let { data } = await  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    setCategories(data)
    setLoading(false)
  }
  
 

  useEffect(() => {
    getCategories();
  }, [])

  return <>
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
    </> :<div className="row g-4 text-center py-5 ">
      
      {categories.data.map(category => <div key={category._id}  className="col-md-4 rounded-3">
        <div className="images border border-1 rounded-3 pr pb-3">
        <Link to={`/subCategories/${category._id}/${category.name}`}>
          <img height={350} src={category.image} className='w-100 pb-3 rounded-3' alt={category.name} />
          <span className='text-main fs-3 fw-bold'>{category.name}</span>
          </Link>
        </div>
      </div>)}
  </div>}
    
  </>
}


