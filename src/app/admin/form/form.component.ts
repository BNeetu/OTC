import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formdata: FormGroup;
  formData= new FormData();

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

    this.formdata = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      language1: ['', Validators.required],
      language2: ['', Validators.required],
      language3: ['', Validators.required],
      language4: ['', Validators.required],
      resume: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.http.get<any>('http://127.0.0.1:8000/get_all_data').subscribe(
      (response) => {
        console.log('API Response:', response);
        // this.router.navigate(['/home']);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.formData.append('resume', file);
    // this.formdata.get('resume')?.setValue(file.name);
  }

  onSubmit() {
    const selectedLanguages = [];
    if (this.formdata.get('language1')?.value) {
      selectedLanguages.push('python');
    }
    if (this.formdata.get('language2')?.value) {
      selectedLanguages.push('c++');
    }
    if (this.formdata.get('language3')?.value) {
      selectedLanguages.push('java');
    }
    if (this.formdata.get('language4')?.value) {
      selectedLanguages.push('css');
    }

    this.formData.append('name', this.formdata.get('name')?.value);
    this.formData.append('email', this.formdata.get('email')?.value);
    this.formData.append('age', this.formdata.get('age')?.value);
    this.formData.append('dob', this.formdata.get('dob')?.value);
    this.formData.append('password', this.formdata.get('password')?.value);
    this.formData.append('cpassword', this.formdata.get('cpassword')?.value);
    this.formData.append('language', String(selectedLanguages));

    this.http.post('http://127.0.0.1:8000/users', this.formData).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
}

