import React, { useContext, useEffect,useState } from 'react';
import DataContext from '../contexts/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCatalog = () => {
    const[ datas, setDatas] = useState([]);
    const navigate = useNavigate();
    const {cartItems,addToCart, removeFromCart} = useContext(DataContext);

    useEffect(() =>{
        axios.get('https://6529369855b137ddc83e649d.mockapi.io/products').then((response) =>{
            setDatas(response.data);
        })
    },[]);


  return (
    <>
        <div className='navbar-expand-xxl  navbar-dark bg-warning  sticky-top '>
            <div className='top-navbar'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-5 my-auto">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <button className="nav-link btn-danger  " onClick={() =>{navigate('/cart')}}>
                                        Cart ({cartItems.length})
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='row'>
                {datas.map((data) => (
                    <div className='col-sm-4 py-2' key={data.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">{data.Product}</h5>
                                <p className="card-text">{data.Description}</p>
                                <b className='card-text'>${data.Price}</b>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">
                                    <button type="button" class="btn btn-outline-danger mx-1" onClick={() => removeFromCart(data)}>Remove</button>
                                    <button type="button" class="btn btn-outline-success mx-1" onClick={() => addToCart(data)}>Add to Cart</button>
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
    </>
  )
}

export default ProductCatalog
