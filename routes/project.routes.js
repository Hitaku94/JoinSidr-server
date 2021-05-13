const express = require('express');
const router = express.Router();
const ProjectModel = require('../models/project.model')

// use this path for the axios: "/api/trends"
router.get('/trends', (req, res) => {
  ProjectModel.find()
    .populate(user)
    .then((trends) => {
      res.status(200).json(trends)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

// use this path for the axios: "/api/project/{$:id}"
//PS: ":id" is dynamic, 
router.get('/project/:id', (req, res) => {
  ProjectModel.findById(req.params.id)
    .populate(user)
    .then((response) => {
      res.status(200).json(response)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

// use this path for the axios: "/api/project-create"
router.post('/project-create', (req, res) => {
  const { title, type, description, image, user } = req.body
  ProjectModel.create({ title, type, description, image, user })
    .then((response) => {
      res.status(200).json(response)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

// use this path for the axios: "/api/project/{$:id}"
// PS again: ":id" is dynamic, 
router.patch('/project/:id', (req, res) => {
  let id = req.params.id
  const { title, type, description, image } = req.body;
  ProjectModel.findByIdAndUpdate(id, { $set: { title, type, description, image } })
    .populate(user)
    .then((response) => {
      res.status(200).json(response)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

// use this path for the axios: "/api/project/{$:id}"
// PS again and again: ":id" is dynamic, 
router.delete('/project/:id', (req, res) => {
  ProjectModel.findByIdAndDelete(req.params.id)
    .populate(user)
    .then((response) => {
      res.status(200).json(response)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

module.exports = router;