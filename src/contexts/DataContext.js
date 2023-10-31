import axios from "axios";
import { createContext,useEffect,useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);

    const addToCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if(isItemInCart){
            setCartItems(
                cartItems.map((cartItem) => cartItem.id === item.id ? {...cartItem, quantity : cartItem.quantity+1} : cartItem)
            )
        }else{
            setCartItems([...cartItems,{...item, quantity : 1}])
        }
    }

    const removeFromCart = (item) =>{
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if(isItemInCart.quantity === 1){
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        }else{
            setCartItems(
                cartItems.map((cartItem) =>
                cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity -1} : cartItem)
            )
        }
    }

    const clearCart = () =>{
        setCartItems([]);
    }

    const getTotalCost = () =>{
        return cartItems.reduce((total,item) => total+ item.Price * item.quantity, 0);
    }

    useEffect(() =>{
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },[cartItems]);

    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems');
        if(cartItems){
            setCartItems(JSON.parse(cartItems))
        }
    },[]);

    return(
        <DataContext.Provider value={{ 
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            getTotalCost
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;