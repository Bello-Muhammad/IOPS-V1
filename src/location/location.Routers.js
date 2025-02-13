const express = require('express');
const { addState, getAllStates, getOneState, editState, deleteOneState } = require('./controllers/state.Controllers');
const { addLocalGoventment, getAllLocalGovernment, getOneLocalGovernment, editLocalGovernment, deleteoneLocalGovernment } = require('./controllers/localGovernment.Controller');

const LocationRouter = express.Router();

//>>>state Router
LocationRouter.post('/state', addState);
LocationRouter.get('/states', getAllStates);
LocationRouter.get('/state/:stateId', getOneState);
LocationRouter.patch('/state/:stateId', editState);
LocationRouter.delete('/state/:stateId', deleteOneState);
//>>end state router

//>>>local government
LocationRouter.post('/state/lg', addLocalGoventment);
LocationRouter.get('/state/:stateId/all-lg', getAllLocalGovernment);
LocationRouter.get('/state/lg/:lgId', getOneLocalGovernment);
LocationRouter.patch('/state/lg/:lgId', editLocalGovernment);
LocationRouter.delete('/state/lg/:lgId', deleteoneLocalGovernment);
//>>>end local government route

module.exports = LocationRouter;