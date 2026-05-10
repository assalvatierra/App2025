import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ApiResourceRatesService } from '../../../core/services/api-resource-rates.service';
import { ResourceRate } from '../../../core/models/resource-rate.model';
import { ResourceRateDialogComponent, ResourceRateDialogData } from './resource-rate-dialog/resource-rate-dialog.component';

@Component({
  selector: 'app-resource-rate',
  standalone: true,
  templateUrl: './resource-rate.component.html',
  styleUrls: ['./resource-rate.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ResourceRateComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() resourceId?: number;

  public resourceRates: ResourceRate[] = [];
  public displayedColumns: string[] = ['validFrom', 'validTo', 'daily', 'hourly', 'monthly', 'percent', 'otRate', 'isActive', 'actions'];
  public loading: boolean = false;
  public dataSource: MatTableDataSource<ResourceRate> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiResourceRatesService: ApiResourceRatesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.resourceId) {
      this.loadResourceRates();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resourceId'] && changes['resourceId'].currentValue) {
      this.loadResourceRates();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  private loadResourceRates(): void {
    if (!this.resourceId) return;
    this.loading = true;
    this.apiResourceRatesService.getResourceRatesByResource(this.resourceId).subscribe({
      next: (rates) => {
        this.dataSource.data = [...rates].sort((a, b) => {
          const dateA = new Date(a.validFrom).getTime();
          const dateB = new Date(b.validFrom).getTime();
          if (dateA !== dateB) return dateA - dateB;
          const dateToA = new Date(a.validTo).getTime();
          const dateToB = new Date(b.validTo).getTime();
          return dateToA - dateToB;
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading resource rates:', error);
        this.snackBar.open('Error loading resource rates', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  public onAdd(): void {
    if (!this.resourceId) {
      this.snackBar.open('Resource ID is required', 'Close', { duration: 3000 });
      return;
    }

    const dialogData: ResourceRateDialogData = {
      resourceId: this.resourceId
    };

    const dialogRef = this.dialog.open(ResourceRateDialogComponent, {
      width: '860px',
      maxWidth: '95vw',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadResourceRates();
      }
    });
  }

  public onEdit(rate: ResourceRate): void {
    if (!this.resourceId) {
      this.snackBar.open('Resource ID is required', 'Close', { duration: 3000 });
      return;
    }

    const dialogData: ResourceRateDialogData = {
      resourceId: this.resourceId,
      resourceRate: rate
    };

    const dialogRef = this.dialog.open(ResourceRateDialogComponent, {
      width: '860px',
      maxWidth: '95vw',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadResourceRates();
      }
    });
  }

  public onDelete(rate: ResourceRate): void {
    if (confirm('Are you sure you want to delete this resource rate?')) {
      this.loading = true;
      this.apiResourceRatesService.deleteResourceRate(rate.id).subscribe({
        next: () => {
          this.snackBar.open('Resource rate deleted successfully', 'Close', { duration: 3000 });
          this.loadResourceRates();
        },
        error: (error) => {
          console.error('Error deleting resource rate:', error);
          this.snackBar.open('Error deleting resource rate', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  public formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  public formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
}
