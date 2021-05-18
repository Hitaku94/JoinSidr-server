const router = require("express").Router();
const UserModel = require('../models/User.model')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
// GET all users names to show on the home page
router.get("/users", (req, res, next) => {
  UserModel.find()
    .then((response) => {
      res.status(200).json( response)
    })
    .catch((err) => {
        res.status(500).json({
          error: 'Something went wrong',
          message: err
        })
      next(err)
    })
});

module.exports = router;
