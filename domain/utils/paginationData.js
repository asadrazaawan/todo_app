class PaginationData {
    /**
     *
     * @param {PaginationOptions} pagOpts
     * @param itemCount
     */
    constructor(pagOpts, itemCount) {
      this.pagOpts = pagOpts;
      this.itemCount = itemCount;
      this.items = [];
    }
  
    setItemCount(count) {
      this.itemCount = count;
    }
  
    totalPages() {
      return Math.ceil(this.itemCount / this.pagOpts.limit);
    }
  
    addItem(item) {
      this.items.push(item);
    }
  
    hasNext() {
      return this.pagOpts.page < this.totalPages();
    }
  
    nextPage() {
      return this.pagOpts.page + 1;
    }
  
    hasPrev() {
      return this.pagOpts.page > 1;
    }
  
    prevPage() {
      return this.pagOpts.page - 1;
    }
  
    getItems() {
      return this.items;
    }
  
    getItemCount() {
      return this.itemCount;
    }
  
    getPaginatedData() {
      const paginationInfo = {
        totalItems: this.itemCount,
        perPage: this.pagOpts.perPage,
        totalPages: this.totalPages(),
        currentPage: this.pagOpts.page,
        perPage: this.pagOpts.limit,
      };
  
      if (this.hasNext()) {
        paginationInfo.nextPage = this.nextPage();
      }
  
      if (this.hasPrev()) {
        paginationInfo.prevPage = this.prevPage();
      }
  
      return {
        status: 'success',
        paginationInfo,
        data: this.items,
      };
    }
  }
  
  module.exports = PaginationData;