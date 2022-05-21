const Order = require('../models/orderModels');
const Product = require('../models/productModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// create new order
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    // if(!order)
    // {
    //     return next(new ErrorHander("Order unsuccessful, Please try again",404));
    // }

    res.status(200).json({
        success:true,
        order,
    })
});

// get single order 
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) => {

    // when we use onlyfindbyId and not populate, we'll get the user's id only,not it's details
    // so we'll use populate so that using that userId, populate will find "user" thay we have given and then find it's "name" and "email" for us without any new function
    
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order)
    {
        return next(new ErrorHander("Order not found with this id",404));
    }

    res.status(200).json({
        success:true,
        order,
    });
});

// get logged in User's all orders 
exports.myOrders = catchAsyncErrors(async(req,res,next) => {

    // when we use onlyfindbyId and not populate, we'll get the user's id only,not it's details
    const order = await Order.find({user:req.user._id});

    // if(!order)
    // {
    //     return next(new ErrorHander("Order not found with this id",404));
    // }

    res.status(200).json({
        success:true,
        order,
    });
});

// get all orders for Admin
exports.getallOrders = catchAsyncErrors(async(req,res,next) => {

    // for getting all orders
    const orders = await Order.find();
    
    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    // if(!order)
    // {
    //     return next(new ErrorHander("Order not found with this id",404));
    // }

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
});

// Update Order status -- Admin
exports.updateOrderStatus = catchAsyncErrors(async(req,res,next) => {

    const order = await Order.findById(req.params.id);
    
    if(!order)
    {
        return next(new ErrorHander("Order not found with this id",404));
    }

    if(order.orderStatus === "Delivered" )
    {
        return next(new ErrorHander("You have already delivered the order",400));
    }

    order.orderItems.forEach(async (myorder) => {
        await updateStock(myorder.product, myorder.quantity);
    });

    order.orderStatus = req.body.status;

    if(req.body.status ==="Delivered"){ 
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
        order,
    });
});

async function updateStock(id,quantity)
{
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({validateBeforeSave: false});
};

// delete order
exports.deleteOrder = catchAsyncErrors(async(req,res,next) => {

    const order = await Order.findById(req.params.id);
    
    if(!order)
    {
        return next(new ErrorHander("Order not found with this id",404));
    }

    await order.remove();

    res.status(200).json({
        success:true,
    });
});