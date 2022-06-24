import React from 'react'
// import ReactStars from 'react-rating-stars-component';
import profilePng from '../../images/profileImg.png'
import { Rating } from '@mui/material';

const ReviewCard = ({ review }) => {

const options={
  value: review.rating,
  readOnly: true,
  precision: 0.5,
}

// const options={
//   edit: false,
//   color: "rgba(20,20,20,0.1)",
//   activeColor: "tomato",
//   size: window.innerWidth < 600 ? 20 : 25,
//   // value:2.5,
//   value: review.rating,
//   isHalf:true,
// }



return (
    <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard