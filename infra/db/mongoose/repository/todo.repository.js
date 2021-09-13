const todoEntity = require("../../../../domain/Core/todo/todoEntity");
const todos = require("../models/todo");
const PaginationData = require("../../../../domain/utils/paginationData")

class TodoRepository{
    
    static async add(todoBody) {
        const todo = new todos(todoBody);
        todo.save();
        return todo;
    }

    static async find(queryParams) {
      const {_id,owner} = queryParams;
      const todoID = await todos.findOne({ _id , 'owner': owner})      
      return todoEntity.createFromObject(todoID);
    }

    /**
     * 
     * @param {PaginationOptions} pagOpts 
     * @returns 
     */
    
    static async fetch(pagOpts){
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
        const count = todo[0].totalCount[0].count

        const paginationData = new PaginationData(pagOpts, count)

        rows.forEach((row) => {
          paginationData.addItem(todoEntity.createFromObject(row));
        });
  
        
        return paginationData
    }


    static async update(todoBody){

      const {updates,id,owner,body} = todoBody;
      const todoUp = await todos.findOne({_id:id, owner})  
      updates.forEach( update => todoUp[update] = body[update] )
      const updateTodo = await todoUp.save();
      return updateTodo;
    }
    
    static async remove(queryParams) {
      const {_id,owner} = queryParams;
      const delTodo = await todos.findOneAndDelete({ _id, owner })
      return delTodo;
    } 
      
}

module.exports = TodoRepository

