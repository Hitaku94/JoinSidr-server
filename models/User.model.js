const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userType: {type: String, enum:["Recruiter", "Workfluencer"]},
    description: String,
    profilePic: {type: String, default: "../public/images/profileIcon.png",},
    country: String,
    experience: {type: String, enum:["student", "Junior 0-2 years of experience", "Senior 2+ years" ]},
    available: Boolean,
    workLocation: {type:String, enum:["office", "remote"]},
    skills:[ {type:String, enum:["HTML", "CSS", "JavaScript", "React", "Angular", "other"]}],
    followers: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],

  
});

const User = model("User", userSchema);

module.exports = User;
