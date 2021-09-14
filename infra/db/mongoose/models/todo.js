const mongoose = require('mongoose')
const uuid = require('uuid');


const todoListSchema = new mongoose.Schema({
  todoID: { 
    type: String, 
    default: uuid.v4
  },
  name:{
    type: String,
    required: true,
    trim: true  
  },
  discription:{
    type: String,
    required: true,
    trim: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  }
},{
  timestamps: true
})

//Creating a Task Model
const Todo = mongoose.model('Todo',todoListSchema)

module.exports = Todo