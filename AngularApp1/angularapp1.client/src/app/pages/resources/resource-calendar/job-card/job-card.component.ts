import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface JobCardData {
  id: number;
  jobMainId: number;
  jobReference: string;
  customerName?: string;
  service: JobServiceData;
}

export interface JobServiceData {
  id: number;
  jobMainId: number;
  serviceItemId?: number;
  serviceItemName?: string;
  dateStart?: Date;
  dateEnd?: Date;
  particulars?: string;
  requirements: ServiceRequirementData[];
}

export interface ServiceRequirementData {
  id: number;
  requiredQty: number;
  itemTypeId?: number;
  itemTypeName?: string;
  resourceType: 'Driver' | 'Vehicle' | 'Other';
  allocatedQuantity: number;
  notes?: string;
}

interface ResourceTypeSummary {
  resourceType: 'Driver' | 'Vehicle' | 'Other';
  requiredQuantity: number;
  allocatedQuantity: number;
}

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  @Input() job!: JobCardData;
  @Input() compact: boolean = true;

  resourceTypeSummaries: ResourceTypeSummary[] = [];

  ngOnInit(): void {
    this.calculateResourceTypeSummaries();
  }

  private calculateResourceTypeSummaries(): void {
    if (!this.job.service || !this.job.service.requirements || this.job.service.requirements.length === 0) {
      this.resourceTypeSummaries = [];
      return;
    }

    // Group by resource type and sum quantities from the service's requirements
    const summaryMap = new Map<string, ResourceTypeSummary>();

    this.job.service.requirements.forEach(requirement => {
      const existing = summaryMap.get(requirement.resourceType);
      
      if (existing) {
        existing.requiredQuantity += requirement.requiredQty;
        existing.allocatedQuantity += requirement.allocatedQuantity;
      } else {
        summaryMap.set(requirement.resourceType, {
          resourceType: requirement.resourceType,
          requiredQuantity: requirement.requiredQty,
          allocatedQuantity: requirement.allocatedQuantity
        });
      }
    });

    // Convert to array and filter out zero quantities
    this.resourceTypeSummaries = Array.from(summaryMap.values())
      .filter(summary => summary.requiredQuantity > 0);
  }

  getResourceIcon(type: 'Driver' | 'Vehicle' | 'Other'): string {
    switch (type) {
      case 'Driver':
        return 'person';
      case 'Vehicle':
        return 'directions_car';
      case 'Other':
        return 'build';
      default:
        return 'help_outline';
    }
  }

  getResourceColor(type: 'Driver' | 'Vehicle' | 'Other'): string {
    switch (type) {
      case 'Driver':
        return '#2196f3'; // Blue
      case 'Vehicle':
        return '#4caf50'; // Green
      case 'Other':
        return '#ff9800'; // Orange
      default:
        return '#9e9e9e'; // Gray
    }
  }

  getAllocationStatus(summary: ResourceTypeSummary): string {
    if (summary.allocatedQuantity === 0) return 'not-allocated';
    if (summary.allocatedQuantity < summary.requiredQuantity) return 'partial';
    return 'complete';
  }

  getTooltip(summary: ResourceTypeSummary): string {
    return `${summary.resourceType}: ${summary.allocatedQuantity}/${summary.requiredQuantity} allocated`;
  }

  hasServices(): boolean {
    return this.resourceTypeSummaries.length > 0;
  }
}
