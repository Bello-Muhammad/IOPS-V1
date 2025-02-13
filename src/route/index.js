const express = require('express');
const PatientRouter = require('../patients/patient.Routers');
const LocationRouter = require('../location/location.Routers');
const adminRouter = require('../users/userRouters');
const authRouter = require('../auth/authRouter');
const { isAuth } = require('../middleware/auth');

const appRouter = express.Router();

appRouter.use('/auth', authRouter);
appRouter.use('/admin', adminRouter);
appRouter.use('/locations', isAuth, LocationRouter);
appRouter.use('/patients', isAuth, PatientRouter);

module.exports = appRouter;