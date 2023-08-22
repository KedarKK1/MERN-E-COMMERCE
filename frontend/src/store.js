import { createStore , combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productReducer } from './reducers/productReducers';
import { userReducer } from './reducers/userReducer';

// this will combine all reducers ino one single reducer
// Don't create more than one store in an application! Instead, use combineReducers to create a single root reducer out of many
const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    user: userReducer,
});

const initialState = {};

const middleware = [thunk];

// If your state is a plain object, make sure you never mutate it! Immutable updates require making copies of each level of data, typically using the object spread operator
// redux ke sath kaam karte wakt 3 cheeze maintain karni padti - reducer, action and consent maintain karni padti hai, consent not necessary but it makes code look neat and clean
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));
    // Note - in composeWithDevTools if applyMiddleware is not used then it willl give getstate is not a function error

export default store;