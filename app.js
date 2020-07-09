var express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
require('./model/user');
require('./model/person')

app.use(express.static('public'));
app.set("view engine","ejs");
app.use(require('./routes/auth'))
mongoose
  .connect(
    'mongodb+srv://yogi345:vUPN7zyXQlT4TosK@cluster0-lfgu7.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useNewUrlParser: true,  useUnifiedTopology: true}
  )
  .then(() => {
    app.listen(3000,function(req,res){
        console.log("server is started")
    });
  })
  const Customemiddleware =(req,res,next)=>{
    console.log("Middleware")
   
  }
  app.use(bodyparser.urlencoded({extended:true}));
 
 
 
  

  app.get("/profile",Customemiddleware,function(req,res){
    res.send("User Profile")
  })

  app.get("/contact",function(req,res){
    res.render('contactform')
  })

 