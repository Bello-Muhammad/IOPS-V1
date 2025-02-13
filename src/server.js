const express = require('express');
const appRouter = require('./route');
const { createRoles } = require('./users/usersModel/role.Model');
const session = require('express-session');
const connectDB = require('./config/dbConfig');
require('./config/dbConfig')

const app = express();

//port declaration
const port = process.env.PORT || 3000;

//initialize express session for authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true,
}));

//initializing express middleware
app.use(express.json());

//routers intialization
app.use('/api/v1', appRouter);

//setup route for none existing route
app.get ('/', (req, res) => {
    res.redirect('/api/v1/auth/login')
})

//creating all roles at initialization
createRoles();

//server start and listen on available port
app.listen(port, () => {
    connectDB(process.env.MONGO_URL);
    console.log(`Server is listening on port ${port}...`)}
);