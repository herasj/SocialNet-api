"use strict";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config()
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // ClientID
  process.env.SECRET_ID, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN_GMAIL
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: process.env.EMAIL_USER, 
       clientId: process.env.CLIENT_ID,
       clientSecret: process.env.SECRET_ID,
       refreshToken: process.env.REFRESH_TOKEN_GMAIL,
       accessToken: accessToken
  }
});

module.exports = {
    send: async(email,pass) => {        
          const mailOptions = {
              from: "no-reply@noreply.com",
              to: email,
              subject: "Social Network Recuperar Contraseña",
              generateTextFromHTML: true,
              html: `<h1> Recuperación de contraseña</h1> <br> Contraseña: <b>${pass}</b>`
          };
          await smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log(response);
            smtpTransport.close();
          });
        
    }
    
}


  
