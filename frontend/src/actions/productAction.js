import axios from 'axios';

import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,

} from '../constants/productConstants';

// by default keyword is empty, initialPage=1
export const getProduct = (keyword = "", currentPage = 1, price = [0, 50000], category, ratings=0 ) => async(dispatch) => {

    try {

        dispatch({
            type:ALL_PRODUCT_REQUEST,
        });

        // here we're running our frontend at 3000 still we can get data from 4000 as we hae wrote "proxy":"http://localhost:4000" in frontend's package.json. If anything bad happens restart both backend and frontend servers then see again
        // const {data} = await axios.get('/api/v1/product');
        
        let link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if(category)
        {
            link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }

        const {data} = await axios.get(link);
        
        // console.log(data);
        
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            // yaha pe mene galti se error : error.response.data.essage kiy atha to error alert nahi aa rha tha
            payload:error.response.data.message,
        })
    }
};


export const getProductDetails = (id) => async(dispatch) => {
    try {

        dispatch({
            type:PRODUCT_DETAILS_REQUEST,
        });

        // here we're running our frontend at 3000 still we can get data from 4000 as we hae wrote "proxy":"http://localhost:4000" in frontend's package.json. If anything bad happens restart both backend and frontend servers then see again
        const {data} = await axios.get(`/api/v1/product/${id}`);
        
        // console.log(data.product);
        
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        });
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message,
        })
    }
};

// clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({type:CLEAR_ERRORS});
};