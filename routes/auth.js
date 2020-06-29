const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
const User = mongoose.model("User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {JWT_KEYS} = require('../keys')
const requirel = require('../middleware/requirelogin')

router.get("/",(req,res)=>{
   res.sendFile('index.html');
})
router.post("/signup",(req,res)=>{
    var username = req.body.user;
    var email = req.body.email;
    var password = req.body.password1;
    var passw = req.body.password2;
    if(!email || !username || !password || password!==passw){
        return res.status(422).json({error:"Please fill each Field"})
    }
    if(password!==passw){
        console.log("Please Check Your Password")
        
    }
    console.log(username,email,password,passw);
    User.findOne({email:email})
    .then((SavedUser)=>{
        if(SavedUser){
            return res.status(422).json({error:"Email Already Exist"});
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                name:username,
                email:email,
                password:hashedpassword
    
            })
            user.save()
            .then(user=>{
                res.json({message:"User Registered Successfully"})
            })
            .catch(err=>{
                console.log(err);
            })

        })
       
    })
    .catch(err=>{
        console.log(err);
    })
    
})

router.post("/profile",requirel,(req,res)=>{
 
    res.send("Hello User")
})

router.post("/signin",(req,res)=>{

    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password){
        return res.status(422).json({error:"Please fill each Field"});
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"You have given Wrong Email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(domatch=>{
            if(domatch){
                const token = jwt.sign({_id:savedUser._id},JWT_KEYS)
                res.json(token)
                //return res.json({message:"You Have Successfully Logged in "})
            }
            else{
                return res.status(422).json({error: "Invalid Password"});
            }
        }).catch(err=>{
            console.log(err);
        })
    })
   
})

module.exports = router;