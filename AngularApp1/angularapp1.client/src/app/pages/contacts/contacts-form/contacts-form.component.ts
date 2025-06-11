import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactInfoFormComponent } from '../../../shared/contact-info-form/contact-info-form.component';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.css',
  standalone: false
})
export class ContactsFormComponent implements AfterViewInit {
  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  @ViewChild('ContactForm') contactInfo!: ContactInfoFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn:  boolean = false;
  public TitleInfo: string = 'Edit Contact Form';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    if(this.paramId != 0) {
      this.TitleInfo = 'Edit Contact Form';
      this.retrieveApiData(this.paramId);
    }

    if(this.paramId == 0) {
      this.TitleInfo = 'Add New Contact Form';
      this.SetDefaultData();

      this.dataloading = false;
      this.ShowAddBtn = true;
    }

  }

  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    alert('Contact updated!');
    this.router.navigate(['/contacts']);
  }

  onAdd(): void{
    //console.log('adding new city...');
    this.updateCurrentDataValues();
    console.log(this.currentData)
    //this.addApiData(this.currentData)
    alert('contacts Added!');
    //this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }


  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getContact(paramId)
      .subscribe({
        next: (res: any) => {
          this.initializeData(res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private updateCurrentDataValues(): void {
    if (this.entityInfo && this.entityInfo.modelData) {
      this.currentData.name = this.entityInfo.dataForm.get('name')?.value;
    }

    if (this.contactInfo && this.contactInfo.modelData) {
      this.currentData.contactNo1 = this.contactInfo.dataForm.get('contactNo1')?.value;
      this.currentData.contactNo2 = this.contactInfo.dataForm.get('contactNo2')?.value;
      this.currentData.email1 = this.contactInfo.dataForm.get('email1')?.value;
      this.currentData.email2 = this.contactInfo.dataForm.get('email2')?.value;
      this.currentData.address1 = this.contactInfo.dataForm.get('address1')?.value;
      this.currentData.address2 = this.contactInfo.dataForm.get('address2')?.value;
    }
  }

  private updateApiData(paramId: number, data: any): void {
    // this.api.updateContact(paramId, data).subscribe();
    this.dataloading = true;
    this.api.updateContact(this.paramId, data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });

  }

  private addApiData(data: any): void {
    this.dataloading = true;
    this.api.addContact(data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private initializeData(data: any): void {
    this.currentData = data;
  }

  
  private SetDefaultData(){
    this.currentData = {
      id: 0,
      name: ['', Validators.required],
      contactNo1: '',
      contactNo2: '',
      email1: '',
      email2: '',
      address1: '',
      address2: ''
    };

  }

}
