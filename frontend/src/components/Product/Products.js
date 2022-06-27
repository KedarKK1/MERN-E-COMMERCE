import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';
import "./Products.css";
import Pagination from "react-js-pagination";
import { Slider, Typography } from '@mui/material';
import { useAlert } from 'react-alert';

const Products = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,50000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const dispatch = useDispatch();
    const alert = useAlert();

    const categories = [
        "Tp",
        "Home_appliances",
        "Electronics",
        "Jewellery",
        "Clothing",
        "Lifestyle",
        "Gaming",
        "Biking",
        "Fruits",
    ]

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
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

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

                    {/* {keyword && 
                    
                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={50000}/> 
                            
                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                    className="category-link"
                                    key={category}
                                    onClick={()=>setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">Rating Above</Typography>
                                <Slider 
                                    value={ratings}
                                    onChange={(e, newRating) => setRatings(newRating)}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>
                        </div>
                    
                    } */}

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={50000}/> 
                        
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                className="category-link"
                                key={category}
                                onClick={()=>setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Rating Above</Typography>
                            <Slider 
                                value={ratings}
                                onChange={(e, newRating) => setRatings(newRating)}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {/* <div className="paginationBox"> */}
                       {/* {productCount > resultPerPage && (<> */}
                        {/* {resultPerPage < myCount && (
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
                            ) 
                        } */}

                        {resultPerPage < myCount && (
                                    <div className="paginationBox">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activeClass="pageItemActive"
                                        activeLinkClass="pageLinkActive"
                                    />
                                    </div>
                                )}
                    {/* </div> */}

                </>
            }
        </Fragment>

    )
}

export default Products