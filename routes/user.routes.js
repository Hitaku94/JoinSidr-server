const express = require('express');
const router = express.Router();
const UserModel = require('../models/User.model');
const ProjectModel = require('../models/project.model')

// use this path for the axios: "/api/project/{$:id}"
// PS again and again: ":id" is dynamic, 
router.delete('/settings', (req, res) => {

  let userId = req.session.userInfo._id

  UserModel.findByIdAndDelete(userId)
    .then((response) => {
      req.session.destroy()
      res.status(200).json(response)

    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})


module.exports = router;
