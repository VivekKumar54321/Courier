import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CourierRuns } from '../ViewModel/CourierRunsViewModel';
import { CourierDataProviderService } from '../courier-data-provider.service';
import { CourierRunDetails, DropDownCourierRun, DropDownCourier } from '../ViewModel/CourierRunDetailsViewModel';
import { Courier } from '../ViewModel/CourierViewModel';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';




@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

  
  datePickerConfig: Partial<BsDaterangepickerConfig>;

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


  constructor(private courierDataProviderService: CourierDataProviderService) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers:false,
        dateInputFormat:'MMMM Do YYYY'
      });
    this.post.courier = new Courier();
    this.post.courierRuns = new CourierRuns();
  }

  ngOnInit()
  {

    this.getAllCourierRunDetailsList();

    this.dropdownCourier();

    this.dropdownCourierRunName();

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
  getAllCourierRunDetailsList() {
    this.courierDataProviderService.getCourierRunDetailsList().subscribe(result => {
      this.posts = result as CourierRunDetails[];
      // console.log(this.posts);
     
    },
      error => {
        console.log(error);
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
        alert("Data Updated");
        this.getAllCourierRunDetailsList();
      },
        error => {
          console.log(error);
        });
    }

    else {
      //Save the new created Courier RUns Details
      this.courierDataProviderService.saveCourierRunDetails(this.post).subscribe(result => {

        alert("Data Created");
        this.getAllCourierRunDetailsList();
      });
    }
  }



}










