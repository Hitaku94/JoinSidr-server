const express = require('express');
const bcrypt = require('bcryptjs');
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


// use this path for the axios: "/api/user/{$:id}"
//PS: ":id" is dynamic, 
router.get('/user/:id', (req, res) => {
  UserModel.findById(req.params.id)
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
router.get('/settings', isLoggedIn, (req, res) => {

  let userId = req.session.loggedInUser._id

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
  
  let userId = req.session.loggedInUser._id
   const { username, description, profilePic, country, experience, available, workLocation, skills } = req.body;
  console.log(req.body)
  UserModel.findByIdAndUpdate(userId, {$set: {
    username, description, country, experience, available, workLocation, skills, profilePic   
    }}, {new: true})
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



// use this path for the axios: "/api/settings"
router.delete('/settings', isLoggedIn, (req, res) => {

  let userId = req.session.loggedInUser._id

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

// use this path for the axios: "/api/security"
router.get('/security', isLoggedIn, (req, res) => {

  let userId = req.session.loggedInUser._id

  UserModel.findById(userId)
    .then((user) => {
      res.status(200).json(user)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
});

// use this path for the axios: "/api/type"
router.patch('/type', isLoggedIn, (req, res) => {
  
  let userId = req.session.loggedInUser._id

   const { userType } = req.body;
  console.log(req.body)
  UserModel.findByIdAndUpdate(userId, {$set: {userType}}, {new: true})
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

router.patch('/security', isLoggedIn, (req, res) => {
  let { newuser, newemail, newpassword, country } = req.body
  if(newuser =='') {
    newuser = req.session.loggedInUser.username
  }

  if(newemail == ''){
     newemail = req.session.loggedInUser.email
  }

  if(newpassword == ''){
    newpassword = req.session.loggedInUser.password
  }
  else{
    const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    if (!passRe.test(newpassword)) {
      console.log('Password needs to have 8 characters, a number and an Uppercase alphabet')
      //display an error message
      return;
    }
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(newpassword, salt);
    newpassword = hash
  }
 
  UserModel.findByIdAndUpdate(userId,{
    username: newuser, password: newpassword, country  
    }, {new: true})
    .then((response) => {
      req.session.loggedInUser = response
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})



// use this path for the axios: "/api/follow"
router.patch('/follow', isLoggedIn, (req, res) => {
  
  let userId = req.session.loggedInUser._id

  const { follow } = req.body;
  console.log(follow)
  UserModel.findByIdAndUpdate(userId, {$push: {follow: follow}}, {new: true})
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
      

// use this path for the axios: "/api/unfollow"
router.patch('/unfollow', isLoggedIn, (req, res) => {
  
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
})


module.exports = router;
