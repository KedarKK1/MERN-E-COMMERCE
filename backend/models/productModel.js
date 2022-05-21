const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{type: String,
        required: [true, "Please Enter product Name"] // true else it will show the string as
    },
    description:{type: String,
        required: [true, "Please Enter product description"] // true else it will show
    },
    price:{type: Number, 
        required: [true, "Please Enter product Price"] // true else it will show
    },
    ratings:{type: Number,
        default: 0},
    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{type: String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required: [true, "Please Enter product category"]
    },
    stock:{
        type:Number,
        required: [true, "Please Enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product",productSchema);