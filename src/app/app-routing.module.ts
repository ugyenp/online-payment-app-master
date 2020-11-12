import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { DrivinglicenseComponent } from './drivinglicense/drivinglicense.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'vehicle/:id', component: DashboardComponent },
  { path: 'popup', component: PopUpComponent },
  { path: 'license', component: DrivinglicenseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
