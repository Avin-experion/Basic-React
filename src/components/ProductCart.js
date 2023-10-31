import { useContext } from "react";
import React from "react";
import DataContext from "../contexts/DataContext";

const ProductCart = () =>{
    const {cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCost} = useContext(DataContext);

    return(
        <div className="container">
            <div className="card">
                <div className="card-header text-center">
                    Cart
                </div>
                <div className="card-body ">
                    <div className="table table-bordered ">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}> 
                                    <td>{item.Product}</td>
                                    <td>{item.Price}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button className='btn btn-outline-success mx-1' onClick={() => {addToCart(item)}}>Add to Cart</button>
                                        <button className='btn btn-outline-danger mx-1' onClick={() => {removeFromCart(item)}}>Remove</button>
                                    </td>
                                </tr>
                            ))}                   
                        </tbody>
                    </div>
                </div>
            </div>
            {
                cartItems.length > 0 ? (
                <div className="flex flex-col justify-between items-center">
                <h1 className="text-lg font-bold">Total: ${getTotalCost()}</h1>
                <button
                className="btn btn-outline-warning  "
                onClick={() => {
                    clearCart()
                }}
                >
                Clear cart
                </button>
            </div>
                ) : (
                <h1 className="text-lg font-bold">Your cart is empty</h1>
                )
            }
        </div>
    )
}

export default ProductCart;