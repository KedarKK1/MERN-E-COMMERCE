import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import './Home.css';
import ProductCard from '../Product/ProductCard.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';


// const product={
//     name:"Blue T-shirt",
//     images:[{url : "https://assets.ajio.com/medias/sys_master/root/20220121/8pKF/61ea5b4baeb2695cdd24612b/-473Wx593H-461592493-multi-MODEL.jpg"}],
//     price:"₹1200",
//     _id:"kedar"
// }

const Home = () => {

    const alert = useAlert(); // we'll use this alert in useEffect

    // we have to tell when to use reducers and actions hence we call useDispatch here
    const dispatch = useDispatch();

    // to access data from getProduct we'll use useSelector
    const { loading , error, products, productCount, resultPerPage } = useSelector((state)=>state.products);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])
    // Note here we'll get only that no of products that we have set in productPerPage in backend

return (
    <Fragment>
        {loading ? (< Loader />) :     
            (<Fragment>
                {/* fragment is nothing but empty tag */}
                <MetaData title="Ecommerce" />
                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>Find amazing products below</h1>

                    <a href="#container">
                        <button>
                            Scroll <CgMouse />
                        </button>
                    </a>
                </div>
                
                <h2 className="homeHeading">
                    Featured product
                </h2>

                <div className="container" id="container">
                    {/* <Product product={product} />
                    <Product product={product} />
                    <Product product={product} />
                    <Product product={product} />

                    <Product product={product} />
                    <Product product={product} />
                    <Product product={product} />
                    <Product product={product} /> */}

                    {/* Each child in a list should have a unique "key" prop. so we'll give key to each child */}
                    {products && products.map(product =>(
                        <ProductCard key={product._id} product={product} />
                    ))}

                </div>
            </Fragment>
            )
     }
    </Fragment>
  )
}

export default Home;