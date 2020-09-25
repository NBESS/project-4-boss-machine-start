const express = require('express');
const meetingsRouter = express.Router();
const db = require('../db');
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require('../db');


meetingsRouter.get('/', (req, res, next) => {
    let meetings = getAllFromDatabase('meetings')
    res.send(meetings);
})

meetingsRouter.post('/', (req, res, next) => {


    let meeting = addToDatabase('meetings', createMeeting())
    res.status(201).send(meeting);

})

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings')
    res.status(204).send();

})




module.exports = meetingsRouter;