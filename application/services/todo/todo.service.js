const TodoRepository = require("../../../infra/db/mongoose/repository/todo.repository");
const httpStatus = require("http-status")
const ApiError = require("../../../http/utils/ApiError")

class TodoService {
    
    static async createTodo(createTodoDTO){
        
        const todoCreated = await TodoRepository.add(createTodoDTO);
        return todoCreated;
    }

    static async findTodos(findTodosDTO){
        
        const pagOption = findTodosDTO.getPaginationOptions();
        const todos = await TodoRepository.fetch(pagOption);
        if(!todos){
            throw new ApiError(httpStatus.NOT_FOUND,"You dont have Todos against this ID!!")
        }
        return todos.getPaginatedData();
    }

    static async findOneTodo(findTodoDTO){

        const {_id,owner} = findTodoDTO
        const todoID = await TodoRepository.fetchByID({_id,owner});
        if(!todoID){
            throw new ApiError(httpStatus.NOT_FOUND,"You dont have Todo against this ID!!")
        }
        return todoID
    }

    static async updateTodo(updateTodoDTO){
        const {updates,id,owner,body} = updateTodoDTO;
        const propertiestodo = ['name','discription']
        const isValid = updates.every( update => propertiestodo.includes(update))
        if(!isValid)
            throw new ApiError(httpStatus.FORBIDDEN,"inputs are invalid")  
                  
        const updateTodo = await TodoRepository.update({updates,id,owner,body});
        if(!updateTodo){
            throw new ApiError(httpStatus.NOT_FOUND, "todo not found!!");
        }
        return updateTodo;
    }

    static async deleteTodo(deleteTodoDTO){

        const {id: _id,owner} = deleteTodoDTO;
        const delTodo = await TodoRepository.remove({ _id, owner});
        if(!delTodo){
            throw new ApiError(httpStatus.NOT_FOUND,"No Todo Found against this ID")
        }

        return {message: "Todo Deleted Successfully!!!"};
        
    }

}

module.exports = TodoService