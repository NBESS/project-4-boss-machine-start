const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const app = require('../server');
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require('./db');

apiRouter.get('/minions', (req, res, next) => {
    let minions = getAllFromDatabase('minions');
    res.status(200).send(minions)
})

apiRouter.get('/minions/:minionId', (req, res, next) => {
    let id = Number(req.params.minionId);
    let minionElement = getFromDatabaseById('minions', String(id));

    if (!minionElement || getFromDatabaseById('minions', req.params.id) === -1) {
        res.status(404).send();
    } else {
        res.send(minionElement);
    }
})

apiRouter.put('/minions/:minionId', (req, res, next) => {
    let updatedElement = updateInstanceInDatabase('minions', req.body)
    if (updatedElement) {
        res.send(updatedElement);
    } else {
        res.status(404).send()
    }
})

apiRouter.post('/minions', (req, res, next) => {
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

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    if (deleteFromDatabasebyId('minions', req.params.minionId)) {
        res.status(204).send();
    }
    res.status(404).send();
})


apiRouter.get('/ideas', (req, res, next) => {
    let ideasArray = getAllFromDatabase('ideas');
    res.status(200).send(ideasArray)
})

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    let id = Number(req.params.ideaId);
    let ideaElement = getFromDatabaseById('ideas', String(id));

    if (!ideaElement || getFromDatabaseById('ideas', req.params.id) === -1) {
        res.status(404).send();
    } else {
        res.send(ideaElement);
    }
})

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    let updatedElement = updateInstanceInDatabase('ideas', req.body)
    if (updatedElement) {
        res.send(updatedElement);
    } else {
        res.status(404).send()
    }
})

apiRouter.post('/ideas', (req, res, next) => {
    let currentideasArray = getAllFromDatabase('ideas');
    let lastId = '';
    let newId;

    if (currentideasArray) {
        lastId = currentideasArray.length;
        newId = lastId;
        req.body.id = newId;

    }

    let newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea)

})

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    if (deleteFromDatabasebyId('ideas', req.params.ideaId)) {
        res.status(204).send();
    }
    res.status(404).send();
})



module.exports = apiRouter;
