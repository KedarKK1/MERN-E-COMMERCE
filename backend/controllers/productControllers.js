const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
// here we have not used try catch block till now,
// it's considered to be good practice to include try catch block in async functions
// eg. if i want to create an object with no name it will still passed in db through postman
// hence it's always good to follow try catch block
// so instead of adding try-catch block at each function, we'll have a code for try-catch block
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    // here what we're doing is that passing req.body's id as req.body's user so in products database Schema's user field get id of this request user's id 
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

// get all products
exports.getAllProducts = catchAsyncErrors(async(req,res) =>{

    const resultPerPage = 2;

    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    // const products = await Product.find();
    // since apiFeature is class, we want to access it's properties
    const products = await apiFeature.query; //this will return {"success": true,"products": []}
    // res.status(200).json({message:"Route is working fine"})

    // below lines will be returned in pstman terminal after searching for all products
    res.status(200).json({
        success:true,
        products,
        productCount,
    });
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

// Create new review or update new review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{

    const {rating, comment, productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };

    // Product is in schema and product is founded object querry
    
    const product = await Product.findById(productId);
    // isReviewd me check karre ki kya is particular user ne pehelehi review diya hai kya iss product ke liye.
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString()); //for any variable rev find rev.user which is an mongoose ObjectId hence it should be converted into string 

    // console.log(product.reviews.length)
    if(isReviewed)
    {
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
                (rev.rating=rating),
                (rev.comment=comment),
                (product.numOfReview=product.reviews.length)
        });
    }
    else
    {
        // console.log("En this loop");
        product.reviews.push(review);
        product.numOfReview = product.reviews.length;
    }

    // Note ratings is a different schema attribute and in review there's different attribute rating
    // eg 4,5,3 => 12/3 = 4.
    let avg=0;
    // Note- we cant have product.rating = product.reviews.forEach(.........) etc it will not work
    product.reviews.forEach((rev) =>{
        avg += rev.rating; //this will return sum of all rating
    });

    product.ratings = (avg / product.reviews.length)
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success:true,
    })
});

// get all reviews related to a particulr product
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product)
    {
        return next(new ErrorHander("Product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews,
    });
});

// delete a review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product)
    {
        return next(new ErrorHander("Product not found",404));
    }

    // 1st filtering all reviews which we dont want to delete and passing it it's id
    const reviews = product.reviews.filter( (rev) => rev._id.toString() !== req.query.id.toString());

    // console.log(reviews);
    let avg=0;
    // Note- we cant have product.rating = product.reviews.forEach(.........) etc it will not work
    reviews.forEach((rev) =>{
        avg += rev.rating; //this will return sum of all rating
    });

    const ratings = (avg / reviews.length);

    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
        );

    res.status(200).json({
        success:true,
    });
})