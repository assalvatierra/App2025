import { Component, inject, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  standalone: false,
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})
export class EntityFormComponent implements AfterViewInit {

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
      name: ['', Validators.required],
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0
    });
  }

  public setFormData(param: any) {
    this.dataForm.patchValue(param);
    console.log('entity form data:');
    console.log(param);
  }


}
