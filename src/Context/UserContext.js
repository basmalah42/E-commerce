import { createContext, useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider(props) {

    const [userToken, setUserToken] = useState(null)
    const [itemCart, setItemCart] = useState(null)

    return <UserContext.Provider value={{ userToken, setUserToken  , itemCart , setItemCart}}>
        {props.children}
    </UserContext.Provider>
}