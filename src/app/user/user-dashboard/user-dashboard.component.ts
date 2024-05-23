import { Component, OnInit } from '@angular/core';
import { ApiMethod, AuthEndPoints } from 'src/app/constant/ApiMethod';
import { EmployeedataService } from 'src/app/service/employeedata.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  profileData:any;
  profile_pic:any;
  emailotp:any;
  smsotp:any;
  refId:any;

  constructor( private empdata: EmployeedataService) {}
  ngOnInit(): void {
    this.userProfileData();
    this.userProfileImg();
  
    
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


  showOverview: boolean = true;
  showTwoFactor: boolean = false;
  showOTPForm: boolean = false;
  
  toggleOTPForm() {
    this.showOTPForm = !this.showOTPForm;
  }



  toggleContent(content: string) {
    if (content === 'overview') {
      this.showOverview = true;
      this.showTwoFactor = false;
    } else if (content === 'twoFactor') {
      this.showOverview = false;
      this.showTwoFactor = true;
    }
  }


  handleYesClick() {
    this.toggleOTPForm(); 

    this.empdata.requestCall(AuthEndPoints.TWO_FACT_AUTH, ApiMethod.POST).subscribe((result) =>{
      console.log(result);
    });

  }


  // FOR ADMIN PROFILE DATA

  userProfileData(data?: any) {
    this.empdata.requestCall(AuthEndPoints.ADMIN_PROFILE, ApiMethod.POST,data).subscribe((result) =>{
      this.profileData= result
      console.log(this.profileData);
    });
  }
  

  // FOR OTP CONFIRMATION 


  validateUserData(data: any) {
    this.emailotp = data.otp1+data.otp2+data.otp3+data.otp4+data.otp5+data.otp6;
    this.smsotp = data.otp7+data.otp8+data.otp9+data.otp10+data.otp11+data.otp12;
  
    const userData={emailotp:this.emailotp,smsotp:this.smsotp,twofaType:"OTP"}
    if(this.otpVerifyform.valid)
    {this.empdata.requestCall(AuthEndPoints.TWO_FACT_VER,ApiMethod.POST,userData).subscribe((result)=>{
      console.log(result);
  
    })}
    }
  
  // FOR PROFILE IMAG ON THE USER PROFILE

userProfileImg() {
  this.empdata.requestCall(AuthEndPoints.USER_PROFILE_IMG, ApiMethod.GET).subscribe((result) =>{
    console.log(result.data);
    this.profile_pic= result.data;
    console.log(this.profile_pic)
  });
}


upProfileImg(event:any) {
  const data = new FormData();
  data.append('image', event.target.files[0]);

  this.empdata.requestCall(AuthEndPoints.UPDATE_PROFILE, ApiMethod.POST,data).subscribe((result) =>{
    console.log(result.data);
    this.userProfileData()
  });
}
  
}



