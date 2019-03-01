import { Component, OnInit } from '@angular/core';
import { CourierRunDetails, DropDownCourierRun, DropDownCourier } from '../ViewModel/CourierRunDetailsViewModel';
import { Courier } from '../ViewModel/CourierViewModel';
import { CourierRuns } from '../ViewModel/CourierRunsViewModel';
import { CourierDataProviderService } from '../courier-data-provider.service';
import { NgForm } from '@angular/forms';
import { PagedDataInquiryResponse } from '../PagedDataEnquiryResponse/pagedDataInquiryResponse';
import { PagedDataRequest } from '../PagedDataRequest/pagedDataRequest';
import { PagerModel } from '../pagermodel/pager.model';
import { PagerService } from '../pager.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-courier-run-detail',
  templateUrl: './courier-run-detail.component.html',
  styleUrls: ['./courier-run-detail.component.scss']
})
export class CourierRunDetailComponent implements OnInit {


  //Array of Object 
  posts: CourierRunDetails[] = [];
  // Object 
  post: CourierRunDetails = new CourierRunDetails();


  //To display the Courier Run Details Form for Creating 
  CreateCourierRunDetails: boolean = false;


  //Array of CourierRUn Dropdown 
  dropdowns: DropDownCourierRun[] = [];
  dropdown: DropDownCourierRun = new DropDownCourierRun();

  // array of courier  dropdown
  dropdownsC: DropDownCourier[] = [];
  dropdownC: DropDownCourier = new DropDownCourier();

  courier: Courier = new Courier();
  courierRuns: CourierRuns = new CourierRuns();

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
  isSampleCategory: boolean = false;

  pageSizes: number[] = [5, 10, 20, 100]

  searchText: string;
  public search: boolean = false;


  constructor(private courierDataProviderService: CourierDataProviderService, private pagerService: PagerService, private toastr: ToastrService) {
    this.post.courier = new Courier();
    this.post.courierRuns = new CourierRuns();


    this.pagedDataRequest.pageNumber = 0;
    this.pagedDataRequest.pageNumber = 0;
    this.pagedDataRequest.totalRecords = 0;
    this.pagedDataRequest.pageSize = 10;
    this.orderBy = " ";
  }

  ngOnInit() {
   // this.getAllCourierRunDetailsList();
    this.dropdownCourier();
   this.dropdownCourierRunName();
    this.getPagedList(0);

  }

  //DropDown for COurier RUn Name
  dropdownCourierRunName() {
    this.courierDataProviderService.courierRunNameDropDown(this.dropdown).subscribe(result => {
      this.dropdowns = result as DropDownCourierRun[];
      console.log(this.dropdowns);
      //alert("List of Courier Run Details ");
    });

  }


  //DropDown for COurier 
  dropdownCourier() {
    this.courierDataProviderService.courierDropDown(this.dropdownC).subscribe(result => {
      this.dropdownsC = result as DropDownCourier[];
      console.log(this.dropdownsC);
      //alert("List of Courier Details ");
    });
  }


  //Courier Run Details List 
  getAllCourierRunDetailsList()
  {
    this.courierDataProviderService.getAllDetails(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(result =>
    {
      this.posts = result.results as CourierRunDetails[];
      console.log(result.results);
      //alert("List of Courier Run Details ")
   
    }
    );
  }


  //Save and Update the new created CourierRunDetails
  saveCourierRunDetailsData(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    if (this.post.courierRunDetailId) {
      //Update the existing CourierRunDetails
      this.courierDataProviderService.updateCourierRunDetailsData(this.post).subscribe(result => {
        this.toastr.success(result.message);
       // alert("Data Updated");
        this.getAllCourierRunDetailsList();
      },
        error => {
          console.log(error);
        });
    }

    else {
      //Save the new created Courier RUns Details
      this.courierDataProviderService.saveCourierRunDetails(this.post).subscribe(result => {
        this.toastr.success(result.message);

       // alert("Data Created");
        this.getAllCourierRunDetailsList();
      });
    }
  }

 //Edit the created CourierRunDetails
  editCRD(courierRunDetailId) {
    this.courierDataProviderService.getByCourierRunDetailId(courierRunDetailId).subscribe(result => {
     this.post = result;
      //alert("Edited");
      this.getAllCourierRunDetailsList();
    });


  }

   //Delete the existing  CourierRunDetails
  deleteCRD(courierRunDetailId) {
    this.courierDataProviderService.deleteCourierRunDetailData(courierRunDetailId).subscribe(result => {
      this.toastr.success(result.message);
     // alert("Data Deleted");
      this.getAllCourierRunDetailsList();
    });
  }

  //Reset the form 
  resetValue()
  {
   
    this.post = new CourierRunDetails();
    this.post.courier = new Courier();
    this.post.courierRuns = new CourierRuns();
   
    //let newValue: 0;
    //this.post.courier.courierId = newValue;
    //this.post.courierRuns.courierRunsId = newValue;
    //this.post.numberOfSamples = newValue;
    //this.post.courierArrivalTime = undefined;
   
   
  }
  
  createform() {
    this.CreateCourierRunDetails = true;
  }

  backform() {
    this.CreateCourierRunDetails = false;
  }

  //Paging List Code
  getPagedList(offset) {
    if (offset === 0) this.pagedDataRequest.pageNumber = offset + 1;
    else this.pagedDataRequest.pageNumber = offset;
    this.courierDataProviderService.getAllDetails(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(
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
    this.courierDataProviderService.getAllDetails(this.pagedDataRequest, this.isDescending, this.orderBy).subscribe(
      results => this.loadDatasucessful(results),
      error => { console.log(error) });
  }

  //Sorting the  List 
  sortByField(isDescending, filter) {
    switch (filter) {

      case "courierRunDetailsId":
        if (isDescending) {
          this.isCategory = true;
          this.orderBy = "courierRunDetailsId_Desc";
          this.isDescending = false;
        }
        else {
          this.orderBy = "courierRunDetailsId";
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


      case "RunName":
        if (isDescending) {
          this.isChildCategory = true;
          this.orderBy = "RunName_Desc";
          this.isDescending = false;
        }
        else {
          this.orderBy = "RunName";
          this.isChildCategory = false;
          this.isDescending = true;
        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;

     
      case "NumberOfSamples":
        if (isDescending) {
          this.isSampleCategory = true;
          this.orderBy = "NumberOfSamples_Desc";
          this.isDescending = false;
        }
        else {
          this.orderBy = "NumberOfSamples";
          this.isSampleCategory = false;
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
