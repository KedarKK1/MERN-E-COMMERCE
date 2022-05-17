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

exports.authorizeRoles = (...roles) =>{

    return (req,res,next) =>{

        // here below roles is an array thet have already list of people who have access to this middleware autheriztion and if req containes that then it is executed 
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(
                `Role : ${req.user.role} is not allowed/autherized to  access this resource`,403 
            ));
        }
        next();
    }
}