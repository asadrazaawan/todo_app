const User = require('../../../domain/Core/user/userEntity');

class CreateUserDTO {

  constructor(userID,name, email, password, age) {
      this.userID = userID;
      this.name = name;
      this.email = email;
      this.password = password;
      this.age = age;
  }

  getUser(){
    const {userID, name, email, password, age} = this
    return User.createFromObject({userID, name, email, password, age});
  }

  static create({userID, name, email, password, age}){
    return new CreateUserDTO(userID,name, email, password, age)
  }

}

module.exports = CreateUserDTO;


