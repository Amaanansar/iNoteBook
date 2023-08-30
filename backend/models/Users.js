const mongoose = require('mongoose')
const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        require:true
    },
    date: {
        type:Date,
        default:Date.now,
    },
  });

  const User = mongoose.model('user',UsersSchema)
  User.createIndexes()
  module.exports = User