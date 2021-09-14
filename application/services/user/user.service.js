const User = require("../../../infra/db/mongoose/models/user")
const UserRepository = require("../../../infra/db/mongoose/repository/user.repository")
const httpStatus = require("http-status")
const ApiError = require("../../../http/utils/ApiError");
const UserEntity = require("../../../domain/Core/user/userEntity")

class UserService{
    
    static async createUser(createUserDTO){

        if (await User.isEmailTaken(createUserDTO.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }
        
        const userInput = createUserDTO.getUser();
        const createUser = await UserRepository.add(userInput);

        if(!createUser){
            throw new ApiError(httpStatus.BAD_REQUEST,"Employee Creation Failed!")
        }
        
        return {message: "User created Successfully!"};
    }

    static async getFindUser(findUserDTO){

        const userID = await UserRepository.fetchByID(findUserDTO.getUserID());
        if(!userID){
            throw new ApiError(httpStatus.NOT_FOUND,"No User Found against this ID")
        }
        return userID
    }

    static async updateUser(createUserDTO){
        

        const updates = Object.keys(createUserDTO);
        const propertiesUsers = ['name','email','password','age']
        const isValid = updates.every( update => propertiesUsers.includes(update))

        if(!isValid)
            throw new ApiError(httpStatus.BAD_REQUEST, "Inputs are Invalid!!!")

        const userEntity = UserEntity.createFromObject(createUserDTO);

        console.log(userEntity)

        console.log("=---=")
        await UserRepository.update(userEntity);
        
        const response = {
            message: "User Updated Successfully!!!"
        }

        return response;

    }

    static async deleteUser(deleteUserDTO){

        await UserRepository.remove(deleteUserDTO.getUserID());

        const response = {
            message: "User Deleted Successfully!!!"
        }
        
        return response;
    }

}

module.exports = UserService