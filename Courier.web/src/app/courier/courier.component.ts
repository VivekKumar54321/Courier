import { Component, OnInit } from '@angular/core';
import { Courier } from '../ViewModel/CourierViewModel';
import { CourierDataProviderService } from '../courier-data-provider.service';
import { NgForm } from '@angular/forms';
import { PagedDataInquiryResponse } from '../PagedDataEnquiryResponse/pagedDataInquiryResponse';
import { PagedDataRequest } from '../PagedDataRequest/pagedDataRequest';
import { PagerModel } from '../pagermodel/pager.model';
import { PagerService } from '../pager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {
  stringPattern: string = "[a-zA-Z ]*";
  posts: Courier[] = [];
  submitted: boolean = false;
  post: Courier = new Courier();



  // paging searching and sorting 
  private pagedDataInquiryResponse = new PagedDataInquiryResponse();
  private pagedDataRequest = new PagedDataRequest();
  private pager: PagerModel = new PagerModel();
  public isDescending: boolean = true;
 
  private orderBy: string;
  private loading: boolean = false;
  isCategory: boolean = false;
  isParentCategory: boolean = false;

  pageSizes: number[] = [5, 10, 20, 100]

  searchText: string;
  public search: boolean = false;

  //submitted: boolean = false;
  CreateCourier: boolean = false;


  constructor(private courierDataProviderService: CourierDataProviderService, private pagerService: PagerService, private toastr: ToastrService)
  {

    this.pagedDataRequest.pageNumber = 0;
    this.pagedDataRequest.pageNumber = 0;
    this.pagedDataRequest.totalRecords = 0;
    this.pagedDataRequest.pageSize = 10;
    this.orderBy = " ";

  }


  ngOnInit()
  {

   //this.getAll();

    this.getPagedList(0);
  }

  getAll() {
    this.courierDataProviderService.getAllCourier(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(data =>
    {
      this.posts = data.results as Courier[];

     // console.log(data.results);
     // alert("List of Couriers");
      //this.posts = data;
    });
  }

  onSubmit(form: NgForm)
  {
    if (form.invalid)
    {
      return;
    }

    if (this.post.courierId)
    {
      this.courierDataProviderService.updateData(this.post).subscribe(response => {
        this.toastr.success(response.message); 
       // alert(form.value);
        this.getAll();
      
      });
    }
    else {
      this.courierDataProviderService.savedata(this.post).subscribe(response => {
        this.toastr.success(response.message); 
       // alert("Data Created");
        this.getAll();

      });
    }
  }

  Deleteitem(courierId) {
    this.courierDataProviderService.delete(courierId).subscribe(response => {
      this.toastr.success(response.message); 
     // alert("Data deleted ")
      this.getAll();
    });

  }

  Edititem(courierId) {
    this.courierDataProviderService.getByCourierId(courierId).subscribe(data => {
      this.post = data

    });
  }


  resetValue() {
    this.post = new Courier();
  }


  createform() {
    this.CreateCourier = true;
  }

  backform() {
    this.CreateCourier = false;
  }



  //Paging List Code
  getPagedList(offset) {
    if (offset === 0) this.pagedDataRequest.pageNumber = offset + 1;
    else this.pagedDataRequest.pageNumber = offset;
    this.courierDataProviderService.getAllCourier(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(
      (response) =>
      {
        console.log(response);
        this.loadDatasucessful(response)
      }
    )
  }


  //Load the PagedData
  loadDatasucessful(pagedData) {
    if (pagedData) {
      this.pagedDataInquiryResponse.pageNumber = pagedData.currentPage;
      this.pagedDataInquiryResponse.pageCount = pagedData.pageCount;
      this.pagedDataInquiryResponse.pageSize = pagedData.pageSize;
      this.pagedDataInquiryResponse.items = Array(this.pagedDataInquiryResponse.pageCount).fill(this.pagedDataInquiryResponse.pageCount).map((x, i) => i);
      this.pagedDataInquiryResponse.totalRecords = pagedData.rowCount;
      this.pagedDataInquiryResponse.firstRowOnPage = pagedData.firstRowOnPage;

    }
    this.pager = this.pagerService.getPager(pagedData.pageCount, pagedData.currentPage, pagedData.pageSize);
    this.posts = pagedData.results;
  }

  //Searching the text in the CourierRuns List 
  searchField(searchText, isSearchByText: boolean) {
    if (!searchText) searchText = "";
    this.loading = true;

    if (isSearchByText) {
      this.pagedDataRequest.searchText = searchText;
      this.pagedDataRequest.searchDate = null;

    }
    if (!isSearchByText) {
      this.pagedDataRequest.searchDate = searchText;
      this.pagedDataRequest.searchText = null;
    }
    this.pagedDataRequest.isSearchByText = isSearchByText;
    this.courierDataProviderService.getAllCourier(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(
      results => this.loadDatasucessful(results),
      error => { console.log(error) });
  }

  //Sorting the  List 
  sortByField(isDescending, filter) {
    switch (filter) {
      case "courierId":
        if (isDescending) {
          this.isCategory = true;
          this.orderBy = "courierId_Desc";
          this.isDescending = false;
        }
        else {
          this.orderBy = "courierId";
          this.isCategory = false;
          this.isDescending = true;
        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;

      case "CourierName":
        if (isDescending) {
          this.isParentCategory = true;
          this.orderBy = "CourierName_Desc";
          this.isDescending = false;
        }
        else {
          this.orderBy = "CourierName";
          this.isParentCategory = false;
          this.isDescending = true;
        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;

    }
  }



  onChange() {
    this.getPagedList(0);
  }

  cancelSearching() {
    this.search = false;
  }


  cancelSearch() {
    this.search = false;
    if (!this.searchText) {
      console.log();
    }
  }

}

