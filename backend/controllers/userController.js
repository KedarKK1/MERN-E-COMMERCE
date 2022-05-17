const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

// register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is simple public id",
            url:"profilePictUrl"
        },
    });

    // const token = user.getJWTToken();

    // // below lines will be returned in pstman terminal after creating of new user
    // res.status(201).json({
    //     success:true,
    //     user,
    //     token,
    // });

    // instead of creating token and sending status, we'll add utils jwtToken for reducing lines of codeship
    sendToken(user, 201, res);
});

// login user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    // checking if user has given password and user bother
    if(!email || !password)
    {
        return next(new ErrorHander("Please enter email and password",400))
    }

    // since we have selected:false password, we'll have to select it here
    // const user = User.findOne({email:email}).select("+password");
    const user = await User.findOne({email}).select("+password");

    if(!user)
    {
        return next(new ErrorHander("Invalid Email or password"), 401);
    }

    // for above user comparing password
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched)
    {
        return next(new ErrorHander("Invalid Email or password",401));
        // here we cant show invalid password as an unknown user may try an email with some random password therby knowing that this email id exists for an account 
    }

    // const token = user.getJWTToken();

    // // below lines will be returned in postman terminal after successful login of user
    // res.status(200).json({
    //     success:true,
    //     user,
    //     token,
    // });

    // instead of creating token and sending status, we'll add utils jwtToken for reducing lines of codeship
    sendToken(user, 200, res);
})