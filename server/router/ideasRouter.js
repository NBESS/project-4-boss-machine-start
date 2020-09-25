const express = require('express');
const ideasRouter = express.Router();
const db = require('../db');
const checkMillionDollarIdea = require('../checkMillionDollarIdea')
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require('../db');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);

    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send()
    }
})

ideasRouter.get('/', (req, res, next) => {
    let ideasArray = getAllFromDatabase('ideas');
    res.status(200).send(ideasArray)
})

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let updatedElement = updateInstanceInDatabase('ideas', req.body)
    res.send(updatedElement);
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
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

ideasRouter.delete('/:id', (req, res, next) => {
    let deletedIdea = deleteFromDatabasebyId('ideas', req.params.id)
    if (deletedIdea) {
        res.status(204);
    } else {

        res.status(500)
    }
    res.send();
})




module.exports = ideasRouter;