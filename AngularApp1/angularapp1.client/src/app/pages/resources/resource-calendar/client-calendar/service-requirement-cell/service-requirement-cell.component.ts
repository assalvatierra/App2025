import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

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
  @Input() customerName: string = '';
  @Input() date: Date = new Date();
  @Input() viewMode: 'compact' | 'expanded' = 'expanded';

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
