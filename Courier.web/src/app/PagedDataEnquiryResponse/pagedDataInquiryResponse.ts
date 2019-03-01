export class PagedDataInquiryResponse<T>
{
  items = new Array<T>();
  totalRecords: number = 0;
  pageSize: number = 0;
  pageNumber: number = 0;
  pageCount: number = 0;
  firstRowOnPage: number = 0;
}
