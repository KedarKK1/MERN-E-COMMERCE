// this is for autherization, that means only those who have logged in can that can create products
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{

    // const token = req.cookies; // this i token is object hence we'll change it in a json
    const { token } = req.cookies;
    // console.log(token);

    if(!token)
    {
        return next(new ErrorHander("Please Login to acces this resource",401));
    }

    // jab jwt token banaya tha tab usse id:_id diya tha, so wo ab access kar rhe hai
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);

    next();
});