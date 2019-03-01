import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourierRuns } from './ViewModel/CourierRunsViewModel';
import { CourierRunDetails, DropDownCourierRun, DropDownCourier } from './ViewModel/CourierRunDetailsViewModel';
import { Courier } from './ViewModel/CourierViewModel';
import { PagedDataRequest } from './PagedDataRequest/pagedDataRequest';
import { PagerService } from './pager.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierDataProviderService {
  protected readonly courierUrl: string = "https://localhost:44369/api/CouriersAPI/";
  protected readonly courierRunsUrl: string = "https://localhost:44369/api/CourierRunsAPI/";
  protected readonly courierRunDetailsUrl: string = "https://localhost:44369/api/CourierRunDetailsAPI/";



  constructor(private http: HttpClient) { }



  //Searching , Paging , and Sorting in Courier
  getAllCourier<T>(pageInfo: PagedDataRequest, isDescending: boolean, filter: string)
  {
    if (!pageInfo.searchText) pageInfo.searchText = "";
    const OrderBy = filter;
    var c = this.courierUrl + "getpagedlist";
    return this.http.post<any>(c, { ...pageInfo, OrderBy });
  }

  //List of Couriers 
   getAllCourierlist<T>() {
    return this.http.get<any>(this.courierUrl + "GetCouriersList");
  }

  //Save the new Courier 
  savedata(post: Courier): Observable<any>{
    return this.http.post(this.courierUrl + "PostCourier", post);

  }

  // Get the Courier detail for Editing     
  getByCourierId(courierId) {
    return this.http.get(this.courierUrl + "GetCourier/" + courierId);

  }

  //Update the existing Courier
  updateData(post: Courier): Observable<any> {
    return this.http.post(this.courierUrl + "PutCourier", post);

  }
  // Delete the Courier details 
  delete(courierId): Observable<any> {
    return this.http.delete(this.courierUrl + "DeleteCourier/" + courierId);
  }












  //Searching , Paging , and Sorting in CourierRuns
  getAll<T>(pageInfo: PagedDataRequest, isDescending: boolean, filter: string)
  {
    if (!pageInfo.searchText) pageInfo.searchText = "";
    const OrderBy = filter;
    var a = this.courierRunsUrl + "getpagedlist";
    return this.http.post<any>(a, { ...pageInfo, OrderBy });
  }


  // List of CouriersRuns
  getAllCourierRunslist() {
    return this.http.get(this.courierRunsUrl + "GetCourierRuns");
  }

  // Naya CourierRuns Create Gareko ani save garne
  saveCourierRuns(post): Observable<any>
  {
    return this.http.post(this.courierRunsUrl + "PostCourierRuns", post)
  }

  //coureirRunsId bta courierrun ko detail fetch gareko
  getById(courierRunsId) {
    return this.http.get(this.courierRunsUrl + "GetCourierRuns/" + courierRunsId);
  }

  // EDit gareko  Courier Runs ko details lai
  updateCourierRunsData(post: CourierRuns): Observable<any>  {
    return this.http.post(this.courierRunsUrl + "PutCourierRuns", post);
  }
  
  // Delete gareko  Courier Runs ko details lai
  deleteCourierRunsData(courierRunsId): Observable<any> {
    return this.http.delete(this.courierRunsUrl + "DeleteCourierRuns/" + courierRunsId);
  }














  //Searching , Paging , and Sorting in CourierRundetails
  getAllDetails<T>(pageInfo: PagedDataRequest, isDescending: boolean, filter: string) {
    if (!pageInfo.searchText) pageInfo.searchText = "";
    const OrderBy = filter;
    var b = this.courierRunDetailsUrl + "getpagedlistCRD";
    return this.http.post<any>(b, { ...pageInfo, OrderBy });
  }
  
  // CourierRuns Details ko list
  getCourierRunDetailsList() {
    return this.http.get(this.courierRunDetailsUrl + "GetCourierRunDetail");
  }

  //Save new  Courier Runs Details 
  saveCourierRunDetails(post: CourierRunDetails): Observable<any> {
    return this.http.post(this.courierRunDetailsUrl + "PostCourierRunDetails", post)

  }
  
  // Update the existing  COurier Runs Details 
  updateCourierRunDetailsData(post: CourierRunDetails): Observable<any> {
    return this.http.post(this.courierRunDetailsUrl + "PutCourierRunDetails", post);
  }

  //Edit CourierRuns Details
  getByCourierRunDetailId(courierRunDetailId) {
    return this.http.get(this.courierRunDetailsUrl + "GetCourierRunDetail/" + courierRunDetailId);
  }

  //Delete CourierRuns Details
  deleteCourierRunDetailData(courierRunDetailId): Observable<any> {
    return this.http.delete(this.courierRunDetailsUrl + "DeleteCourierRunDetails/" + courierRunDetailId);
  }

  //Dropdown for CourierRUns
  courierRunNameDropDown(dropdown: DropDownCourierRun) {
    return this.http.get(this.courierRunDetailsUrl + "GetCourierRunsDropDown");

  }

  //Dropdown for Courier
  courierDropDown(dropdownC: DropDownCourier) {
    return this.http.get(this.courierRunDetailsUrl + "GetCourierDropDown");

  }




}
