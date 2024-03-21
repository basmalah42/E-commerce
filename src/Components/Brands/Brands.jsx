import React, { useEffect } from 'react';
import styles from './Brands.module.css';
import { getBrands } from '../../Redux/BrandsSlide.js';
import { useDispatch, useSelector } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';

export default function Brands() {
  let dispatch = useDispatch()
  let { brands, isLoading } = useSelector(({ brand }) => brand)
  useEffect(() => {
    dispatch(getBrands());
  }, [])



  return <>
    <h2 className='text-center pt-5 text-main'>All Brands</h2>
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
      <div className='row py-5 g-4'>
        {brands.map(brand => <div key={brand._id} className='col-md-3 text-center'>
          <div className="border border-1 rounded-3 pr  p-2" data-bs-toggle="modal" data-bs-target={'#' + brand._id}>
            <img src={brand.image} alt={brand.name} className='w-100' />
            <p>{brand.name}</p>
          </div>
        </div>
        )}
        {brands.map((brand, index) => <div key={index} className="modal fade " id={brand._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role='dialog'>
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                      <div className="item">
                        <h2>{brand.name}</h2>
                        <p>{brand.name}</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="img">
                        <img src={brand.image} className='w-100' alt={brand.name} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>)
        }




      </div>



    </>
    }
  </>
}
