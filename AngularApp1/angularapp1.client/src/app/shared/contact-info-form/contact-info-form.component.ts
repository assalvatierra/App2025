import { Component, inject, Input } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact-info-form',
  templateUrl: './contact-info-form.component.html',
  styleUrl: './contact-info-form.component.css',
  standalone: false
})
export class ContactInfoFormComponent {

  @Input() modelData: any;

  public dataForm: any;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.setFormData(this.modelData);
  }

  private initForm() {
    this.dataForm = this.fb.group({
      contactNo1: '',
      contactNo2: '',
      email1: '',
      email2: '',
      address1: '',
      address2: ''
    });
  }

  public setFormData(param: any) {
    this.dataForm.patchValue(param);
  }


}
