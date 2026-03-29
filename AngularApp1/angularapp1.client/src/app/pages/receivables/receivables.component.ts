import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceivableListComponent } from './receivable-list/receivable-list.component';
import { ReceivableFormComponent } from './receivable-form/receivable-form.component';
import { ReceivableDataService } from './receivable-service/receivable-data.service';
import { Receivable } from '../../core/models/receivable.model';

@Component({
  selector: 'app-receivables',
  standalone: true,
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.css'],
  imports: [CommonModule, ReceivableListComponent, ReceivableFormComponent],
  providers: [ReceivableDataService]
})
export class ReceivablesComponent implements OnInit {
  
  public currentView: 'list' | 'form' = 'list';
  public receivables: Receivable[] = [];
  public selectedReceivable: Receivable | null = null;
  public dataloading: boolean = true;
  public entities: any[] = [];

  constructor(private receivableDataService: ReceivableDataService) { }

  ngOnInit(): void {
    this.receivableDataService.loadEntities();
    this.receivableDataService.loadReceivables();
    this.dataloading = this.receivableDataService.dataloading;
    
    // Subscribe to data changes
    this.receivableDataService.receivables$.subscribe(data => {
      this.receivables = data;
      this.dataloading = false;
    });

    this.receivableDataService.entities$.subscribe(data => {
      this.entities = data;
    });

    this.receivableDataService.loading$.subscribe(loading => {
      this.dataloading = loading;
    });
  }

  /**
   * Handle add record button click
   */
  onAddRecord(): void {
    this.selectedReceivable = null;
    this.currentView = 'form';
  }

  /**
   * Handle edit record
   * @param receivableId Receivable ID to edit
   */
  onEditRecord(receivableId: number): void {
    this.receivableDataService.loadReceivable(receivableId).subscribe(
      (receivable) => {
        this.selectedReceivable = receivable;
        this.currentView = 'form';
      }
    );
  }

  /**
   * Handle delete record
   * @param receivableId Receivable ID to delete
   */
  onDeleteRecord(receivableId: number): void {
    if (confirm('Are you sure you want to delete this receivable?')) {
      this.receivableDataService.deleteReceivable(receivableId).subscribe(() => {
        this.receivableDataService.loadReceivables();
      });
    }
  }

  /**
   * Handle archive record
   * @param receivableId Receivable ID to archive
   */
  onArchiveRecord(receivableId: number): void {
    if (confirm('Are you sure you want to archive this receivable?')) {
      this.receivableDataService.archiveReceivable(receivableId).subscribe(() => {
        this.receivableDataService.loadReceivables();
      });
    }
  }

  /**
   * Handle activate record
   * @param receivableId Receivable ID to activate
   */
  onActivateRecord(receivableId: number): void {
    this.receivableDataService.activateReceivable(receivableId).subscribe(() => {
      this.receivableDataService.loadReceivables();
    });
  }

  /**
   * Handle save from form
   * @param receivable Receivable data to save
   */
  onSaveRecord(receivable: Receivable): void {
    if (receivable.id) {
      this.receivableDataService.updateReceivable(receivable.id, receivable).subscribe(() => {
        this.currentView = 'list';
        this.receivableDataService.loadReceivables();
      });
    } else {
      this.receivableDataService.addReceivable(receivable).subscribe(() => {
        this.currentView = 'list';
        this.receivableDataService.loadReceivables();
      });
    }
  }

  /**
   * Handle cancel from form
   */
  onCancelForm(): void {
    this.selectedReceivable = null;
    this.currentView = 'list';
  }
}
