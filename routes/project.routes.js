const express = require('express');
const router = express.Router();
const ProjectModel = require('../models/project.model')

// use this path for the axios: "/api/trends"
router.get('/trends', (req, res) => {
  ProjectModel.find()
    .populate("user")
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
router.post('/project-create', (req, res) => {
  const { title, type, description, image, urlProject, urlGit, date, languages } = req.body
  const user = req.session.loggedInUser
  ProjectModel.create({ title, type, description, image, user, urlProject, urlGit, date, languages })
    .then((project) => {
      ProjectModel.findById(project._id)
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
router.patch('/project/:id', (req, res) => {
  let id = req.params.id
  const { title, type, description, image, urlProject, urlGit, languages } = req.body;
  ProjectModel.findByIdAndUpdate(id, { $set: { title, type, description, image, urlProject, urlGit, languages } }, {new: true})
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
router.delete('/project/:id', (req, res) => {
  ProjectModel.findByIdAndDelete(req.params.id)
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

/*// use this path for the axios: "/api/like"
router.patch('/like', isLoggedIn, (req, res) => {
  
  let userId = req.session.loggedInUser._id

  const { follow } = req.body;
  console.log(follow)
  UserModel.findById(userId)
    .then((response) => {
      req.session.loggedInUser = response
      res.status(200).json(response)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})
      

// use this path for the axios: "/api/unlike"
router.patch('/unlike', isLoggedIn, (req, res) => {
  
  let userId = req.session.loggedInUser._id

  const { unfollow } = req.body;
  console.log(unfollow)
  UserModel.findByIdAndUpdate(userId, {$pull: {follow: unfollow}}, {new: true})
    .then((response) => {
      console.log(response)
      req.session.loggedInUser = response
      res.status(200).json(response)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})*/



module.exports = router;