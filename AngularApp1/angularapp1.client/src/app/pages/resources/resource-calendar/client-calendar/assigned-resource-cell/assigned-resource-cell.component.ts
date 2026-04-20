import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-assigned-resource-cell',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './assigned-resource-cell.component.html',
  styleUrls: ['./assigned-resource-cell.component.css']
})
export class AssignedResourceCellComponent {
  @Input() resources: AssignedResourceCellItem[] = [];
  @Input() customerName: string = '';
  @Input() date: Date = new Date();
  @Input() viewMode: 'compact' | 'expanded' = 'expanded';

  getResourceTooltip(resource: AssignedResourceCellItem): string {
    const parts = [
      `Customer: ${resource.customerName}`,
      `Job: ${resource.jobReference}`,
      `Resource: ${resource.resourceName}`,
    ];

    if (resource.resourceCode) {
      parts.push(`Code: ${resource.resourceCode}`);
    }

    if (resource.resourceType) {
      parts.push(`Type: ${resource.resourceType}`);
    }

    parts.push(`Period: ${this.formatDate(resource.dateFrom)} - ${this.formatDate(resource.dateTo)}`);

    if (resource.notes) {
      parts.push(`Notes: ${resource.notes}`);
    }

    return parts.join('\n');
  }

  getResourceIcon(resourceType: string): string {
    const type = resourceType.toLowerCase();
    if (type.includes('vehicle') || type.includes('truck') || type.includes('car')) {
      return 'local_shipping';
    } else if (type.includes('driver') || type.includes('person') || type.includes('staff')) {
      return 'person';
    } else if (type.includes('equipment') || type.includes('tool')) {
      return 'construction';
    } else if (type.includes('fuel')) {
      return 'local_gas_station';
    } else {
      return 'category';
    }
  }

  getResourceIconColor(resourceType: string): string {
    // Unified dark blue color theme for all resource types
    return '#1565c0';
  }

  getResourceInitials(resourceName: string): string {
    if (!resourceName) return '?';
    const words = resourceName.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return resourceName.substring(0, 2).toUpperCase();
  }

  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}

export interface AssignedResourceCellItem {
  jobServiceResourceId: number;
  resourceId: number;
  resourceName: string;
  resourceCode?: string;
  resourceType: string;
  customerName: string;
  jobReference: string;
  dateFrom: Date;
  dateTo: Date;
  notes?: string;
}
