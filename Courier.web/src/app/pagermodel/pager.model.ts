export class PagerModel {
  constructor(
    public currentPage?: number,
    public startPage?: number,
    public totalPages?: number,
    public endPage?: number,
    public pages?: number[],
  ) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.startPage = startPage;
    this.endPage = endPage;
    this.pages = pages;
  }
}
