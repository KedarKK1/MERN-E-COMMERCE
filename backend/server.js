const app = require('./app');

const dotenv = require('dotenv');
dotenv.config({path:"./backend/config/config.env"});

// for uncaugh errors that is if i print console.log(youtube) where youtube is not a string then it is called uncaught reference errors
process.on("uncaughtException", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");

  server.close(()=>{
    process.exit(1);
  });
});


// const dbConnect = require('./connect')
const connectDatabase = require('./config/database')
connectDatabase()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.cz97f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log(err);
  // perform actions on the collection object
  client.close();
});

// mongoose.connect(dbUrl,{
//     useFindAndModify: true,
//     useUnifiedTopology: true, 
//     useCreateIndex: true,
//     useNewUrlParser: true
// })
// .then(() => console.log("DB connected successfully"))
// .catch((err) => console.log(err));


app.get('/', function (req, res) {
  res.send('Hello World');
});

// // login
// app.post('/api/users/login', function (req, res) {
//     res.send('ji')
// })

// //register
// app.post('/api/users/register', function (req, res) {
//     res.send('register')
// })

// //update
// app.put('/api/users/update', function (req, res) {
//     res.send('update')
// })

// //delete
// app.delete('/api/users/:id', function (req, res) {
//     res.send('delete')
// })

// // fetch users 
// app.get('/api/users', function (req, res) {
//     res.send('fetch user')
// })

const PORT = process.env.PORT || 4321;

app.listen(PORT, ()=>{
    console.log(`Server is running and listening on port ${PORT}`);
})


// for Unhandled Promise Rejection errors i.e. let's say someone changes your mongodb api code in .env file then it will give server error code
process.on("unhandledRejection", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  server.close(()=>{
    process.exit(1);
  });
});


