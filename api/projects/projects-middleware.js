// add middlewares here related to projects
const Projects = require('../projects/projects-model')

const idValidation = (req, res, next) => {
  const { id } = req.params
  Projects.get(id)
      .then(project => {
          if (!project) {
              res.status(404).json({
                  message: `Project with id (${id}) doesn't exist`
              })
          } else {
              req.project = project
              next()
          }
      })
      .catch(next) 
}

const bodyValidation = (req, res, next) => {
  const {name, description, completed} = req.body
  if(!name || !description || !completed) {
    res.status(400).json({
      message: 'Name, description, or completed are not filled out'
    })
  } else{
    req.updated = {
      name: name.trim(),
      description: description.trim(),
      completed: completed,
    }
    next()
  }
}

module.exports = {
    bodyValidation,
    idValidation,
}