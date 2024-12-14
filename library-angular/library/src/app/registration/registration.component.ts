// src/app/registration/registration.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  formData = {
    name: '',
    rollNo: '',
    department: ''
  };

  submitForm() {
    alert("Form Submitted successfully !!!")
    alert('Form Data: \n' + this.formData.name + '\n' + this.formData.rollNo + '\n' + this.formData.department);
  }
}
