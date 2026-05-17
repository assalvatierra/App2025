import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timesheet } from '../../../../core/models/timesheet.model';
import { PayAddition } from '../../../../core/models/pay-addition.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PayPeriodResourceDetailsComponent } from './pay-period-resource-details/pay-period-resource-details.component';

interface ResourceSummary {
  resourceId: number;
  resourceName: string;
  resourceCode?: string;
  resourceType: 'Resource' | 'Resource1';
  totalRate: number;
  totalAdditionalRate: number;
  totalTimesheets: number;
  additions: number;
  deductions: number;
  total: number;
}

@Component({
  selector: 'app-pay-period-resource-list',
  standalone: true,
  templateUrl: './pay-period-resource-list.component.html',
  styleUrls: ['./pay-period-resource-list.component.css'],
  imports: [CommonModule, MatDialogModule]
})
export class PayPeriodResourceListComponent implements OnInit, OnChanges {
  @Input() linkedTimesheets: Timesheet[] = [];
  @Input() linkedAdditions: PayAddition[] = [];

  resourceSummaries: ResourceSummary[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.calculateResourceSummaries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['linkedTimesheets'] || changes['linkedAdditions']) {
      this.calculateResourceSummaries();
    }
  }

  openDetails(summary: ResourceSummary): void {
    // collect timesheets for this resource
    const timesheets = this.linkedTimesheets.filter(ts => {
      if (summary.resourceType === 'Resource') {
        return ts.resource?.id === summary.resourceId;
      }
      return ts.resourceId1Navigation?.id === summary.resourceId;
    });

    // collect additions for this resource
    const additions = this.linkedAdditions.filter(a => a.resourceId === summary.resourceId);

    this.dialog.open(PayPeriodResourceDetailsComponent, {
      width: '800px',
      data: {
        resourceName: summary.resourceName,
        resourceType: summary.resourceType,
        timesheets,
        additions,
        summary
      }
    });
  }

  private calculateResourceSummaries(): void {
    const resourceMap = new Map<string, ResourceSummary>();

    this.linkedTimesheets.forEach(timesheet => {
      // Process resource (Resource)
      if (timesheet.resource) {
        const resourceKey = `resource_${timesheet.resource.id}_${timesheet.resource.name}`;

        if (!resourceMap.has(resourceKey)) {
          resourceMap.set(resourceKey, {
            resourceId: timesheet.resource.id,
            resourceName: timesheet.resource.name,
            resourceCode: timesheet.resource.code,
            resourceType: 'Resource',
            totalRate: 0,
            totalAdditionalRate: 0,
            totalTimesheets: 0,
            additions: 0,
            deductions: 0,
            total: 0
          });
        }

        const summary = resourceMap.get(resourceKey)!;
        summary.totalRate += timesheet.timesheetExpenseDetail?.resourceRate ?? 0;
        summary.totalAdditionalRate += timesheet.timesheetExpenseDetail?.additionalRate ?? 0;
        summary.totalTimesheets += 1;
      }

      // Process resourceId1Navigation (Resource1)
      if (timesheet.resourceId1Navigation) {
        const resourceKey = `resource1_${timesheet.resourceId1Navigation.id}_${timesheet.resourceId1Navigation.name}`;

        if (!resourceMap.has(resourceKey)) {
          resourceMap.set(resourceKey, {
            resourceId: timesheet.resourceId1Navigation.id,
            resourceName: timesheet.resourceId1Navigation.name,
            resourceCode: timesheet.resourceId1Navigation.code,
            resourceType: 'Resource1',
            totalRate: 0,
            totalAdditionalRate: 0,
            totalTimesheets: 0,
            additions: 0,
            deductions: 0,
            total: 0
          });
        }

        const summary = resourceMap.get(resourceKey)!;
        summary.totalRate += timesheet.timesheetExpenseDetail?.resourceRate1 ?? 0;
        summary.totalAdditionalRate += timesheet.timesheetExpenseDetail?.additionalRate1 ?? 0;
        summary.totalTimesheets += 1;
      }
    });

    // Apply additions to resource summaries
    this.linkedAdditions.forEach(addition => {
      if (addition.resourceId) {
        // Check if resource exists in the map (could be either Resource or Resource1)
        const resourceKey = `resource_${addition.resourceId}_`;
        const resource1Key = `resource1_${addition.resourceId}_`;

        // Find the matching resource key
        let matchingKey: string | null = null;
        for (const key of resourceMap.keys()) {
          if (key.startsWith(resourceKey) || key.startsWith(resource1Key)) {
            matchingKey = key;
            break;
          }
        }

        if (matchingKey) {
          const summary = resourceMap.get(matchingKey)!;
          // Separate additions and deductions
          if (addition.isAdd) {
            summary.additions += addition.amount;
          } else {
            summary.deductions += addition.amount;
          }
        }
      }
    });

    // Calculate totals for each resource
    this.resourceSummaries = Array.from(resourceMap.values()).map(summary => {
      summary.total = summary.totalRate + summary.totalAdditionalRate + summary.additions - summary.deductions;
      return summary;
    }).sort((a, b) => {
      // Sort by resource name first, then by type
      const nameCompare = a.resourceName.localeCompare(b.resourceName);
      if (nameCompare !== 0) return nameCompare;
      return a.resourceType.localeCompare(b.resourceType);
    });
  }
}
