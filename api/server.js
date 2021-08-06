const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/projects', projectsRouter)

server.use('*', (req, res) => {
    res.status(404).send(`
      <h2>Can't find that</h2>
    `);
  })
  
  server.use((err, req, res, next) => { // eslint-disable-line
    console.log('Nasty error', err.message)
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  });

module.exports = server;
