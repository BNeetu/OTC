import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OTPVerificationComponent } from './otp-verification/otp-verification.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

const routes: Routes = [
  { path:'', title:"Signup Page", component:SignUpComponent},
  { path:'otp-verification', title:"OTP", component:OTPVerificationComponent},
  { path:'bar-chart', title:"Chart", component:BarChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
