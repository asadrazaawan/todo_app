class User {

    constructor(userID,name,email,password,age,createdAt,updatedAt){
        this.userID = userID
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createFromObject(userObj){
        return new User(
            userObj.userID,
            userObj.name,
            userObj.email,
            userObj.password,
            userObj.age, 
            userObj.createdAt,
            userObj.updatedAt
        )
    }
    
}

module.exports = User;




    

