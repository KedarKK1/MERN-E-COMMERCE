const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendMail = require('../utils/sendEmail');
const crypto = require('crypto');

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
});


// logout
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.json({
        success:true,
        message:"Logged out"
    })
})

// forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({ email:req.body.email });

    // console.log(user);
    if(!user)
    {
        return next(new ErrorHander("User not found",404))
    }

    // get reset password
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});
    console.log(resetToken);

    // const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your reset password token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this mail then please ignore it`;

    try {

        await sendMail({
            email:user.email,
            subject:'Ecommerce Password Recovery',
            message,
        })

        res.status(200).json({
            success:true,
            message: `Email send to ${user.email} successfully`
        });
        
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordToken = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHander(err.message,500));
        // console.error(err);        
    }

});

// reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    // creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    // below is same as resetPassword:resetPassword
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt:Date.now() },
    });
    
    if(!user)
    {
        return next(new ErrorHander("Reset password token is invalid or has been expired",400))
    }

    if(req.body.password !== req.body.confirmPassword)
    {
        return next(new ErrorHander("Password does not match confirmPassword",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire= undefined;

    await user.save();

    // after successfull change of password, we'll automatically mak user login
    sendToken(user,200,res);    
});