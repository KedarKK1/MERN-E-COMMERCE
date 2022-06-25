import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';
import "./Products.css";
import Pagination from "react-js-pagination";
import { Slider, Typography } from '@mui/material';

const Products = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,50000])

    const dispatch = useDispatch();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newprice) => {
        setPrice(newprice);
    }
    
    
    const keyword = match.params.keyword;
    
    const { products, loading, error, productCount, resultPerPage, filteredProductCount } = useSelector(state => state.products)
    
    let myCount = filteredProductCount;
    
    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price))
    }, [dispatch, keyword, currentPage, price])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <>
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={60000}/> 
                    </div>

                    <div className="paginationBox">
                       {/* {productCount > resultPerPage && (<> */}
                       {myCount > resultPerPage && (<>
                        <Pagination 
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="First"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                       </>) }
                    </div>

                </>
            }
        </Fragment>

    )
}

export default Products