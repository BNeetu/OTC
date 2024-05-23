import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formData: any[] = [];
  totalItems: number = 0;
  searchName: string = '';
  searchForm: FormGroup;
  data: any;

  userForm: FormGroup; 
  filterform: FormGroup;

  file: FormData = new FormData();
  editFile: FormData = new FormData();

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      resume: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      language1: new FormControl('', [Validators.required]),
      language2: new FormControl('', [Validators.required]),
      language3: new FormControl('', [Validators.required]),
      language4: new FormControl('', [Validators.required]),
      language5: new FormControl('', [Validators.required]),
      dob: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });

    this.filterform = this.formBuilder.group({
      name: [''],
      email: [''],
      age: [''],
      dob: ['']
    });
  }

  ngOnInit(): void {
    this.getAllFormData();
  }

  get search() {
    return this.searchForm.get('search');
  }

  page: number = 1;
  itemPerPage: number = 10;

  changePage(event: number): void {
    this.page = event;
    this.getAllFormData();
  }

  getAllFormData() {
    this.httpClient.get(`http://127.0.0.1:8000/get_all_data`).subscribe(
      (response: any) => {
        console.log(response, "///////////////////////////////////////////////////////s")
        this.formData = response;
      },
      (error) => {
        console.error('Error fetching paginated form data:', error);
      }
    );
  }

  userId: any;

  editData(user:any): void {
    this.userId = user.id;
    console.log('Edit user ID:', this.userId,"**************************/////////////////////////"); // Add this line
    this.userForm.patchValue(user);
  }


  upload(event: any) {
    const file = event.target.files[0];
    this.file.append('resume', file);
    this.editFile.append('resume', file);
  }

  onSubmit() {
    const selectedLanguages = [];
    if (this.userForm.get('language1')?.value) {
      selectedLanguages.push('python');
    }
    if (this.userForm.get('language2')?.value) {
      selectedLanguages.push('c++');
    }
    if (this.userForm.get('language3')?.value) {
      selectedLanguages.push('java');
    }
    if (this.userForm.get('language4')?.value) {
      selectedLanguages.push('css');
    }
    if (this.userForm.get('language5')?.value) {
      selectedLanguages.push('javascript');
    }

    const languageString = selectedLanguages.join(', ');

    this.file.append('name', this.userForm.get('name')?.value);
    this.file.append('email', this.userForm.get('email')?.value);
    this.file.append('age', this.userForm.get('age')?.value);
    this.file.append('language', languageString);
    this.file.append('password', this.userForm.get('password')?.value);
    this.file.append('cpassword', this.userForm.get('cpassword')?.value);
    this.file.append('dob', this.userForm.get('dob')?.value);

    this.httpClient.post<any>('http://127.0.0.1:8000/users', this.file).subscribe(
      (response: any) => {
        console.log('Edit form response:', response);
        this.getAllFormData(); // Refresh the data after submission
      },

    );
  }


  deleteReq(id: number): void {
    this.httpClient.post(`http://127.0.0.1:8000/delete_user/${id}`, {}).subscribe(
      (result: any) => {
        alert("Are you sure you want to delete this data?")
        this.getAllFormData(); // Refresh the data after deletion
      },
    );
  }
  editItemId: any = null;

  editReqData() {
    const selectedLanguages = [];
    if (this.userForm.get('language1')?.value) {
      selectedLanguages.push('python');
    }
    if (this.userForm.get('language2')?.value) {
      selectedLanguages.push('c++');
    }
    if (this.userForm.get('language3')?.value) {
      selectedLanguages.push('java');
    }
    if (this.userForm.get('language4')?.value) {
      selectedLanguages.push('css');
    }
    if (this.userForm.get('language5')?.value) {
      selectedLanguages.push('javascript');
    }

    const languageString = selectedLanguages.join(', ');

    this.editFile.append('name', this.userForm.get('name')?.value);
    this.editFile.append('email', this.userForm.get('email')?.value);
    this.editFile.append('age', this.userForm.get('age')?.value);
    this.editFile.append('language', languageString);
    this.editFile.append('password', this.userForm.get('password')?.value);
    this.editFile.append('cpassword', this.userForm.get('cpassword')?.value);
    this.editFile.append('dob', this.userForm.get('dob')?.value);

  

    this.httpClient.post(`http://127.0.0.1:8000/users_update/${this.userId}`, this.editFile).subscribe(
      (response: any) => {
        console.log('Update response***********************:', response);
        alert('Data updated successfully!');
        this.userForm.reset();
       
        this.getAllFormData();
      },
      (error) => {
        console.error('Update error:', error);
      }
    );
  }


  downloadResume(userId: number) {
    this.httpClient.get(`http://127.0.0.1:8000/download_resume/${userId}`, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf'; // Or you can use the actual file name from the backend response if it's included
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading the file:', error);
      });
  }
}  

