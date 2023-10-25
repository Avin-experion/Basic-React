import { useState } from "react";

const Search = ({callback}) => {

    const [searchItem, setSearchItem] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        callback(searchItem);
    }

  return (
    <form className="form-inline my-2 my-sm-0 float-end "  onSubmit={handleSubmit}>
       <input className="form-control mr-lg-2" type="text" placeholder='Search Product ...' aria-label='Search' value={searchItem} onChange={(e) => {setSearchItem(e.target.value)}} />
    </form>
  )
}

export default Search
