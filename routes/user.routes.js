const express = require('express');
const router = express.Router();
const UserModel = require('../models/User.model');

// middleware to check if user is loggedIn
const isLoggedIn = (req, res, next) => {  
  if (req.session.loggedInUser) {
      //calls whatever is to be executed after the isLoggedIn function is over
      next()
  }
  else {
      res.status(401).json({
          message: 'Unauthorized user',
          code: 401,
      })
  };
};

// THIS IS A PROTECTED ROUTE
// use this path for the axios: "/api/profile"
router.get("/profile", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});


// use this path for the axios: "/api/settings"
router.get('/settings', isLoggedIn, (req, res) => {

  let userId = req.session.userInfo._id

  UserModel.findById(userId)
    .then((user) => {
      res.status(200).json(user)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

// use this path for the axios: "/api/settings"
router.patch('/settings', isLoggedIn, (req, res) => {
  
  let userId = req.session.userInfo._id
   const { username, email, password, description, profilePic, country, experience, available, workLocation, skills } = req.body;

  UserModel.findByIdAndUpdate(userId, { $set: {
     username, email, password, description, profilePic, country, experience, available, workLocation, skills 
    } })
    .then((response) => {
      res.status(200).json(response)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

// use this path for the axios: "/api/settings"
router.delete('/settings', isLoggedIn, (req, res) => {

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
