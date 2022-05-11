class ErrorHander extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        
        Error.captureStackTrace(this,this.constructor);
    }

} 
//class name is always starts by capital letter

module.exports = ErrorHander