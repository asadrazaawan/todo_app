const User = require('../../../domain/Core/user/userEntity');

class GetUserDTO {
    
  constructor(userID) {
    this.userID = userID
  }

  getUserID(){
    return this.userID;
  }

}

module.exports = GetUserDTO;
