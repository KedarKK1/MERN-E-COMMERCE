import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js'
import { Route } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import webFont from 'webfontloader';
import React from 'react';
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions.js'
import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/User/Profile.js';
import ProtectedRoute from './components/Routes/ProtectedRoute';

function App() {
  
  const { isAuthenticated, user } = useSelector((state)=>state.user)

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Helvetica"]
      },
    });

    // IMP - below line will save user even after reload and if logged in, each time user tries to go to login page, it will redirect to /account page
    store.dispatch(loadUser());
  }, [])

  return (

    // we have to keep Header component inside Rounter components otherwise it will give errors.
    // This is because Header have React-Navbar component
    // <Router >
      <>
      <Header />
      {/* <Switch> */}
        {isAuthenticated && <UserOptions user={user} /> }
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route path="/search" component={Search} />
        <Route exact path="/account" component={Profile} />
        <Route exact path ="/login" component={LoginSignUp} />
      {/* </Switch> */}
      <Footer />
      </>
    // {/* </Router > */}
  );
}

export default App;
