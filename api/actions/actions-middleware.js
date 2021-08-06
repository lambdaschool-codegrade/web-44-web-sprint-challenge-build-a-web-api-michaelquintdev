const Actions = require('./actions-model')

const idValidation = (req, res, next) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({
                    message: `Action with id (${id}) doesn't exist`
                })
            } else {
                req.action = action
                next()
            }
        })
        .catch(next) 
  }



const bodyValidation = (req, res, next) => {
    const {project_id, description, completed} = req.body
    if(!project_id || !description || completed === undefined) {
      res.status(400).json({
        message: 'Name or description are not filled out'
      })
    } else { 
        next()
      }
    }

  module.exports = {idValidation, bodyValidation};