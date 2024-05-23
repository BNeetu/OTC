
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
// import { HighchartsChartComponent } from 'highcharts-angular';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OTPVerificationComponent } from './otp-verification/otp-verification.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
// import { NgApexchartsModule } from 'ng-apexcharts';

import { NgApexchartsModule } from 'ng-apexcharts'; // Import ApexCharts module

@NgModule({
  declarations: [
    SignUpComponent,
    OTPVerificationComponent,
    BarChartComponent,
    // HighchartsChartComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // FormGroup,
    RouterModule,
    NgApexchartsModule
    
    
  
  ]
})
export class AuthenticationModule { }