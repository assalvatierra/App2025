import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { AssignedResourceCellItem } from '../assigned-resource-cell/assigned-resource-cell.component';

@Component({
  selector: 'app-service-requirement-cell',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './service-requirement-cell.component.html',
  styleUrls: ['./service-requirement-cell.component.css']
})
export class ServiceRequirementCellComponent {
  @Input() items: ServiceRequirementCellItem[] = [];
  @Input() assignedResources: AssignedResourceCellItem[] = [];
  @Input() customerName: string = '';
  @Input() date: Date = new Date();
  @Input() viewMode: 'compact' | 'expanded' = 'expanded';
  @Input() showBlankCell: boolean = true;
  @Output() blankCellClick = new EventEmitter<{ customerName: string; date: Date }>();

  get hasContent(): boolean {
    return this.items.length > 0 || this.showBlankCell;
  }

  get isBlankOnly(): boolean {
    return this.items.length === 0 && this.showBlankCell;
  }

  onBlankCellClick(): void {
    this.blankCellClick.emit({
      customerName: this.customerName,
      date: this.date
    });
  }

  getItemTooltip(item: ServiceRequirementCellItem): string {
    const parts = [
      `Customer: ${item.customerName}`,
      `Job: ${item.jobReference}`,
      `Item Type: ${item.itemType}`,
      `Quantity: ${item.requiredQty}`,
      `Period: ${this.formatDate(item.dateFrom)} - ${this.formatDate(item.dateTo)}`
    ];

    if (item.notes) {
      parts.push(`Notes: ${item.notes}`);
    }

    // Include assigned resources info in tooltip if any
    const assigned = this.getAssignedForItem(item);
    if (assigned.length > 0) {
      const names = assigned.map(a => a.resourceName + (a.resourceCode ? ` (${a.resourceCode})` : '')).join(', ');
      parts.push(`Assigned: ${names}`);
    }

    return parts.join('\n');
  }

  getItemIcon(itemType: string): string {
    const type = itemType.toLowerCase();
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

  getItemIconColor(itemType: string): string {
    const type = itemType.toLowerCase();
    if (type.includes('vehicle') || type.includes('truck') || type.includes('car')) {
      return '#757575';  // Gray 600
    } else if (type.includes('driver') || type.includes('person') || type.includes('staff')) {
      return '#616161';  // Gray 700
    } else if (type.includes('equipment') || type.includes('tool')) {
      return '#9e9e9e';  // Gray 500
    } else if (type.includes('fuel')) {
      return '#757575';  // Gray 600
    } else {
      return '#9e9e9e';  // Gray 500
    }
  }

  /**
   * Returns the assigned resources that match the given requirement item.
   * Matching is performed by comparing itemType to resourceType (case-insensitive substring match) to allow flexibility.
   */
  getAssignedForItem(item: ServiceRequirementCellItem): AssignedResourceCellItem[] {
    if (!this.assignedResources || this.assignedResources.length === 0) return [];
    const reqType = (item.itemType || '').toLowerCase();
    return this.assignedResources.filter(r => {
      const resType = (r.resourceType || '').toLowerCase();
      const resName = (r.resourceName || '').toLowerCase();
      // match by type or by name containing the requirement type
      return resType.includes(reqType) || resName.includes(reqType) || reqType.includes(resType);
    });
  }

  getAssignedCount(item: ServiceRequirementCellItem): number {
    return this.getAssignedForItem(item).length;
  }

  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}

export interface ServiceRequirementCellItem {
  customerId: number;
  customerName: string;
  dateFrom: Date;
  dateTo: Date;
  itemType: string;
  requiredQty: number;
  notes: string;
  jobReference: string;
}
