import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactInfoFormComponent } from '../../../shared/contact-info-form/contact-info-form.component';
import { TREE_KEY_MANAGER_FACTORY_PROVIDER } from '@angular/cdk/a11y';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.css',
  standalone: false
})
export class ContactsFormComponent implements AfterViewInit {
  @ViewChild('ContactForm') contactInfo!: ContactInfoFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn:  boolean = false;
  public TitleInfo: string | undefined;
  public dataFormName: any;
  public itemStatusLookupData: any[] = [];
  public itemTypeLookupData: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    
    this.dataFormName = this.fb.group({
      name: new FormControl(),
      statusId: new FormControl(0),
      typeId: new FormControl(1)
    });

  }

  ngAfterViewInit(): void {
    console.log("Initialize...");

  }


  ngAfterContentInit(): void {
    console.log("After Initialize...");
   
//    this.dataFormName.patchValue({
//      name: "john doe"
//    });   

  this.getApiItemStatusLookupData();
  this.getApiItemTypeLookupData();

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
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));


    if(this.paramId == 0) {
      this.onAdd();
    }else{
      this.TitleInfo = 'Edit Contact Form';
      this.updateCurrentDataValues();
      this.updateApiData(this.paramId, this.currentData);
      //alert('Contact updated!');
      this.router.navigate(['/contacts']);
    }
  }

  onAdd(): void{

    this.TitleInfo = 'Add New Contact Form';
    this.SetDefaultData();

    this.dataloading = false;
    this.ShowAddBtn = true;

    //console.log('onAdd contact name...');
    //console.log(this.dataFormName.get('name').value);

    this.updateCurrentDataValues();
    //console.log('currentData before adding...');
    //console.log(this.currentData)

    this.addApiData(this.currentData)
    //alert('contacts Added!');
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
   
      console.log("updating contact name...");
      this.currentData.name = this.dataFormName.get('name')?.value;
    this.currentData.statusId = this.dataFormName.get('statusId')?.value;
    this.currentData.typeId = this.dataFormName.get('typeId')?.value;
    
      console.log("updating contact...");
      this.currentData.contactNo1 = this.contactInfo.dataForm.get('contactNo1')?.value;
      this.currentData.contactNo2 = this.contactInfo.dataForm.get('contactNo2')?.value;
      this.currentData.email1 = this.contactInfo.dataForm.get('email1')?.value;
      this.currentData.email2 = this.contactInfo.dataForm.get('email2')?.value;
      this.currentData.address1 = this.contactInfo.dataForm.get('address1')?.value;
      this.currentData.address2 = this.contactInfo.dataForm.get('address2')?.value;
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
    this.currentData = {
      ...data,
      name: data?.name ?? data?.Name ?? '',
      statusId: data?.statusId ?? data?.StatusId ?? 0,
      typeId: data?.typeId ?? data?.typeId ?? 0
    };
    this.dataFormName.patchValue({
      name: this.currentData.name,
      statusId: this.currentData.statusId,
      typeId: this.currentData.typeId
    });   
    this.contactInfo.setFormData(this.currentData);
  }

  private getApiItemStatusLookupData(): void {
    this.dataloading = true;
    this.api.getItemStatusesByClassName('CONTACT')
      .subscribe({
        next: (res: any) => {
          this.itemStatusLookupData = res || [];
        },
        error: (err) => {
          console.error('API Error (ItemStatuses):', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private getApiItemTypeLookupData(): void {
    this.dataloading = true;
    this.api.getItemTypesByClassName('CONTACT')
      .subscribe({
        next: (res: any) => {
          this.itemTypeLookupData = res || [];
        },
        error: (err) => {
          console.error('API Error (ItemTypes):', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  
  private SetDefaultData(){
    var today = new Date();
    var todayFormatted = today.toISOString();
    this.currentData = {
      Id: 0,
      Name: '',
      ContactNo1: '',
      ContactNo2: '',
      Email1: '',
      Email2: '',
      Address1: '',
      Address2: '',
      Remarks: '',
      CreatedBy: 'admin',
      CreatedOn: todayFormatted,
      LastEditBy: 'admin',
      LastEditOn: todayFormatted,
      IsArchived: false,
      IsPrivate: false,
      IsActive: true,
      StatusId: 1
    };

    this.dataFormName.patchValue({
      name: this.currentData.Name,
      statusId: this.currentData.StatusId,
      typeId: this.currentData.typeId ?? 0
    });``

  }

}
