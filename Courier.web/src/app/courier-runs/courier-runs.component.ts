import { Component, OnInit } from '@angular/core';
import { CourierDataProviderService } from '../courier-data-provider.service';
import { CourierRuns } from '../ViewModel/CourierRunsViewModel';
import { NgForm } from '@angular/forms';
import { PagedDataInquiryResponse } from '../PagedDataEnquiryResponse/pagedDataInquiryResponse';
import { PagedDataRequest } from '../PagedDataRequest/pagedDataRequest';
import { PagerModel } from '../pagermodel/pager.model';
import { PagerService } from '../pager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courier-runs',
  templateUrl: './courier-runs.component.html',
  styleUrls: ['./courier-runs.component.scss']
})
export class CourierRunsComponent implements OnInit {

  //Array 
  posts: CourierRuns[] = [];
  // Object 
  post: CourierRuns = new CourierRuns();


  // paging searching and sorting 
  private pagedDataInquiryResponse = new PagedDataInquiryResponse();
  private pagedDataRequest = new PagedDataRequest();
  private pager: PagerModel = new PagerModel();
  public isDescending: boolean = true;

  private orderBy: string;
  private loading: boolean = false;
  isCategory: boolean = false;
  isParentCategory: boolean = false;
  isChildCategory: boolean = false;

  pageSizes: number[] = [5, 10, 20, 100]

  searchText: string;
  public search: boolean = false;


  //submitted: boolean = false;
  CreateCourierRuns: boolean = false;

  constructor(private courierDataProviderService: CourierDataProviderService, private pagerService: PagerService, private toastr: ToastrService)
  {
   
    this.pagedDataRequest.pageNumber = 0;
    this.pagedDataRequest.pageNumber = 0;
    this.pagedDataRequest.totalRecords = 0;
    this.pagedDataRequest.pageSize = 10;
    this.orderBy = " ";

  }

  ngOnInit() {

    //this.getCourierRunsList();

    this.runNamedefault();

    this.getPagedList(0);

  }

  //Default run name list
  runNamedefault()
  {
    this.post.isRegularRun = false;
  }


  //Courier List 
  getCourierRunsList() {
    this.courierDataProviderService.getAll(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(result =>
    {
      this.posts = result.results as CourierRuns[];
      console.log(result.results);
      //alert("List of Courier Runs ")
    },
      error =>
      {
        console.log(error);
      }
    );
  }

  //Save and Update
  saveCourierRunsData(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.post.courierRunsId) {
      this.courierDataProviderService.updateCourierRunsData(this.post).subscribe(result => {
        this.toastr.success(result.message);
        //alert("Data Updated");
        this.getCourierRunsList();
      },
        error => {
          console.log(error);
        }
      );
    }

    else {
      this.courierDataProviderService.saveCourierRuns(this.post).subscribe(result => {
        this.toastr.success(result.message);
       // alert(result);
        this.getCourierRunsList();
      },
        error => {
          console.log(error.message);
          alert("Error RunName");
        }
      );
    }
  }

  //Edit
  editCourierRunsData(courierRunsId) {
    this.courierDataProviderService.getById(courierRunsId).subscribe(result => {
      this.post = result;
      this.getCourierRunsList();
    });
  }

  //Delete
  deleteCourierRuns(courierRunsId) {
    this.courierDataProviderService.deleteCourierRunsData(courierRunsId).subscribe(result => {
      this.toastr.success(result.message);
      this.getCourierRunsList();
    });
  }

  //Reset Form
  resetValue() {
    this.post = new CourierRuns();
  }

  //Show the Create Form
  createform() {
    this.CreateCourierRuns = true;
  }

  //Show the Main Form before Creating it 
  backform() {
    this.CreateCourierRuns = false;
  }



  //Paging List Code
  getPagedList(offset) {
    if (offset === 0) this.pagedDataRequest.pageNumber = offset + 1;
    else this.pagedDataRequest.pageNumber = offset;
    this.courierDataProviderService.getAll(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(
      (response) => {
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
  searchField(searchText, isSearchByText: boolean)
  {
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
    this.courierDataProviderService.getAll(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(
      results => this.loadDatasucessful(results),
      error => { console.log(error) });
  }

  //Sorting the  List 
  sortByField(isDescending, filter)
  {
    switch (filter)
    {
      case "courierRunsId":
        if (isDescending) {
          this.isCategory = true;
          this.orderBy = "courierRunsId_Desc";
          this.isDescending = false;
        }
        else {
          this.orderBy = "courierRunsId";
          this.isCategory = false;
          this.isDescending = true;
        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;

      case "RunName":
        if (isDescending)
        {
          this.isParentCategory = true;
          this.orderBy = "RunName_Desc";
          this.isDescending = false;
        }
        else
        {
          this.orderBy = "RunName";
          this.isParentCategory = false;
          this.isDescending = true;
        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;

      case "isRegularRun":
        if (isDescending) {
          this.isChildCategory = true;
          this.orderBy = "isRegularRun_Desc";
          this.isDescending = false;
        }
        else {
          this.orderBy = "isRegularRun";
          this.isChildCategory = false;
          this.isDescending = true;
        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;
    }
  }

 

  onChange()
    {
      this.getPagedList(0);
    }

  cancelSearching()
    {
      this.search = false;
    }

  cancelSearch()
    {
      this.search = false;
      if (!this.searchText)
      {
        console.log();
      }
    }

}


