const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken')
const {JWT_KEYS} = require('./keys')
const crypto = require('crypto')

let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'Your-email@gmail.com', 
		pass: 'password.'
	} 
}); 

const token = jwt.sign({_id:"dashdjh"},JWT_KEYS)
var link = 'http://locolhost:3000/account/active/'
+ token;
let mailDetails = { 
	from: 'your-email-address', 
	to: 'prajapatiyogesh803@gmail.com', 
	subject: 'Test mail1', 
    html: 'Please click <a href="' + link + '"> here </a> to activate your account.'
}; 

mailTransporter.sendMail(mailDetails, function(err, data) { 
	if(err) { 
		console.log('Error Occurs'); 
	} else { 
		console.log('Email sent successfully'); 
	} 
}); 
