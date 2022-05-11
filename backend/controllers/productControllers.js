const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");

const catchAsyncErrors = require("../middleware/catchAsyncErrors")
// here we have not used try catch block till now,
// it's considered to be good practice to include try catch block in async functions
// eg. if i want to create an object with no name it will still passed in db through postman
// hence it's always good to follow try catch block
// so instead of adding try-catch block at each function, we'll have a code for try-catch block
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

// get all products
exports.getAllProducts = catchAsyncErrors(async(req,res) =>{
    const products = await Product.find();
    // res.status(200).json({message:"Route is working fine"})
    res.status(200).json({
        success:true,
        products
    })
});

// find information about an product by id
exports.getProductDetails = catchAsyncErrors(async(req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product)
    {
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })

        //  alternate way to return error by using error middleware, first we hae to create a uti errorHandler and then create a middleware erroe and use this middleware in app.js then afterwards use this in this page in next()
        // console.log("Entered this loop");


        // Note - req.params.id is just a hexadecomal code do not use anything except from 0-f
        return next(new ErrorHander("Product not found",404)); //tis is object hence we have to pass arguments here
    }

    res.status(200).json({
        success:true,
        message:"Product found",
        product
        //here product means updated product
    })

});

// update products -- admin only
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product)
    {
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })

        // Note - req.params.id is just a hexadecomal code do not use anything except from 0-f
        return next(new ErrorHander("Product not found",404)); //tis is object hence we have to pass arguments here
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        message:"Product found",
        product
        //here product means updated product
    })

    next();
});

// delete products -- admin only
exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product)
    {
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
        // Note - req.params.id is just a hexadecomal code do not use anything except from 0-f
        return next(new ErrorHander("Product not found",404)); //tis is object hence we have to pass arguments here
    }
    // res.res(200).json({success:true,message:"Product deleted",product});

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"});

    next();
});