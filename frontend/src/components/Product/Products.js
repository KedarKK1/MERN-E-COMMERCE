import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';
import "./Products.css";
import Pagination from "react-js-pagination";

const Products = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const keyword = match.params.keyword;

    const { products, loading, error, productCount, resultPerPage } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage))
    }, [dispatch, keyword, currentPage])

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

                    <div className="paginationBox">
                       {productCount > resultPerPage && (<>
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