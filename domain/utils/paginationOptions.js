class PaginationOptions {

    constructor(page = 1, limit = 10) {
    this.page = page;
    this.limit = limit;
    }
    
    get skip(){
        return (this.page - 1) * this.limit;
    }
}
    
module.exports = PaginationOptions;