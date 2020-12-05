import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';
import { DrivinglicenseComponent } from './drivinglicense/drivinglicense.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { LearnerlicenseComponent } from './learnerlicense/learnerlicense.component';
import { OffenceComponent } from './offence/offence.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'popup', component: PopUpComponent },
  { path: 'driving-license/:id', component: DrivinglicenseComponent },
  { path: 'vehicle/:id', component: VehicleComponent },
  { path: 'learner-license/:id', component: LearnerlicenseComponent },
  { path: 'offence', component: OffenceComponent },
  { path: 'page-not-found', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
