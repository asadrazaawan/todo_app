const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const todos = require('./todo')
const uuid = require('uuid');


const userSchema = mongoose.Schema({
  userID: { 
    type: String, 
    default: uuid.v4
  },
  name:{
    type: String
  },
  email:{
    type: String,
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value)){
          throw new Error('Email is invalid')
      }
    }    
  },
  password:{
      type: String,
      required: true,
      trim: true,
      validate(value){
          if(value.length<6){
          throw new Error('Error, Password is less than 6!')
          }
          else if(validator.contains(value,'password')){
          throw new Error('Error, Inavlid String!')    
          }
      }  
  },
  age:{
    type: Number,
    default: 0
  },
  tokens:[{
     token:{
       type: String,
       required: true
     }
  }]
},{
  timestamps: true
}) 

userSchema.virtual('todos',{
  ref: 'Todo',
  localField: '_id',
  foreignField: 'owner'
})

// private user data
// toJSON give us data into string so we can maniuplate it
userSchema.methods.toJSON = function(){
  const user = this
  const userObject = user.toObject()
  
  delete userObject.password
  delete userObject.tokens

  return userObject
}

// user login authentication

userSchema.statics.findByCredentials = async (email,password)=>{
  const user = await Users.findOne({email})

  if(!user){
    throw new Error("Unable to Log In")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    throw new Error("Unable to Log In")
  }

  return user
}

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// hashing the plain password
userSchema.pre('save', async function(next){

  const user = this

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password,11)
  }
  
  next()
})

// Cascade Delete user and his tasks

userSchema.pre('remove', async function(next){
  const user = this

  await todos.deleteMany({ owner: user._id})

  next()
}) 


// Creating a User Model
const Users = mongoose.model('Users',userSchema)

module.exports = Users