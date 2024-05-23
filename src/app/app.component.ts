import { Component, OnInit } from '@angular/core';
import { EmployeedataService } from './service/employeedata.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatch } from './matchPassword';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SignupApp';

}