const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')
const { idValidation, bodyValidation } = require('./actions-middleware')

router.get('/', async (req, res, next) => {
    try{
        const actionsArray = await Actions.get()
        res.status(200).json(actionsArray)
    } catch(err){
        next(err)
    }
})

router.get('/:id', idValidation, async (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', bodyValidation, async (req, res, next) => {
    try{
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    }catch(err){
        next(err)
    }
})

router.put('/:id', idValidation, bodyValidation, async (req, res, next) => {
    const {id} = req.params
    try{
        const newAction = await Actions.update(id, req.body)
        res.status(200).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', idValidation, async (req, res, next) => {
    const {id} = req.params
    try{
        const actionToRemove = await Actions.remove(id)
        res.status(200).json(actionToRemove)
    } catch(err) {
        next(err)
    }
})

module.exports = router;