export class Pagination {
    pageSize: number;
    maxNumOfPages: number;
    numOfPages: number;
    currentPage: number;
    startPage: number;
    endPage: number;
    
    constructor() {
        this.pageSize = 20;
        this.maxNumOfPages = 10;
        this.numOfPages = 1;
        this.startPage = 0;
        this.endPage = 0;
        this.currentPage = 0;
    }
    
    generatePageIds(): Array<number> {
        let pageIds = [];
        for(let i = this.startPage; i <= this.endPage; i++) {
            pageIds.push(i);
        }
        return pageIds;
    }
    
    detectNextPagination(): Pagination {
        if(this.numOfPages > this.maxNumOfPages ) {
            let curr = this.endPage + 1;
            if (curr < this.numOfPages) {
                let end = curr + Math.floor(this.maxNumOfPages / 2);
                while (end >= this.numOfPages) {
                    end--;
                }
                let start = curr - Math.floor(this.maxNumOfPages / 2);
                    while (start < 0) {
                        start++;
                }
                let newPagination = new Pagination();
                newPagination.pageSize = this.pageSize;
                newPagination.maxNumOfPages = this.maxNumOfPages;
                newPagination.numOfPages = this.numOfPages;
                newPagination.startPage = start;
                newPagination.endPage = end;
                newPagination.currentPage = curr;
                return newPagination;
            }
        }
        return this;
    }
    
    detectPrePagination(): Pagination {
        if(this.numOfPages > this.maxNumOfPages ) {
            let curr = this.startPage - 1;
            if (curr >= 0) {
                let end = curr + Math.floor(this.maxNumOfPages / 2);
                while (end >= this.numOfPages) {
                    end--;
                }
                let start = curr - Math.floor(this.maxNumOfPages / 2);
                while (start < 0) {
                    start++;
                }
                let newPagination = new Pagination();
                newPagination.pageSize = this.pageSize;
                newPagination.maxNumOfPages = this.maxNumOfPages;
                newPagination.numOfPages = this.numOfPages;
                newPagination.startPage = start;
                newPagination.endPage = end;
                newPagination.currentPage = curr;
                return newPagination;
            }
        }
        return this;
    }
}