# Welcome to Grocery Store Backend API!

The grocery store backend api lets you create prototype of an e-commerce application. It has following functionality.

- Register the user using signup, and can login and logout. This api uses JWT and cookies for authentication
- Add products to the inventory and update it
- User can product to cart and can place the order
  
Before installing below are some points that has to be notes;
- User can be created using sign up route
- User has been categorized into 'admin' and 'customer'
- For simplicity, the **1st signed** up user will be the 'admin'
- 'admin' has below privileges
		- Only admin can create product and update it
		- Only admin can fetch all customers
		- Only admin can fetch customer order lists
		- Only admin can fetch customer with highest order
- It works fine on your localhost but if you want to deloy it, then you have to take care of some security aspects and cors


## Steps to install locally
Before installing npm modules and run the project, create '.env' file into the project with following entries:

- MONGODB_URL=your mongo db server url
- JWT_SECRET=add value
- JWT_ALGORITHM=add value
- JWT_LIFE=add value
- PORT=add value

Althought fallback has been provided for JWT_SECRET, JWT_ALGORITHM, JWT_LIFE, PORT, it is advisable to add your own values

Now add following commands to the project:

 - npm install && npm install nodemon -D && npm start

Voila! Server will start running on port 5000 (default)
