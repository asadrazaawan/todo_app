
const userEntity = require("../../../../domain/Core/user/userEntity")
const User = require("../models/user");
const generateAuthToken = require("../../../utils/jwt")


class UserRepository{
    
    static async add(userEntity) {

      const me = new User(userEntity)
      await me.save()
      return me;
    }

    /**
     * 
     * @param {UserID} id 
     * @returns 
     */

    static async fetchByID(id){

        const userID= await User.findById(id)
        return userEntity.createFromObject(userID);

    }

    static async update(userBody){
      
      const {updates,user,body} = userBody;

      updates.forEach((update)=>{
        user[update] = body[update]
      })
      
      await user.save()
    }
    
    static async remove(user) {
      await user.remove();
    } 

      
}

module.exports = UserRepository


