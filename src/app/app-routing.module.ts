import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { DrivinglicenseComponent } from './drivinglicense/drivinglicense.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { LearnerlicenseComponent } from './learnerlicense/learnerlicense.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dasboard', component: DashboardComponent },
  { path: 'popup', component: PopUpComponent },
  { path: 'driving-license/:id', component: DrivinglicenseComponent },
  { path: 'vehicle/:id', component: VehicleComponent },
  { path: 'learner-license/:id', component: LearnerlicenseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
