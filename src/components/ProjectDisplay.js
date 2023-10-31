import axios from 'axios'
import React, {useEffect, useState} from 'react';
import Layout from './Layout';
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import Pagination from './Pagination';

const ProjectDisplay = () => {

    const navigate = useNavigate();
    const [datas, setDatas] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [recordsPerPage,setrecordsPerPage] = useState(5);
    const [sortField,setSortField] = useState();
    const [sortDirection, setSortDirection] = useState(1);


    const sortData = [...datas].sort((a,b) => {
        if(sortField){
            if(a[sortField]<b[sortField]){
                return -sortDirection
            }

            if(a[sortField] > b[sortField]){
                return sortDirection
            }
        }
        return 0;
    })

    const indexofLastRecord = currentPage * recordsPerPage;
    const indexofFirstRecord = indexofLastRecord - recordsPerPage;
    const currentRecords = sortData.slice(indexofFirstRecord,indexofLastRecord);
    const nPages = Math.ceil(datas.length/recordsPerPage);

    const handleEdit = (id) =>{

        navigate("/edit",{
            state:{
                id : id,
                text : 'Edit'
            }
        })
    }

    const handleRecordPerPage = (event) => {
        const newItem = parseInt(event.target.value)
        setrecordsPerPage(newItem)
    }

    const filterDatas = (value) => {
        const filter = datas.filter((data) => (
            data.Product.toLowerCase().includes(value.toLowerCase())
        ));
        setDatas(filter);

    }

    const fecthData = async () => {
        await axios.get('https://6529369855b137ddc83e649d.mockapi.io/products').then((response) => {
            setDatas(response.data);
            if(searchValue !== ""){
                filterDatas(searchValue);
            }
        }).catch((error) => {
            console.log('Error occured', error);
        })
    }

    useEffect(() =>{
        fecthData();
        
    }, [searchValue]);


    const handleDelete = (id) =>{
        axios.delete(`https://6529369855b137ddc83e649d.mockapi.io/products/${id}`).then(() =>{
            fecthData();
        }).catch((error) => {
            console.log('Error occured', error);
        })
    }

    const handleSort = (field) => {
        if(field === sortField){
            setSortDirection(sortDirection === 1 ? -1:1)
        }else{
            setSortField(field);
            setSortDirection(1);
        }
    }


    const handleCreate = () =>{
        navigate("/create",{
            state:{
                text : 'Create'
            }
        })
    }

    const handleCatalog = () =>{
        navigate("/product")
    }

  return (
    <Layout>
        <div className='container'>
            <h2 className='text-center mt-5 mb-3'>Products</h2>
            <div className='card'>
                <div className='card-header text-center '>
                    <button className='btn btn-outline-primary float-left' onClick={handleCreate}>
                        Create new Products
                    </button>
                    <button className='btn btn-outline-dark' onClick={handleCatalog}>
                        Product Catalog
                    </button>

                    
                    <Search callback={(value) => {setSearchValue(value)}}/>
                </div>
                <div className='card-body'>
                    <table className='table table-bordered '>
                        <thead>
                            <tr>
                                <th scope='col' onClick={() => {handleSort('Product')}}>Product Name</th>
                                <th scope='col'>Description</th>
                                <th scope='col' onClick={() => {handleSort('Price')}}>Price</th>
                                <th width='120px' scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((data) => {
                                return(
                                    <tr key={data.id}>
                                        <td>{data.Product}</td>
                                        <td>{data.Description}</td>
                                        <td>{data.Price}</td>
                                        <td>
                                            <button className='btn btn-outline-success mx-1' onClick={() => {handleEdit(data.id)}}><BsFillPencilFill/></button>
                                            <button className='btn btn-outline-danger mx-1' onClick={() => {handleDelete(data.id)}}><BsFillTrashFill/></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div>
                        <label><b>Items per page: </b>
                            <select value={recordsPerPage} onChange={handleRecordPerPage}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>
                        </label>
                        <Pagination 
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        />
                    </div>
                    

                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ProjectDisplay
