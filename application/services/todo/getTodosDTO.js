const PaginationOptions = require("../../../domain/utils/paginationOptions");

class GetTodosDTO {
      
    constructor(page , limit) {
      this.paginationOptions = new PaginationOptions(page, limit);
    }
  
    getPaginationOptions(){
      return this.paginationOptions;
    }
  }
  
  module.exports = GetTodosDTO;