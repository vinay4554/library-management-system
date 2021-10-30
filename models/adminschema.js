const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");
const Joi = require('joi');
const adminSchema = new mongoose.Schema({
  firstName: Joi.string()
  .required()
  .error(() => {
    return {
      message: 'Firstname name is required.',
    };
  }),
  lastName: {
    type: String,
    trim: true,
    required:true,
  },
  username: {
    type: String,
    trim: true,
    required:[true, 'User name required'],
    unique:true,
  },
  email: {
    type: String,
    trim: true,
    unique:true,
    required:true,
  },
  password: String,
  joined: { type: Date, default: Date.now() },
  bookIssueInfo: [
    {
      book_info: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Issue",
        },
      },
    },
  ],
  gender: String,
  post:String,
  mobile:Number,
  address: {
    type: String,
    required:true,
  },
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);
