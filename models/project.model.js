const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const projectSchema = new Schema({
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
    like: Number,
    superlike: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref:"User"
    },
  
});

const Project = model("Project", projectSchema);

module.exports = Project;
