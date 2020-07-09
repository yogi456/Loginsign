const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
const User = mongoose.model("User")
const Person = mongoose.model("Person")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {JWT_KEYS} = require('../keys')
const requirel = require('../middleware/requirelogin')
const nodemailer = require('nodemailer'); 

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
          //  const token = jwt.sign({_id:savedUser._id},JWT_KEYS)

let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'kavitaprajapati132004@gmail.com', 
		pass: 'Kavita@123.'
	} 
}); 
const token = jwt.sign({_id:savedUser._id},JWT_KEYS)
var link = 'http://locolhost:3000/account/active/'
+ token;
let mailDetails = { 
	from: 'kavitaprajapati132004@gmail.com', 
	to: 'prajapatiyogesh803@gmail.com', 
	subject: 'Test mail1', 
    html:'Please click <a href="' + link + '"> here </a> to activate your account.'
}; 

mailTransporter.sendMail(mailDetails, function(err, data) { 
	if(err) { 
		console.log('Error Occurs'); 
	} else { 
		console.log('Email sent successfully'); 
	} 
}); 

router.post('resetpassword',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
    
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User Don't Exist"})

            }
            user.ResetToken = token
            userExpireToken = Date.now() + 3600000
            user.save().then((result)=>{
                let mailDetails = { 
                    from: 'kavitaprajapati132004@gmail.com', 
                    to: 'prajapatiyogesh803@gmail.com', 
                    subject: 'Test mail1', 
                    html:`
                    <p>Please activate Your Account</p>
                    <h5><a href="http://localhost:3000/activate/${token}">Click Here</a></h5>
                    `
                }; 
                
                
                mailTransporter.sendMail(mailDetails, function(err, data) { 
                    if(err) { 
                        console.log('Error Occurs'); 
                    } else { 
                        console.log('Email sent successfully'); 
                    } 
                }); 
            })
        })
    
    })
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
router.get("/contactus",(req,res)=>{
    res.sendFile('contact.html');
 })

 router.post("/submitmessage",function(req,res){
     var fname = req.body.firstname;
     var lname = req.body.lastname;
     var email = req.body.email;
     var mobile = req.body.mobile;
     var message = req.body.message;
     const person = new Person({
        fname,
        lname,
        email,
        phone:mobile,
        message

    }).save();
    //person.save();

     console.log(fname,lname,email,mobile,message);
     res.send("Message is sent")
 })

module.exports = router;