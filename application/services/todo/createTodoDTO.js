const Todo = require('../../../domain/Core/todo/todoEntity');

class CreateTodoDTO {

  constructor(todoID,name,discription,owner, createdAt, updatedAt) {
      this.todoID = todoID;
      this.name = name;
      this.discription = discription;
      this.owner = owner;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
  }

  getTodo(){
    const {todoID, name, discription, owner, createdAt, updatedAt} = this
    return Todo.createFromObject({todoID, name, discription, owner, createdAt, updatedAt});
  }

  static create({todoID, name, discription, owner, createdAt, updatedAt}){
    return new CreateTodoDTO(todoID,name, discription, owner, createdAt, updatedAt)
  }

}

module.exports = CreateTodoDTO;


