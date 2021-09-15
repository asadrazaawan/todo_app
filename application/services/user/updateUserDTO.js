
class UpdateUserDTO {
    
    constructor(userID, name, email, password, age) {
        this.userID = userID,
        this.name = name,
        this.email = email,
        this.password = password,
        this.age = age
    }

    static create({userID,name, email, password, age}) {
        return new UpdateUserDTO(userID, name, email, password, age)
    }

}

module.exports = UpdateUserDTO