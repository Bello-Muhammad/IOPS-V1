const express = require('express');
const { authUserLogin, authUserLogOut } = require('./authController');
const { isAuth } = require('../middleware/auth');

const authRouter = express.Router();

authRouter.post('/login', authUserLogin);
authRouter.get('/logOut', isAuth, authUserLogOut);

module.exports = authRouter;