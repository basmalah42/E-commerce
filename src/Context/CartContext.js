import { createContext } from "react";
import axios from "axios";

export let CartContext = createContext();

export default function CartContextProvider(props) {

    function checkOutSession(cartId , shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
           shippingAddress 
        } , {
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function addToCart(productId){
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId 
        } , {
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function getCartItems(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function deleteCartItem(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
        
    }
    function deleteAllCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function updateCartItem(id , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            count 
        } ,{
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
        
    }
    
    return <CartContext.Provider value={{checkOutSession,addToCart,getCartItems , deleteAllCart, deleteCartItem , updateCartItem}}>
        {props.children}
    </CartContext.Provider>
}