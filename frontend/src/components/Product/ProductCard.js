import React from 'react';
import { Link } from 'react-router-dom';
// import ReactStars from "react-rating-stars-component";
// import ReviewCard from './ReviewCard';
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {

  // function refreshPage() {
  //   setTimeout(() => {
  //     window.location.reload(false);
  //   }, 500);
    // console.log('page to reload else not')
  // }

  // const options = {
  //   edit: false,
  //   color: "rgba(20,20,20,0.1)",
  //   activeColor: "tomato",
  //   size: window.innerWidth < 600 ? 20 : 25,
  //   // value:2.5,
  //   value: product.rating,
  //   isHalf: true,
  // }

  const options2={
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  }

  // <Link className="productCard" to={`/product/${product._id}`} onClick={refreshPage}  >
  
  return (
    <Link className="productCard" to={`/product/${product._id}`} >
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        
        {/* <ReviewCard {...options} review={product.reviews} /> */}
        <span><Rating {...options2} /> ({product.numOfReview} reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>

    </Link>
  )
}

export default ProductCard;