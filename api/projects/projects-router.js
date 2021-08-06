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
        const newProject = await Projects.insert(req.updated)
        res.status(200).json(newProject)
    }catch(err){
        next(err)
    }
})

// router.put('/:id', idValidation, bodyValidation, async (req, res, next) => {
//     const {id} = req.params
//     try{
//         const newProject = await Projects.update(id, req.updated)
//         res.status(200).json(newProject)
//     } catch (err) {
//         next(err)
//     }
// })

module.exports = router