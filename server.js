const nodemailer = require('nodemailer'); 


let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'kavitaprajapati132004@gmail.com', 
		pass: 'Kavita@123.'
	} 
}); 

let mailDetails = { 
	from: 'kavitaprajapati132004@gmail.com', 
	to: 'prajapatiyogesh803@gmail.com', 
	subject: 'Test mail1', 
    html: `
    <a href="www.google.com">CLick here</a>
    `
}; 

mailTransporter.sendMail(mailDetails, function(err, data) { 
	if(err) { 
		console.log('Error Occurs'); 
	} else { 
		console.log('Email sent successfully'); 
	} 
}); 
