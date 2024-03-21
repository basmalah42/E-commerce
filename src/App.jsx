import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import CounterContextProvider from './Context/CounterContext.js';
import { useContext } from 'react';
import { UserContext } from './Context/UserContext.js';
import { useEffect } from 'react';
import ProductRoute from './Components/ProductRoute/ProductRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import { CartContext } from './Context/CartContext.js';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import SubCategories from './Components/SubCategories/SubCategories';
import WishList from './Components/WishList/WishList.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import ResetCode from './Components/ResetCode/ResetCode';

export default function App() {
  let routes = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <ProductRoute> <Home /> </ProductRoute> },
        { path: 'products', element: <ProductRoute><Products /></ProductRoute> },
        { path: 'cart', element: <ProductRoute><Cart /></ProductRoute> },
        { path: 'categories', element: <ProductRoute><Categories /></ProductRoute> },
        { path: 'brands', element: <ProductRoute><Brands /></ProductRoute> },
        { path: 'allOrders', element: <ProductRoute><AllOrders /></ProductRoute> },
        { path: 'wishList', element: <ProductRoute><WishList /></ProductRoute> },
        { path: 'checkOut/:id', element: <ProductRoute><CheckOut /></ProductRoute> },
        { path: 'forgetPassword/:email', element: <ForgetPassword/> },
        { path: 'productdetails/:id', element: <ProductRoute><ProductDetails /></ProductRoute> },
        { path: 'subCategories/:id/:name', element: <ProductRoute><SubCategories /></ProductRoute> },
        { path: 'resetCode/:code', element: <ResetCode />},
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ]
    }
  ])

  let { setUserToken, setItemCart } = useContext(UserContext);
  let { getCartItems } = useContext(CartContext);
  async function getItems() {
    let { data } = await getCartItems();
    if (data != undefined) {
      setItemCart(data.numOfCartItems)
    }else{
      setItemCart(0)
    }

  }
  useEffect(() => {
    if (localStorage.getItem('user token')) {
      setUserToken(localStorage.getItem('user token'));
      getItems();
    }
  }, [])


  return <>
    <CounterContextProvider>
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </Provider>
    </CounterContextProvider>
  </>
}
