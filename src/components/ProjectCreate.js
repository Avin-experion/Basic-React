import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Layout from './Layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ProjectCreate = () => {
    const [formData, setFormData] = useState({})
    const location = useLocation();
    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        axios.post(`https://6529369855b137ddc83e649d.mockapi.io/products`,formData).then(() =>{
            setFormData({Product :'', Description:'', Price:''});
            navigate('/');
            
        }).catch((error) => {
            console.log('Error Found',error);
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://6529369855b137ddc83e649d.mockapi.io/products/${location.state.id}`,formData).then(() => {
            setFormData({Product :'', Description:'', Price:''});
            navigate('/');
        }).catch((error) => {
            console.log('Error occured', error);
        })
    }

    const edit = location.state.text === 'Edit';
    useEffect(() => {          
        axios.get(`https://6529369855b137ddc83e649d.mockapi.io/products/${location.state.id}`).then((response) => {
            setFormData(response.data);
        }).catch((error) => {
            console.log('Error in fetching data', error);
        })

    },[]);
    

  return (
    <Layout>
        <div className='container'>
            <h2 className='text-center mt-5 mb-3'> {location.state.text} Product</h2>
            <div className='card'>
                <div className='card-header'>
                    <Link className='btn btn-outline-info float-right' to='/'>
                        View all Products
                    </Link>
                </div>
                <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='product'>Product Name :</label>
                            <input type='text'
                             id='product'
                            name='product'
                            value={formData.Product}
                            onChange={(e) => setFormData({...formData,Product : e.target.value})}
                            className='form-control'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='description'>Description :</label>
                            <textarea type='text'
                             id='description'
                            name='description'
                            value={formData.Description}
                            onChange={(e) => setFormData({...formData, Description: e.target.value})}
                            className='form-control'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='price'>Price :</label>
                            <input type='text'
                            id='price'
                            value={formData.Price}
                            onChange={(e) => setFormData({...formData, Price: e.target.value})}
                            name='price'
                            className='form-control'/>
                        </div>
                        <button type='button'
                        onClick={edit ? handleUpdate : handleSave}
                        className='btn btn-outline-primary mt-3'
                        >{edit ? 'Update':'Save'}</button>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ProjectCreate;
