
const userEntity = require("../../../../domain/Core/user/userEntity")
const User = require("../models/user");

class UserRepository{
    
    static async add(userEntity) {

      const me = new User(userEntity)
      console.log(me)
      await me.save()

      return true;
    }

    static async fetchByID(userID){

      const user = await User.findById(userID)
      return userEntity.createFromObject(user);
    }

    static async update(userEntity){
      const userID = userEntity.userID;
      if (userID.match(/^[0-9a-fA-F]{24}$/)) {
        const updateUser = await User.findOneAndUpdate(userEntity.userID,userEntity,{new: true})  
        console.log(updateUser)  
        await updateUser.save();
      }
      else{
        return {message: "Invalid ID!"}
      }
    }
    
    static async remove(userID) {
      await userID.remove();
    } 
}

module.exports = UserRepository


