import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ContactInfoFormComponent } from '../../../shared/contact-info-form/contact-info-form.component';
import { ContactDataService } from '../services/contact-data.service';
import { ApiService } from '../../../core/api.service';
import { Contact } from '../../../core/models/contact.model';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.css',
  standalone: false
})
export class ContactsFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ContactForm') contactInfo!: ContactInfoFormComponent;
  
  public currentData: Contact | null = null;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn: boolean = false;
  public TitleInfo: string | undefined;
  public dataFormName: FormGroup;
  public itemStatusLookupData: any[] = [];
  public itemTypeLookupData: any[] = [];
  public citiesLookupData: any[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(
    private contactDataService: ContactDataService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.dataFormName = this.fb.group({
      name: new FormControl(''),
      remarks: new FormControl(''),
      statusId: new FormControl(1),
      typeId: new FormControl(1),
      refCityId: new FormControl<number | undefined>(undefined),
      isActive: new FormControl(true),
      isPrivate: new FormControl(false),
      isArchived: new FormControl(false)
    });
  }

  ngAfterViewInit(): void {
    console.log("Initialize...");
    
    this.getApiItemStatusLookupData();
    this.getApiItemTypeLookupData();
    this.getApiCitiesLookupData();

    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    if (this.paramId != 0) {
      this.TitleInfo = 'Edit Contact Form';
      this.retrieveApiData(this.paramId);
    } else {
      this.TitleInfo = 'Add New Contact Form';
      this.setDefaultData();
      this.dataloading = false;
      this.ShowAddBtn = true;
    }

    // Subscribe to name field changes to update the display dynamically
    this.dataFormName.get('name')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(name => {
        if (this.currentData) {
          this.currentData.name = name || '';
        }
      });
  }

  ngAfterContentInit(): void {
    console.log("After Initialize...");
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.paramId == 0) {
      this.onAdd();
    } else {
      this.TitleInfo = 'Edit Contact Form';
      this.updateCurrentDataValues();
      this.updateApiData(this.paramId, this.currentData!);
    }
  }

  onAdd(): void {
    this.TitleInfo = 'Add New Contact Form';
    this.updateCurrentDataValues();
    this.addApiData(this.currentData!);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.contactDataService.loadContact(paramId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Contact) => {
          this.initializeData(res);
        },
        error: (err) => {
          console.error('API Error:', err);
          alert('Failed to load contact data. Please try again.');
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private updateCurrentDataValues(): void {
    if (!this.currentData) {
      this.currentData = this.createEmptyContact();
    }

    console.log("updating contact name...");
    this.currentData.name = this.dataFormName.get('name')?.value || '';
    this.currentData.remarks = this.dataFormName.get('remarks')?.value || '';
    this.currentData.statusId = this.dataFormName.get('statusId')?.value || 1;
    this.currentData.typeId = this.dataFormName.get('typeId')?.value || 1;
    this.currentData.refCityId = this.dataFormName.get('refCityId')?.value || undefined;
    this.currentData.isActive = this.dataFormName.get('isActive')?.value ?? true;
    this.currentData.isPrivate = this.dataFormName.get('isPrivate')?.value ?? false;
    this.currentData.isArchived = this.dataFormName.get('isArchived')?.value ?? false;
    
    console.log("updating contact...");
    this.currentData.contactNo1 = this.contactInfo.dataForm.get('contactNo1')?.value || '';
    this.currentData.contactNo2 = this.contactInfo.dataForm.get('contactNo2')?.value || '';
    this.currentData.email1 = this.contactInfo.dataForm.get('email1')?.value || '';
    this.currentData.email2 = this.contactInfo.dataForm.get('email2')?.value || '';
    this.currentData.address1 = this.contactInfo.dataForm.get('address1')?.value || '';
    this.currentData.address2 = this.contactInfo.dataForm.get('address2')?.value || '';
  }

  private updateApiData(paramId: number, data: Contact): void {
    this.dataloading = true;
    this.contactDataService.updateContact(paramId, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          console.log('Contact updated successfully:', res);
          alert('Contact updated successfully!');
          this.router.navigate(['/contacts']);
        },
        error: (err) => {
          console.error('API Error:', err);
          alert('Failed to update contact. Please try again.');
          this.dataloading = false;
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private addApiData(data: Contact): void {
    this.dataloading = true;
    this.contactDataService.addContact(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Contact) => {
          console.log('Contact added successfully:', res);
          alert('Contact added successfully!');
          this.router.navigate(['/contacts']);
        },
        error: (err) => {
          console.error('API Error:', err);
          alert('Failed to add contact. Please try again.');
          this.dataloading = false;
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private initializeData(data: Contact): void {
    this.currentData = {
      ...data,
      name: data.name || '',
      remarks: data.remarks || '',
      statusId: data.statusId || 1,
      typeId: data.typeId || 1,
      refCityId: data.refCityId || undefined,
      isActive: data.isActive ?? true,
      isPrivate: data.isPrivate ?? false,
      isArchived: data.isArchived ?? false
    };
    
    this.dataFormName.patchValue({
      name: this.currentData.name,
      remarks: this.currentData.remarks,
      statusId: this.currentData.statusId,
      typeId: this.currentData.typeId,
      refCityId: this.currentData.refCityId ?? undefined,
      isActive: this.currentData.isActive,
      isPrivate: this.currentData.isPrivate,
      isArchived: this.currentData.isArchived
    });
    
    // Ensure contactInfo is available before calling setFormData
    if (this.contactInfo) {
      this.contactInfo.setFormData(this.currentData);
    } else {
      console.error('ContactInfo component not yet initialized');
    }
  }

  private getApiItemStatusLookupData(): void {
    this.dataloading = true;
    this.api.getItemStatusesByClassName('CONTACT')
      .pipe(takeUntil(this.destroy$))
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
      .pipe(takeUntil(this.destroy$))
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

  private getApiCitiesLookupData(): void {
    this.dataloading = true;
    this.api.getCities()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.citiesLookupData = res || [];
        },
        error: (err) => {
          console.error('API Error (Cities):', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private setDefaultData(): void {
    this.currentData = this.createEmptyContact();

    this.dataFormName.patchValue({
      name: this.currentData.name,
      remarks: this.currentData.remarks,
      statusId: this.currentData.statusId,
      typeId: this.currentData.typeId ?? 1,
      refCityId: this.currentData.refCityId,
      isActive: this.currentData.isActive,
      isPrivate: this.currentData.isPrivate,
      isArchived: this.currentData.isArchived
    });
  }

  private createEmptyContact(): Contact {
    return {
      name: '',
      remarks: '',
      contactNo1: '',
      contactNo2: '',
      email1: '',
      email2: '',
      address1: '',
      address2: '',
      isArchived: false,
      isPrivate: false,
      isActive: true,
      statusId: 1,
      typeId: 1,
      refCityId: undefined
    };
  }
}
