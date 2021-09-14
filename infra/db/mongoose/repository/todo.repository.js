const todoEntity = require("../../../../domain/Core/todo/todoEntity");
const todos = require("../models/todo");
const PaginationData = require("../../../../domain/utils/paginationData")

class TodoRepository{
    
    static async add(todoEntity) {
        const todo = new todos(todoEntity);
        todo.save();
        return todo;
    }

    static async fetchByID(todoID) {
      const {_id,owner} = todoID;
      const todo = await todos.findOne({ _id , 'owner': owner});      
      return todoEntity.createFromObject(todo);
    }

    /**
     * 
     * @param {PaginationOptions} pagOpts 
     * @returns 
     */
    
    static async fetchAll(pagOpts){
        const todo = await  todos.aggregate([
          { "$facet": {
            "totalData": [
              { "$match": { }},
              { "$skip": pagOpts.skip },
              { "$limit": pagOpts.limit }
            ],
            "totalCount": [
              { "$count": "count" }
            ]
          }}
        ]);
        
        const rows = todo[0].totalData;
        const count = todo[0].totalCount[0].count;

        const paginationData = new PaginationData(pagOpts, count);

        rows.forEach((row) => {
          paginationData.addItem(todoEntity.createFromObject(row));
        });
  
        
        return paginationData;
    }


    static async update(todoEntity){

      const {updates,id,owner,body} = todoEntity;
      const todoUp = await todos.findOne({_id:id, owner})  
      updates.forEach( update => todoUp[update] = body[update] )
      const updateTodo = await todoUp.save();
      return updateTodo;
    }
    
    static async remove(todoID) {
      const {_id,owner} = todoID;
      const delTodo = await todos.findOneAndDelete({ _id, owner })
      return delTodo;
    } 
      
}

module.exports = TodoRepository

