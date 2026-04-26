import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface DisplayOptionsData {
  viewMode: 'compact' | 'expanded';
  densityMode: 'comfortable' | 'compact' | 'dense';
  layoutMode: 'calendar' | 'stack';
}

@Component({
  selector: 'app-display-options-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  templateUrl: './display-options-dialog.component.html',
  styleUrls: ['./display-options-dialog.component.css']
})
export class DisplayOptionsDialogComponent {
  viewMode: 'compact' | 'expanded';
  densityMode: 'comfortable' | 'compact' | 'dense';
  layoutMode: 'calendar' | 'stack';

  constructor(
    public dialogRef: MatDialogRef<DisplayOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DisplayOptionsData
  ) {
    this.viewMode = data.viewMode;
    this.densityMode = data.densityMode;
    this.layoutMode = data.layoutMode;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    this.dialogRef.close({
      viewMode: this.viewMode,
      densityMode: this.densityMode,
      layoutMode: this.layoutMode
    });
  }
}
