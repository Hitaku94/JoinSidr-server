const express = require('express');
const router = express.Router();
const JobModel = require('../models/job.model')

// use this path for the axios: "/api/trends"
router.get('/jobList', (req, res) => {
  JobModel.find()
    .populate("user")
    .then((jobs) => {
      res.status(200).json(jobs)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

// use this path for the axios: "/api/project/{$:id}"
//PS: ":id" is dynamic, 
router.get('/job/:id', (req, res) => {
  JobModel.findById(req.params.id)
    .populate("user")
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
router.post('/job-create', (req, res) => {
  const { title, type, description, image, date, languages, location } = req.body
  const user = req.session.loggedInUser
  JobModel.create({ title, type, description, image, user, date, languages, location })
    .then((job) => {
      JobModel.findById(job._id)
      .populate("user")
      .then((response) => {
        res.status(200).json(response)
      })
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

// use this path for the axios: "/api/project/{$:id}"
// PS again: ":id" is dynamic, 
router.patch('/job/:id', (req, res) => {
  let id = req.params.id
  const { title, type, description, image, languages, location } = req.body;
  JobModel.findByIdAndUpdate(id, { $set: { title, type, description, image, languages, location } }, {new: true})
    .populate("user")
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
router.delete('/job/:id', (req, res) => {
  JobModel.findByIdAndDelete(req.params.id)
    .populate("user")
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