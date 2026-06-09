import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiJobOrderService } from '../../../core/services/client/api-job-order.service';

@Component({
  selector: 'app-client-job-main-form',
  standalone: false,
  templateUrl: './client-job-main-form.component.html',
  styleUrl: './client-job-main-form.component.css'
})
export class ClientJobMainFormComponent implements OnInit, OnChanges {

  @Input() recordGuid: string = '';

  public jobOrder: any = null;
  public dataloading: boolean = false;
  public errorMessage: string = '';

  constructor(
    private apiJobOrderService: ApiJobOrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeGuid = this.route.snapshot.paramMap.get('recordId');
    if (routeGuid) {
      this.recordGuid = routeGuid;
      this.loadJobOrder();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recordGuid'] && this.recordGuid) {
      this.loadJobOrder();
    }
  }

  private loadJobOrder(): void {
    this.dataloading = true;
    this.errorMessage = '';
    this.jobOrder = null;

    this.apiJobOrderService.getJobMainByRecordGuid(this.recordGuid).subscribe({
      next: (data) => {
        this.jobOrder = data;
        this.dataloading = false;
      },
      error: (err) => {
        console.error('Failed to load job order:', err);
        this.errorMessage = 'Failed to load job order. Please try again.';
        this.dataloading = false;
      }
    });
  }
}
