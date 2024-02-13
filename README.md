# Voosh Assignment (NodeJS Assignment)

## Tech Stacks used:
### Backend- NodeJS, MongoDB
### Frontend- ReactJS

## Hosted link for the frontend:
https://voosh-assignment-viwin.vercel.app/

## Hosted link for the backend:
https://voosh-assignment-backend-tynu.onrender.com

# Routes 
## Sample Route for sign up user:
https://voosh-assignment-backend-tynu.onrender.com/user/add-user

### sample input:
{   "name":"viw",
    "phoneNumber":"5565758569",
    "password":"Wewin"
}
### sample output:
![alt text](image.png)

## Sample Route for login user:
https://voosh-assignment-backend-tynu.onrender.com/user/login-user

### sample input:
{  
    "phoneNumber":"5565758569",
    "password":"Wewin"
}

### sample output:
![alt text](image-1.png)

## Sample Route for logout user:
https://voosh-assignment-backend-tynu.onrender.com/user/logout

### sample output:
![alt text](image-2.png)
https://voosh-assignment-backend-tynu.onrender.com

## sample Route to add order
https://voosh-assignment-backend-tynu.onrender.com/order/add-order

### sample input:
{  
   "userId":"viw",
   "subTotal":100,
   "phoneNumber":"1234567890"
}

### sample output:
![alt text](image-3.png)

## sample Route to get orders:

https://voosh-assignment-backend-tynu.onrender.com/order/get-order?userId=viw

### sample output:
![alt text](image-4.png)

# Getting started:

### Clone the application: 
git clone https://github.com/viwinkumarpadala/voosh_assignment.git

## open terminal Change directory to the frontend:
cd frontend
## install dependencies
npm install
## start the server
npm start

## open a new terminal and change directory to backend:
cd backend
## install dependencies
npm install
## start the server
nodemon index.js


## dot env file:
### DB_URL=mongodb+srv://viwin:viwin@cluster0.cx8tefq.mongodb.net/?retryWrites=true&w=majority
### PORT=5000

## Note:
### If you want to use this locally change the urls to your local urls first and then use it.

## With this the application is ready with all the requirements


# THANK YOU