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
    //city: [null, Validators.required],
    //state: [null, Validators.required],
    //postalCode: [null, Validators.compose([
    //  Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    //],
    //shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];
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
        // Assuming res has a structure matching the template structure
        // above, e.g.:
        // res = {
        //     field1: "some-string",
        //     field2: "other-string",
        //     subgroupName: {
        //         subfield2: "another-string"
        //     },
        // }
        // Values in res that don't line up to the form structure
        // are discarded. You can also pass in your own object you
        // construct ad-hoc.
        this.addressForm.patchValue(res);
      });
  }    
}
