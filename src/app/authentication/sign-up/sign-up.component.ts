import { Component } from '@angular/core';
import { EmployeedataService } from 'src/app/service/employeedata.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { passwordMatch } from 'src/app/matchPassword';
import { ApiMethod, AuthEndPoints } from 'src/app/constant/ApiMethod';
import { Observable, forkJoin } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Router} from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  title = 'SignupApp';

  token_no: any;

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*                            THIS IS THE CODE FOR SHOWING  PASSWORD */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*                                  THIS IS THE CODE FOR VALIDATE THE FORM*/
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  SignUpform = new FormGroup(
    {
      first_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      mobileno: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required]),
      orgname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
      user_category_id: new FormControl('', [Validators.required]),
      // referral_id: new FormControl(''),
      user_sub_category_id: new FormControl('', [Validators.required]),
      tokenNo: new FormControl(''),
    },
    { validators: passwordMatch('password', 'password_confirmation') }
  );

  formSubmitted: boolean = false;

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*          FOR INVALID INPUT FIELD FOR SHOWING ERROR BELOW THE INPUT FIELD */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  get first_name() {
    return this.SignUpform.get('first_name');
  }
  get last_name() {
    return this.SignUpform.get('last_name');
  }
  get email() {
    return this.SignUpform.get('email');
  }
  get orgname() {
    return this.SignUpform.get('orgname');
  }
  get mobileno() {
    return this.SignUpform.get('mobileno');
  }

  get password() {
    return this.SignUpform.get('password');
  }
  get password_confirmation() {
    return this.SignUpform.get('password_confirmation');
  }

  // get members() {
  //   return this.SignUpform.get('members');
  // }
  // get subMembers() {
  //   return this.SignUpform.get('subMembers');
  // }

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*                             THIS IS THE CODE FOR SHOWING  MEMBERS */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  members: any;
  newMembers: any;

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*                                      END                                     */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*                        THIS IS THE CODE FOR SHOWING  SUBMEMBERS */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  termsAccepted: boolean = false;
  subMembers: any;
  selectedMemberType: number = 0;

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*                                  END                                     */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  data: Observable<any[]>[] = [];

  constructor(
    private empdata: EmployeedataService, private recaptchaV3Service: ReCaptchaV3Service,private router : Router
  ) {}

  ngOnInit(): void {
    this.fetchMemberCat();
    this.requestDataFromMultipleSources().subscribe((responseList) => {
      console.log('responseList');
      console.log(responseList[0]);
      this.token_no = responseList[0];
      this.SignUpform.controls['tokenNo'].setValue(this.token_no);
    });
  }
  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.recaptchaV3Service.execute('importantAction');
    return forkJoin([response1]);
  }

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*                    THIS IS THE CODE FOR SHOWING  MEMBERS */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  fetchMemberCat(data?: any) {
    this.empdata
      .requestCall(AuthEndPoints.REGISTER_USER, ApiMethod.POST, data)
      .subscribe((result) => {
        this.members = result;
        this.newMembers = this.members.data;
        console.log(this.newMembers);
      });
  }

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /*                                END                                     */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
      /*          THIS IS THE CODE FOR SHOWING  SUBMEMBERS */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

  onChange(member: any) {
    this.SignUpform.controls['user_category_id'].setValue(
      // *****  we are using this for showing the members  in console
      member.id // *****  we are using this for showing the members  in console
    );
    this.selectedMemberType = member.id;
    if (this.selectedMemberType === 3) {
      const payload = { catid: 3 };
      this.empdata
        .requestCall(AuthEndPoints.SubUserCategory, ApiMethod.POST, payload)
        .subscribe((result: any) => {
          this.subMembers = result?.data;
        });
    }
  }

  onChanges(subMember: any) {
    // ***** we are using this for showing the sub members data in the console
    this.SignUpform.controls['user_sub_category_id'].setValue(
      // *****  we are using this for showing the members  in console
      subMember.id // *****  we are using this for showing the members  in console
    );
  }

  
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  /* SUBMIT FORM DATA   */
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  submitFormData(userData?: any) {
    console.log(userData);
    this.formSubmitted = true;

    this.empdata
      .requestCall(AuthEndPoints.Sign_Up, ApiMethod.POST, userData).subscribe((result: any) => {
        console.warn(result);
        localStorage.setItem('res',result.description); //we stored the data in descriptor in localStorage
        localStorage.setItem('refId',result.reference)
        
        this.router.navigate(['otp-verification']) 

      });
  }
  

}


/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
/*                          END                                     */
/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
