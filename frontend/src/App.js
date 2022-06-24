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


function App() {

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Helvetica"]
      },
    });
  }, [])

  return (

    // we have to keep Header component inside Rounter components otherwise it will give errors.
    // This is because Header have React-Navbar component
    // <Router >
      <>
      <Header />
      {/* <Switch> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route path="/search" component={Search} />
      {/* </Switch> */}
      <Footer />
      </>
    // {/* </Router > */}
  );
}

export default App;
