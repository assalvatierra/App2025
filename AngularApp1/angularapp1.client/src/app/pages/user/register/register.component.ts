import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  onSubmit(){
    // Implement registration logic here
    console.log('Registration form submitted');
    // You can call a service to handle registration
    // this.authService.register(this.registrationForm.value).subscribe(...);
  }
}
