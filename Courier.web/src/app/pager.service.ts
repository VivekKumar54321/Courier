import * as _ from 'underscore';
export class PagerService {
  getPager(totalPages: number, currentPage: number = 1, pageSize: number = 6) {
    let startPage: number, endPage: number;
    if (totalPages <= 6) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3)
      {
        startPage = 1;
        endPage = 6;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else
      {
        startPage = currentPage - 3;
        endPage = currentPage + 2;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);
    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }
}
