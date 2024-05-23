import { Component, OnInit } from '@angular/core';
import { ApiMethod, AuthEndPoints } from 'src/app/constant/ApiMethod';
import { EmployeedataService } from 'src/app/service/employeedata.service';
import { FormBuilder, FormGroup, Validators,   FormControl, } from '@angular/forms';



@Component({
  selector: 'app-member-assistance',
  templateUrl: './member-assistance.component.html',
  styleUrls: ['./member-assistance.component.scss']
})
export class MemberAssistanceComponent implements OnInit  {
  
  userData:any;
  filterSubData:any;
  filterData:any;
  page:any;
  totalItems:any;
  selectedMemberType: any ;

  constructor( private empdata: EmployeedataService) {



    this.memberData();

    
   }

   userForm = new FormGroup({
    from_date: new FormControl('', [Validators.required]),
    to_date: new FormControl('', [Validators.required]),
    kyc_status: new FormControl('', [Validators.required]),
    user_type: new FormControl('', [Validators.required]),
    sub_user_type: new FormControl('', [Validators.required]),
    subscription_id: new FormControl('', [Validators.required])
   });


// pageSize = 5;
// currentPage = 1 
ngOnInit(): void {
  this.filterUserDate();
  this.subMember();
  this.memberData();
}



itemPerPage:any=10;
memberData(data?:any) {
  const payload = {
    recordperpage:this.itemPerPage,
    pagenumber:this.page,
    from_date: this.userForm.get('from_date')?.value,
    kyc_status:  this.userForm.get('kyc_status')?.value,
    sub_user_type: this.userForm.get('sub_user_type')?.value,
    subscription_id: this.userForm.get('to_date')?.value,
    to_date: this.userForm.get('to_date')?.value,
    user_type:this.userForm.get('to_date')?.value
}

console.log(payload)

  this.empdata.requestCall(AuthEndPoints.SIGNUP_USER__DATA, ApiMethod.POST,payload).subscribe((result) =>{
     this.userData = result.data;
     console.log(result.pagination.current);
     this.page=result.pagination.current
     this.totalItems=result.pagination.total     
   });
}



changePage(event:any){
  this.page = event;
  this.memberData();
}



empProfileData(data?: any) {
  console.log(data)
  const payload = {
    search:data
  }
  this.empdata.requestCall(AuthEndPoints.SIGNUP_USER__DATA, ApiMethod.POST,payload).subscribe((result) =>{
    this.userData = result.data;
  });
}



filterUserDate(data?: any) {
  this.empdata.requestCall(AuthEndPoints.REGISTER_USER, ApiMethod.POST, data).subscribe((result) => {
    this.filterData=result.data;
    console.log(this.filterData)
  });
}



subMember(member?: any) {
  console.log(member);
  this.selectedMemberType = member;
  if (this.selectedMemberType == "3") {
    const payload = { catid: 3 };   
    this.empdata.requestCall(AuthEndPoints.SubUserCategory, ApiMethod.POST, payload).subscribe((result: any) => {
        this.filterSubData = result?.data;
        console.log(this.filterSubData);
      });
  }
}



}
