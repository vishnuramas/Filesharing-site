require('dotenv').config();
const mongoose = require('mongoose');

function connectDB(){
    //Database connection 
    mongoose.connect(process.env.MONGO_CONNECTION_URL,{useNewUrlParser : true,useUnifiedTopology:true}).then(()=>{
        console.log("connected");
    }).catch((err) => {
        console.log(err);
    });
    // const connection = mongoose.connection;

    // connection.once('open',() => {
    //     console.log('Database Connected')
    // }).catch(err => {
    //     console.log('connection failed');
    // })
}

module.exports = connectDB;