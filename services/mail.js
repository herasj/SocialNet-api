"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()
module.exports = {
    send: async(email,pass) => {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, 
              pass: testAccount.pass
            }
          });
        
          let info = await transporter.sendMail({
            from: '"SocialNetwork" <no-reply@mail.com>', // sender address
            to: email, // Target
            subject: "No-reply", // Subject line
            text: `Tu contraseña: ${pass} \n Si no sabes por qué recibiste este mensaje verifica la seguridad de cuenta`, // plain text body
            html: "" // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    }
    
}


  
