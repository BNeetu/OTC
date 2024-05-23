import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { ApiMethod, AuthEndPoints } from 'src/app/constant/ApiMethod';
import { EmployeedataService } from 'src/app/service/employeedata.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OTPVerificationComponent implements OnInit {
  description:any;
  emailotp:any;
  refId:any;
  smsotp:any;

  data:number = 0;
  ngOnInit(): void {
    const Obs$ =  interval(2000);
    Obs$.subscribe((d) => {
      this.data = d;
    })

    //storig description and refId in local storage

    this.description = localStorage.getItem('res');
    this.refId = localStorage.getItem('refId');
  }

  otpVerifyform =new FormGroup ({
    otp1 : new FormControl('',[Validators.required]),
    otp2 : new FormControl('',[Validators.required]),
    otp3 : new FormControl('',[Validators.required]),
    otp4 : new FormControl('',[Validators.required]),
    otp5 : new FormControl('',[Validators.required]),
    otp6 : new FormControl('',[Validators.required]),
    otp7 : new FormControl('',[Validators.required]),
    otp8 : new FormControl('',[Validators.required]),
    otp9 : new FormControl('',[Validators.required]),
    otp10 : new FormControl('',[Validators.required]),
    otp11 : new FormControl('',[Validators.required]),
    otp12 : new FormControl('',[Validators.required]),

  })

  constructor(
    private empdata: EmployeedataService) {}


    



  validateUserData(data: any) {
  this.emailotp = data.otp1+data.otp2+data.otp3+data.otp4+data.otp5+data.otp6;
  this.smsotp = data.otp7+data.otp8+data.otp9+data.otp10+data.otp11+data.otp12;

  const userData={emailotp:this.emailotp,smsotp:this.smsotp,refid:this.refId,refId:"SIGNUP"}
  if(this.otpVerifyform.valid)
  {this.empdata.requestCall(AuthEndPoints.Otp_Verify,ApiMethod.POST,userData).subscribe((result)=>{
    console.log(result);

  })}
  }

}
// i want to set time like this 2 mintes and :00 secounds if time expires it should show resend otp button  