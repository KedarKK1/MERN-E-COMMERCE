const ErrorHander = require('../utils/errorhander');
const ErrorHandler = require('../utils/errorhander')

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // wronge mongo db error means if i put only 6 words instead of 24 digit hexadecimal no then it will throw casr error
    // we have used regex for avoiding such condition but still if any error happens then for that 
    if(err.name == "CastError"){
        const message = `Cast error could be that url dont have 24 digit hexadecimal no. Invalid:${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongodb duplicate id error for same email
    if(err.code == 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 400);
    }

    // jwt error 
    if(err.name == "JsonWebTokenError"){
        const message = `Json Web Token Invalid, Please try again `;
        err = new ErrorHandler(message, 400);
    }

    // jwt expired error 
    if(err.name == "TokenExpiredError"){
        const message = `Json Web Token is expired, Please try again `;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        // message:err // this error will just give success:false, etc
        message:err.stack //this error willgive details of where did error happend and what is error and name of error etc
    });
};

// Note - req.params.id is just a hexadecomal code do not use anything except from 0-f