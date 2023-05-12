const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));

//const User = require('./model/userSchema');

const PORT = process.env.PORT;

// const middleware = (req,res,next)=>{
//     console.log("Middleware Here");
//     next();
// }

// app.get('/',(req,res)=>{
//     res.send("Hello world - server")
// });

// app.get('/about',middleware,(req,res)=>{
//     console.log("About section");
//     res.send("Hello world - about")
// });

// app.get('/contact',(req,res)=>{
//     res.send("Hello world - contact")
// });

app.get('/signin',(req,res)=>{
    res.send("Hello world - signin")
});

app.get('/signup',(req,res)=>{
    res.send("Hello world - signup")
});

app.listen(PORT,()=>{
    console.log(`server - at port ${PORT}`)
})