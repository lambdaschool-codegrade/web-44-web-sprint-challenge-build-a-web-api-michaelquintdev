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

router.get('/:id', idValidation, async (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', bodyValidation, async (req, res, next) => {
    try{
        const newProject = await Projects.insert(req.body)
        res.status(201).json(newProject)
    }catch(err){
        next(err)
    }
})

router.put('/:id', idValidation, bodyValidation, async (req, res, next) => {
    const {id} = req.params
    try{
        const newProject = await Projects.update(id, req.body)
        res.status(200).json(newProject)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', idValidation, async (req, res, next) => {
    const {id} = req.params
    try{
        const projectToRemove = await Projects.remove(id)
        res.status(200).json(projectToRemove)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', idValidation, async (req, res, next) => {
    const {id} = req.params
    try {
        const actions = await Projects.getProjectActions(id)
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

module.exports = router