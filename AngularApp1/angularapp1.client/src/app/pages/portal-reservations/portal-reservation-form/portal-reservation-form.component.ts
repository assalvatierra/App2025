import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ApiPortalReservationsService } from '../../../core/services/api-portal-reservations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';
import { PortalReservationDto, PortalReservationData } from '../../../core/models/portal-reservation.model';

@Component({
  selector: 'app-portal-reservation-form',
  standalone: false,
  templateUrl: './portal-reservation-form.component.html',
  styleUrl: './portal-reservation-form.component.css'
})
export class PortalReservationFormComponent implements AfterViewInit {

  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: PortalReservationDto | any;
  public dataForm: FormGroup;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public showAddBtn: boolean = false;
  public titleInfo: string;

  // Status filter options
  public statusOptions: string[] = ['New', 'Pending', 'Discarded', 'NoUnit', 'InProgress'];

  // Message properties
  public updateMessage: string = '';
  public showUpdateMessage: boolean = false;
  public isUpdateSuccess: boolean = false;

  constructor(
    private api: ApiPortalReservationsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.dataForm = this.fb.group({
      transactionType: new FormControl('', [Validators.required]),
      portalItemId: new FormControl(),
      customerName: new FormControl('', [Validators.required]),
      contactNo: new FormControl(),
      contactEmail: new FormControl(),
      dateReceived: new FormControl(),
      status: new FormControl(''),
      // Nested ReservationData fields
      pickupLocation: new FormControl(),
      pickupInfo: new FormControl(),
      pickupDate: new FormControl(),
      pickupTime: new FormControl(),
      destinationArea: new FormControl(),
      destinationInfo: new FormControl(),
      numberOfDays: new FormControl(),
      calculatedCost: new FormControl(),
      baseRate: new FormControl(),
      baseCurrency: new FormControl()
    });

    this.titleInfo = 'Add New Portal Reservation';
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    if (this.paramId !== 0) {
      this.titleInfo = 'Edit Portal Reservation';
      this.retrieveApiData(this.paramId);
    }

    if (this.paramId === 0) {
      this.titleInfo = 'Add New Portal Reservation';
      this.setDefaultData();
      this.dataloading = false;
      this.showAddBtn = true;
    }
  }

  /* Event Handlers */
  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    //this.router.navigate(['/portal-reservations']);
  }

  onAdd(): void {
    this.updateCurrentDataValues();
    this.addApiData(this.currentData);
    this.router.navigate(['/portal-reservations']);
  }

  onCancel(): void {
    this.router.navigate(['/portal-reservations']);
  }

  /* API Calls */
  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getById(paramId)
      .subscribe({
        next: (res: PortalReservationDto) => {
          this.initializeData(res);
        },
        error: (err: any) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private updateApiData(id: number, data: PortalReservationDto): void {
    this.dataloading = true;
    this.api.update(id, data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
          this.showSuccessMessage('Reservation Updated');
        },
        error: (err: any) => {
          console.error('API Error:', err);
          this.showErrorMessage('Update failed');
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private addApiData(data: PortalReservationDto): void {
    this.dataloading = true;
    this.api.add(data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
        },
        error: (err: any) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  /* Methods */
  private initializeData(param: PortalReservationDto): void {
    this.currentData = param;
    this.populateForm(param);
    this.disableAllFieldsExceptStatus();
  }

  private populateForm(data: PortalReservationDto): void {
    this.dataForm.patchValue({
      transactionType: data.transactionType,
      portalItemId: data.portalItemId,
      customerName: data.customerName,
      contactNo: data.contactNo,
      contactEmail: data.contactEmail,
      dateReceived: data.dateReceived,
      status: data.status
    });

    if (data.reservationData) {
      this.dataForm.patchValue({
        pickupLocation: data.reservationData.pickupLocation,
        pickupInfo: data.reservationData.pickupInfo,
        pickupDate: data.reservationData.pickupDate,
        pickupTime: data.reservationData.pickupTime,
        destinationArea: data.reservationData.destinationArea,
        destinationInfo: data.reservationData.destinationInfo,
        numberOfDays: data.reservationData.numberOfDays,
        calculatedCost: data.reservationData.calculatedCost,
        baseRate: data.reservationData.baseRate,
        baseCurrency: data.reservationData.baseCurrency
      });
    }
  }

  private updateCurrentDataValues(): void {
    // Use getRawValue() to get values from both enabled and disabled form controls
    const formValues = this.dataForm.getRawValue();

    this.currentData.transactionType = formValues.transactionType;
    this.currentData.portalItemId = formValues.portalItemId;
    this.currentData.customerName = formValues.customerName;
    this.currentData.contactNo = formValues.contactNo;
    this.currentData.contactEmail = formValues.contactEmail;
    this.currentData.dateReceived = formValues.dateReceived;
    this.currentData.status = formValues.status;

    const reservationData: PortalReservationData = {
      pickupLocation: formValues.pickupLocation,
      pickupInfo: formValues.pickupInfo,
      pickupDate: formValues.pickupDate,
      pickupTime: formValues.pickupTime,
      destinationArea: formValues.destinationArea,
      destinationInfo: formValues.destinationInfo,
      numberOfDays: formValues.numberOfDays,
      calculatedCost: formValues.calculatedCost,
      baseRate: formValues.baseRate,
      baseCurrency: formValues.baseCurrency
    };

    this.currentData.reservationData = reservationData;
  }

  private setDefaultData(): void {
    this.currentData = {
      id: 0,
      transactionType: '',
      customerName: '',
      status: 'Pending',
      reservationData: {}
    };
  }

  private disableAllFieldsExceptStatus(): void {
    const fieldsToDisable = [
      'transactionType', 'portalItemId', 'customerName', 'contactNo', 'contactEmail',
      'dateReceived', 'pickupLocation', 'pickupInfo', 'pickupDate', 'pickupTime',
      'destinationArea', 'destinationInfo', 'numberOfDays', 'calculatedCost',
      'baseRate', 'baseCurrency'
    ];

    fieldsToDisable.forEach(field => {
      this.dataForm.get(field)?.disable();
    });
  }

  private showSuccessMessage(message: string): void {
    this.updateMessage = message;
    this.isUpdateSuccess = true;
    this.showUpdateMessage = true;
    this.autoHideMessage();
  }

  private showErrorMessage(message: string): void {
    this.updateMessage = message;
    this.isUpdateSuccess = false;
    this.showUpdateMessage = true;
    this.autoHideMessage();
  }

  private autoHideMessage(): void {
    setTimeout(() => {
      this.showUpdateMessage = false;
    }, 3000); // Hide message after 3 seconds
  }
}
