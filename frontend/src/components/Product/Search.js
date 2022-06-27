import React, { Fragment, useState } from 'react';
import MetaData from '../layout/MetaData';
import "./Seach.css";


const Search = ({ history }) => {

    const [keyword, setKeyword] = useState("")

    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        // we'll trim additiional spaces to get valid results
        if(keyword.trim()){
            history.push(`/products/${keyword}`);
        }else{
            history.push(`/products`);
        }
    };

  return (
    <Fragment>
        <MetaData title={`Seach a Product --- Ecommerce`} />

        <form onSubmit={searchSubmitHandler} className="searchBox">
            <input type="text" className="search" placeholder="Search a Product..." onChange={(e)=>setKeyword(e.target.value)} />
            <input type="submit" value="search" />
        </form>
    </Fragment>
  )
}

export default Search