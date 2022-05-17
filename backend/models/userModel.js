const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name can not exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validator:[validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password must be at least 8 characters"],
        select:false, //this will not show password whenever a query on userModel is called
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

// calling event pre save that meaning each time before creating new user
userSchema.pre("save", async function(next){
 
    // below line means ki jab bhi user update karega tab password change nahi hoga, else password change hoga
    if(!this.isModified("password")){
        next();
    }

    // below 10 means power 10, meaning it qill be 10 digit password hash
    this.password = await bcrypt.hash(this.password,10);

});
    
// JWT token
userSchema.methods.getJWTToken = function(){
    // we are creating json web token, so payload dena hai,
    // we'll provide id as user's id(_id)
    // then we'll provide secret key
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// method for comparing password
userSchema.methods.comparePassword = async function(enteredPassword){
    // below will return true or false
    // console.log(await bcrypt.compare(enteredPassword,this.password));
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User", userSchema);