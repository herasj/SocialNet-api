# SocialNet

## Check List

 - [x] SQL Server Connection
 - [x] Login and Register
 - [x] JWT
 - [ ] AWS S3 Connnection
 .
 .
 .
 
## Routes

 ## Auth

### **Login**
*Send email and password through body*
### **Route:**
> POST /auth/login

### **Response**
Refresh and Access Tokens

   <br>

### **Register**
*Send the following parameters through body*

    {
	"name":"test",
	"last":"test2",
	"phone":"3013010018",
	"birth":"01-01-2001",
	"email":"email@email.com",
	"pass":"123123123123"
}

### **Route:**
> POST /auth/register

### **Response**
Refresh and Access Tokens

   <br>

### **Logout**
*Delete the user token from db
Send Refresh Token through body*

### **Route:**
> DEL /auth/logout

### **Response**
HTTP 204 Status

   <br>
   
### **Verify Access Token**
*Send request to verify the access token*
*Header: Content-Type: Authorization, Data: Bearer* **Access Token**

### **Route:**
> GET /auth/verify

### **Response**
HTTP 204 Status

   <br>

### **Get Access Token**
*Send Refresh Token through body to obtain a new Access_Token*

### **Route:**
> POST /auth/token

### **Response**
New Access Token
