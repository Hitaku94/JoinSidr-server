const { Schema, model } = require("mongoose");
require("../models/User.model")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const jobSchema = new Schema({
    title: {
      type: String,
      required: true
      },
    type: {
      type: String,
      required: true
      },
    description: {
      type: String,
      required: true
    },
    date: Date,
    image: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
    languages: [{
      type: String
    }],
    location: {
      type: String
    },
  
});

const Job = model("Job", jobSchema);

module.exports = Job;
