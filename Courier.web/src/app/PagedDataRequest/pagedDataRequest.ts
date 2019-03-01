//import { SearchBy } from '../enum/searchby';
export class PagedDataRequest {
  constructor(public pageNumber?: number, public pageSize?: number, public searchText?: string, public totalRecords?: number, public searchDate?: string, public searchBy?: string, public resultType?: string,
    public isSearchByText?: boolean, public firstRowOnPage?: number, public lastRowOnPage?: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.searchText = searchText;
    this.totalRecords = totalRecords;
    this.firstRowOnPage = firstRowOnPage;
    this.lastRowOnPage = lastRowOnPage;
    //this.isSearchByText = isSearchByText;
  }
}
