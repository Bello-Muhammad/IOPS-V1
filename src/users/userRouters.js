const express = require('express');
const { registerAdmin, allAdmin, updateAdmin, getAdmin, getAdminDashBoard } = require('./userControllers/adminController');
const { registerUser, getAllUsers, getOneUser, updateUser, removeUser, changePassword, postUser } = require('./userControllers/userController');
const { authPage, isAuth } = require('../middleware/auth');

const adminRouter = express.Router();

//>>>admin routes start
adminRouter.post('/create/account', registerAdmin);
adminRouter.get('/dashboard', isAuth, authPage(['admin', 'supervisor']), getAdminDashBoard);
adminRouter.get('/', allAdmin);
adminRouter.get('/:adminId', getAdmin);
adminRouter.patch('/:adminId', updateAdmin);
//>>>admin routes end

adminRouter.post('/user/change-password/:userId', isAuth, changePassword)

//>>>staff routes start
adminRouter.post('/staff/create-account', registerUser);
adminRouter.get('/all/staffs', isAuth, authPage(['admin', 'supervisor']), getAllUsers);
adminRouter.get('/staff/:userId', isAuth, getOneUser);
adminRouter.post('/staff/post/:userId', isAuth, authPage(['admin', 'supervisor']), postUser);
adminRouter.patch('/staff/update/:userId', isAuth, updateUser)
adminRouter.delete('/staff/remove/:userId', isAuth, removeUser)

module.exports = adminRouter;