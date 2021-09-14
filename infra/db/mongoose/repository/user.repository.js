
const userEntity = require("../../../../domain/Core/user/userEntity")
const User = require("../models/user");

class UserRepository{
    
    static async add(userEntity) {

      const me = new User(userEntity)
      
      await me.save()

      return true;
    }

    static async fetchByID(userID){

        const user = await User.findById(userID)
        return userEntity.createFromObject(user);
    }

    static async update(userEntity){
      
      console.log(userEntity)
      const {updates,user,body} = userEntity;

      updates.forEach((update)=>{
        user[update] = body[update]
      })
      
      await user.save()
    }
    
    static async remove(userID) {
      await userID.remove();
    } 
}

module.exports = UserRepository


