// here we'll write same things that we did in userController to reduce lines of codes there
// we're creating an token and saving an cookie that

const sendToken = (user, statusCode, res) => {
    
    const token = user.getJWTToken();

    // option for cookie
    const options = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 //1000 for milliseconds
    ),
    httpOnly:true
    }

    res.status(statusCode).cookie("token",token,options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken;