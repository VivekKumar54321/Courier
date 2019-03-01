import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourierComponent } from './courier/courier.component';
import { CourierRunsComponent } from './courier-runs/courier-runs.component';
import { CourierRunDetailComponent } from './courier-run-detail/courier-run-detail.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [{ path: 'CourierComponent', component: CourierComponent }, { path: 'CourierRunsComponent', component: CourierRunsComponent }, { path: 'CourierRunDetailComponent', component: CourierRunDetailComponent }, { path: "report", component: ReportComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
