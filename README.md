# Voosh Assignment (NodeJS Assignment)

## Tech Stacks used:
### Backend- NodeJS & ExpressJS, MongoDB
### Frontend- ReactJS

## Hosted link for the frontend:
https://voosh-assignment-viwin.vercel.app/

## Hosted link for the backend:
https://voosh-assignment-backend-tynu.onrender.com

# Routes 
## Sample Route for sign up user:
https://voosh-assignment-backend-tynu.onrender.com/user/add-user

### Sample input:
{   "name":"viw",
    "phoneNumber":"5565758569",
    "password":"Wewin"
}
### Sample output:
![alt text](image.png)

## Sample Route for login user:
https://voosh-assignment-backend-tynu.onrender.com/user/login-user

### Sample input:
{  "phoneNumber":"5565758569",
    "password":"Wewin"
}

### Sample output:
![alt text](image-1.png)

## Sample Route to add order
https://voosh-assignment-backend-tynu.onrender.com/order/add-order

### Sample input:
{  "userId":"viw",
   "subTotal":100,
   "phoneNumber":"1234567890"
}

### Sample output:
![alt text](image-3.png)

## Sample Route to get orders:

https://voosh-assignment-backend-tynu.onrender.com/order/get-order?userId=viw

### Sample output:
![alt text](image-4.png)

## Sample Route for logout user:
https://voosh-assignment-backend-tynu.onrender.com/user/logout

### Sample output:
![alt text](image-2.png)
# Getting started:

## Clone the application: 
git clone https://github.com/viwinkumarpadala/voosh_assignment.git

## Change the directory:
cd voosh_assignment
## Open terminal Change directory to the frontend:
cd frontend
## Install dependencies
npm install
## Start the server
npm start

## Open a new terminal and change directory to backend:
cd backend
## Install dependencies
npm install
## Start the server
nodemon index.js


## Dot env file:
 DB_URL=

 PORT=


## With this the application is ready with all the requirements


# THANK YOU
