class PaginationOptions {

    constructor(page = 1, limit = 10) {
    this.page = page;
    this.limit = limit;
    }
    
    get offset(){
    return (this.page - 1) * this.limit();
    }
    }
    
    export default PaginationOptions;