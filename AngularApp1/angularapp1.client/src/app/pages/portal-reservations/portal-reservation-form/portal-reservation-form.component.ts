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
    this.router.navigate(['/portal-reservations']);
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
        },
        error: (err: any) => {
          console.error('API Error:', err);
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
    this.currentData.transactionType = this.dataForm.get('transactionType')?.value;
    this.currentData.portalItemId = this.dataForm.get('portalItemId')?.value;
    this.currentData.customerName = this.dataForm.get('customerName')?.value;
    this.currentData.contactNo = this.dataForm.get('contactNo')?.value;
    this.currentData.contactEmail = this.dataForm.get('contactEmail')?.value;
    this.currentData.dateReceived = this.dataForm.get('dateReceived')?.value;
    this.currentData.status = this.dataForm.get('status')?.value;

    const reservationData: PortalReservationData = {
      pickupLocation: this.dataForm.get('pickupLocation')?.value,
      pickupInfo: this.dataForm.get('pickupInfo')?.value,
      pickupDate: this.dataForm.get('pickupDate')?.value,
      pickupTime: this.dataForm.get('pickupTime')?.value,
      destinationArea: this.dataForm.get('destinationArea')?.value,
      destinationInfo: this.dataForm.get('destinationInfo')?.value,
      numberOfDays: this.dataForm.get('numberOfDays')?.value,
      calculatedCost: this.dataForm.get('calculatedCost')?.value,
      baseRate: this.dataForm.get('baseRate')?.value,
      baseCurrency: this.dataForm.get('baseCurrency')?.value
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
}
