const mongoose = require('mongoose');

const connectDatabase = () => {mongoose.connect(process.env.DB_URI,{
    // useFindAndModify: true,
    useUnifiedTopology: true, 
    // useCreateIndex: true, // MongoParseError: option usecreateindex is not supported
    useNewUrlParser: true
})
.then((data) => console.log(`MongoDB connected successfully to server:${data.connection.host}`))
.catch((err) => console.log(err));
}

module.exports = connectDatabase
