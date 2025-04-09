import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.css',
  standalone: false
})
export class CountryFormComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    name: ['', Validators.required],
    description: '',
    remarks: '',
    code: '',
    sortOrder: 0
  });

  hasUnitNumber = false;

   constructor(private api: ApiService, private router: Router) {
    this.retrieveData();
  }

  onSubmit(): void {
    alert('Thanks!');
    this.addressForm.controls['name'].setValue ('test');
    debugger;
  }
  
  private retrieveData(): void {
    this.api.getCountry(2)
      .subscribe((res: any) => {
        this.addressForm.patchValue(res);
      });
  }    
}
