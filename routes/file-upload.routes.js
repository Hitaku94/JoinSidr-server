const express = require('express');
const router  = express.Router();

// include CLOUDINARY:
const uploader = require('../middlewares/cloudinary.config.js');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
     
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.status(200).json({
      image: req.file.path
    })
})

module.exports = router;