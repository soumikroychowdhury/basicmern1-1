const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

require('../db/conn');
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");

router.get('/',(req,res)=>{
    res.send("Hello world - server router");
});
//Using promises
// router.post('/register',(req,res)=>{
//     const {name,email,phone,work,password,cpassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"Please fill all data"});
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exists"});
//         }
//         // const user = new User(req.body);
//         const user = new User({name,email,phone,work,password,cpassword});
//         user.save().then(()=>{
//             res.status(201).json({message:"User registered successfully"});
//         }).catch((err) => res.status(500).json({error:"Failed to register"}));
//         // console.log(req.body.name);
//         // console.log(req.body.email);
//         // console.log(name);
//         // console.log(email);
//         // res.json({message:req.body});
//     }).catch(err => {console.log(err);});
// });
//Using async await
router.post('/register',async(req,res)=>{
    const {name,email,phone,work,password,cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Please fill all data"});
    }
    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email already exists"});
        }else if(password!=cpassword){
            return res.status(422).json({error:"Password and Confirm Password should be same"});
        }
        const user = new User({name,email,phone,work,password,cpassword});
        await user.save();
        res.status(201).json({message:"User registered successfully"});
        // const userRegister = await user.save();
        // if(userRegister){
        //     res.status(201).json({message:"User registered successfully"});
        // }else{
        //     res.status(500).json({error:"Failed to register"});
        // }
    }catch(err){
        console.log(err);
    }
});

//Login route
router.post('/signin',async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please fill all data"});
        }

        const userLogin = await User.findOne({email:email});
        if(userLogin){
            const isMatch = bcrypt.compareSync(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            // console.log(userLogin);
            if(isMatch){
                res.json({message:"Signin Successfull"});
            }else{
                res.status(400).json({error:"Invalid Credentials"});
            }
        }else{
            res.status(400).json({error:"Invalid Credentials"});
        }
        
    }catch(err){
        console.log(err);
    }
});

router.get('/about',authenticate,(req,res)=>{
    console.log("About section");
    res.send(req.rootUser);
});

router.get('/getdata',authenticate,(req,res)=>{
    console.log("User Data");
    res.send(req.rootUser);
});

router.post('/contact',authenticate,async(req,res)=>{
    try{
        const {name,email,phone,message} = req.body;
        if(!name || !email || !phone || !message){
            console.log("Fill the contact form");
            return res.json({error:"Please fill all data"});
        }
        const checkUser = await User.findOne({_id:req.userId});
        if(checkUser){
            const userMessage = await checkUser.addMessage(name,email,phone,message);
            await checkUser.save();
            res.status(201).json({message:"Message sent successfully"});
        }
    }catch(err){
        console.log(err);
    }
});

router.get('/logout',authenticate,(req,res)=>{
    console.log("Logout section");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("User Logout");
});

module.exports = router;