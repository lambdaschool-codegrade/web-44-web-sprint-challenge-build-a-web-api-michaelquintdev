const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()
const { idValidation, bodyValidation } = require('./projects-middleware')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', idValidation, async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
        res.status(201).json(project)
    }
    catch(error) {
        next(error)
    }
})

router.post('/', bodyValidation, async (req, res, next) => {
    try{
        const newProject = await Projects.insert(req.updated)
        res.status(200).json(newProject)
    }catch(err){
        next(err)
    }
})

module.exports = router