## mern stack

to check how to setup localy or push to heroku check README-SETUP

to view site click https://mern-stack-shop-project.herokuapp.com/

Web app using the MERN stack 

- MongoDB - atlas
- Express
- React
- Node.js

additional libraries: 
```
- cors
- bcryptjs
- dotenv
- jsonwebtoken
- moongoose
- axios
- react bootstrap
- react-credit-cards
- card-validator
- redux
- react-redux
- react-spinners
- underscore --
```
#/ Use Insomnia to check routes
#/ for more routes check in routes folder
```
/users
- "/login" requires { email, password }
- "/register" requires { email, password, passwordCheck }
- "/delete" yourself
```
```
/shop
- "/all" get - all shop items
- "/add" post - add new item to shop; requires { name, category, use, available, count, price, (uid and _id - added automaticly)}
- "/:id" get - item
```
```
/cart
- "/all" get - all cart items
- "/updatecart" post - updates selected item
- "/add" post - add new item to shop; requires { name, category, available, use, count, price, (owner, uid and _id - added automaticly)}
- "/:id" delete - item
- "/deleteall" delete - deletes all
```

## frontend build with React - inside FRONTEND map

ps. some code like useContext/provider is just an example of how it can be used...
