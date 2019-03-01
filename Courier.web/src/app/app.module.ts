import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourierComponent } from './courier/courier.component';
import { CourierRunsComponent } from './courier-runs/courier-runs.component';
import { CourierRunDetailComponent } from './courier-run-detail/courier-run-detail.component';
import { CourierDataProviderService } from './courier-data-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from './pager.service';
import { PaginationComponent } from './pagination/pagination.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReportComponent } from './report/report.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    CourierComponent,
    CourierRunsComponent,
    CourierRunDetailComponent,
    PaginationComponent,
    ReportComponent,

  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot() 
        
        
  ],

  providers: [CourierDataProviderService, PagerService,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
