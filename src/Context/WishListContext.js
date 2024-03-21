import axios from "axios";
import { createContext } from "react";

export let wishListContext = createContext()

export default function WishListContextProvider(props) {
    function addToWishList(productId){
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
            productId 
        } , {
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function getWishList(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function deleteWishList(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
                token : localStorage.getItem("user token")
            }
        })
        .then((response)=> response)
        .catch((err)=> err)
        
    }
   
    return <wishListContext.Provider value={{addToWishList , getWishList ,deleteWishList }}>
        {props.children}
    </wishListContext.Provider>
}
