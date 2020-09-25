const express = require('express')
const minionsRouter = express.Router();
const db = require('../db');
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require('../db');

minionsRouter.get('/', (req, res, next) => {
    let minions = getAllFromDatabase('minions');
    res.status(200).send(minions)
})

minionsRouter.get('/:minionId', (req, res, next) => {
    let id = Number(req.params.minionId);
    let minionElement = getFromDatabaseById('minions', String(id));

    if (!minionElement || getFromDatabaseById('minions', req.params.id) === -1) {
        res.status(404).send();
    } else {
        res.send(minionElement);
    }
})

minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedElement = updateInstanceInDatabase('minions', req.body)
    if (updatedElement) {
        res.send(updatedElement);
    } else {
        res.status(404).send()
    }
})

minionsRouter.post('/', (req, res, next) => {
    let currentMinionsArray = getAllFromDatabase('minions');
    let lastId = '';
    let newId;

    if (currentMinionsArray) {
        lastId = currentMinionsArray.length;
        newId = lastId;
        req.body.id = newId;

    }

    let newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion)

})

minionsRouter.delete('/:minionId', (req, res, next) => {
    if (deleteFromDatabasebyId('minions', req.params.minionId)) {
        res.status(204).send();
    }
    res.status(404).send();
})

module.exports = minionsRouter;
