import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from '../constants/userConstants';

// login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        // const config = { headers: { "Content-type": "application/json","Access-Control-Allow-Origin":"*", "mode": 'cors' } }
        // const { data } = await axios.post('http://localhost:4000/api/v1/login/',(email,password),config);
        // dispatch({type: LOGIN_SUCCESS, payload: data.user});
        // const config = { headers: { "Content-type": "application/json","Access-Control-Allow-Origin":"*", "mode": 'cors' } }
        const { data } = await axios({
            method: 'POST',
            url: '/api/v1/login',
            data: {
                email: email,
                password: password
            },
            //   headers: { "Content-type": "application/json","Access-Control-Allow-Origin":"*", "mode": 'cors' }
        });
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    } catch (error) {
        // console.error(err);
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get('/api/v1/me');
        console.log('data loaduser action',data)
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });

    } catch (error) {
        // console.error(err);
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
}

// logout user
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        await axios.get('/api/v1/logout');
        dispatch({ type: LOGOUT_SUCCESS}); // we need not to send anything in logout as user:null and isAuthenticated: false 
    } catch (error) {
        // console.error(err);
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

// register
export const register = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        // console.log(typeof(userdata))
        const { data1 } = await axios({
            method: 'POST',
            url: 'http://localhost:4000/api/v1/register',
            data: { userdata },
            headers: { "Content-type": "application/json", "Access-Control-Allow-Origin": "*", "mode": 'cors' }
        });
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data1.user });

    } catch (error) {
        console.log(error)
        console.log(error.response.data.message)
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }
}

// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};