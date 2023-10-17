import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../App.css';
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";

const Table = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsperPage] = useState(5);
  const [ searchItem, setSearchItem] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);


  const fetchData = async () =>{
    await axios.get("https://6529369855b137ddc83e649d.mockapi.io/products").then((response) => {
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log('Error featching data', error);
    })
  }

  useEffect(() =>{
    fetchData();
  },[])


  const handleCreate =  () =>{
    axios.post(`https://6529369855b137ddc83e649d.mockapi.io/products`,formData).then(() =>{
      fetchData();
      alert(`${formData.Product} is Added`)
      setFormData({Product : '', Description : '', Price: ''});
      
    }).catch((error) => {
      console.log(error);
    })

  }

  const handleUpdate = () =>{
    axios.put(`https://6529369855b137ddc83e649d.mockapi.io/products/${formData.id}`,formData).then(() => {
      fetchData();
      setFormData({Product : '', Description : '', Price: ''});
    })
  }

  const handleEdit = (item) => {
    setFormData(item);
  }

  const handleDelete = (id) =>{
    axios.delete(`https://6529369855b137ddc83e649d.mockapi.io/products/${id}`).then(() => {
      fetchData();
    }).catch((error) =>{
      console.log(error);
    })
  }

  const handleInputChange = (e) =>{
    setSearchItem(e.target.value);

  }

  const handleSort = (field) =>{
    if(field === sortField){
      setSortDirection(sortDirection === 1 ? -1:1);
    }else{
      setSortField(field);
      setSortDirection(1)
    }
  }

  const sortData = [...data].sort((a,b) => {
    if(sortField){
      if(a[sortField] < b[sortField]){
        return -sortDirection;
      }

      if(a[sortField] > b[sortField]){
        return sortDirection
      }
    }
    return 0;
});

  const filteredData = sortData.filter((datas) => (
    datas.Product.toLowerCase().includes(searchItem.toLowerCase())
  ))


  const indexofLastRecord = currentPage * recordsPerPage;
  const indexofFirstRecord = indexofLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexofFirstRecord,indexofLastRecord);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  


  return(
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className='card-body '>
            <form>

              <div className='form-group'>
                <label htmlFor='product'>Product Name : </label>
                <input type='text' name='product' className='form-control ' value={formData.Product} onChange={(e) => setFormData({...formData,Product : e.target.value})}/>
              </div>

              <div className='form-group'>
                <label htmlFor='description'> Description : </label>
                <input type='text' name='description' className='form-control ' value={formData.Description} onChange={(e) => setFormData({...formData, Description: e.target.value})} />
              </div>

              <div className='form-group'>
                <label htmlFor='price'>Price : </label>
                <input type='text' name='price' className='form-control ' value={formData.Price} onChange={(e) => setFormData({...formData, Price: e.target.value})} />
              </div>

              <div>
                <button type='button' className='btn1 btn btn-primary mt-3' onClick={handleCreate}>Add</button>
                <button type='button' className='btn2 btn btn-secondary mt-3' onClick={handleUpdate}>Update</button> 
              </div>

            </form>
          </div>

          <div>
            <div>
              <input type='text' value={searchItem} onChange={handleInputChange} placeholder='Search .....' />
            </div>
            <table className='table table-bordered p-2 '>
              <thead>
                <tr>
                  <th onClick={() => {handleSort('Product')}}>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Product}</td>
                    <td>{item.Description}</td>
                    <td>{item.Price}</td>
                    <td className='icons'>
                      <button className='btn' onClick={() => handleEdit(item)}><BsFillPencilFill/></button>
                      <button className='btn' onClick={() => handleDelete(item.id)}><BsFillTrashFill/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='pagination '>
            {Array.from({ length:Math.ceil(data.length / recordsPerPage)}).map((_ , index) => (
              <button key={index+1} onClick={() => paginate(index +1)}>{index+1}</button>
            ))}
          </div>
        </div>
      )}
    </div>
    
  )
}

export default Table


  // const [genData, setgenData] = useState([]);

  // const [loading, setLoading] = useState(false);

  // const [addData, setAddData] = useState({});

  // //Get data from the API
  // const fetchUrl = "https://6529369855b137ddc83e649d.mockapi.io/products";

  // useEffect(() => {
  //   async function fecthData(){
  //     const data = await axios.get(fetchUrl);
  //     setgenData(data.data);
  //     console.log(data);
  //     return data.data;
  //   }

  //   fecthData();
  // },[fetchUrl])

  //   const handleAddData = (event) => {
  //     event.preventDefault();

  //     const newData = {
  //       Product : addData.Product,
  //       Description : addData.Description,
  //       Price : addData.Price
  //     }

  //     const newDatas = [...genData, newData];
  //     setgenData(newDatas);
  //   }
  
  // return (
  //   <div>
  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : (


  //       <div>
  //         <div className='d-flex flex-row'>
  //           <button type='button' className='btn btn-primary ml-auto d-block  mb-2 me-3 ' data-bs-toggle="modal " data-bs-target="#addModalForm">
  //             Add Data +
  //           </button>
  //         </div>
          
  //         <table className='table table-bordered border-primary  m-3'>
  //           <thead>
  //             <tr>
  //               <th scope='col'>Product Name</th>
  //               <th scope='col'>Description</th>
  //               <th scope='col'>Price</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {genData.map((item) => (
  //               <tr key={item.id}>
  //                 <td>{item.Product}</td>
  //                 <td>{item.Description}</td>
  //                 <td>{item.Price}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>

  //         <div className='modal fade ' id="addModalForm">
  //           <div className='modal-dialog'>
  //             <div className='modal-content'>
  //               <div className='modal-header'>
  //                 <h5 className='modal-title' id="exampleModalLabel">Add New Post</h5>
  //                 <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label="Close"></button>
  //               </div>
  //               <div className='modal-body'>
  //                 <form onSubmit={handleAddData}>
  //                   <div className='mb-3'>
  //                     <label className='form-label'>ID</label>
  //                     <input type='text' className='form-control' name='id' placeholder={addData.id} required onChange={handleChange("id")} disabled />
  //                   </div>
  //                   <div className='mb-3'>
  //                     <label className='form-label'>Product Name</label>
  //                     <input type='text' className='form-control' name='product' placeholder="product" required onChange={handleChange("Product")}  />
  //                   </div>
  //                   <div className='mb-3'>
  //                     <label className='form-label'>Description</label>
  //                     <textarea rows="4" cols="50" type='text' className='form-control' name='description' placeholder="desctiption" required onChange={handleChange("Description")} disabled />
  //                   </div>
  //                   <div className='mb-3'>
  //                     <label className='form-label'>Price</label>
  //                     <input type='text' className='form-control' name='userId' placeholder="price" required onChange={handleChange("Price")} disabled />
  //                   </div>
  //                   <div className='modal-footer d-block'>
  //                     <button type='submit' className='btn btn-warning float-end'>Submit</button>
  //                   </div>
  //                 </form>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //       </div>

  //     )}
  //   </div>
  // );













































