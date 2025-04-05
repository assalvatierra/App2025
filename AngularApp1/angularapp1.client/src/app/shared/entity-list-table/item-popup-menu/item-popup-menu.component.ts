import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

export enum actionTypes {
  editRecord = 1,
  editDetails = 2,
  archive = 3,
  customActionA = 4,
  customActionB = 5,
}

@Component({
  selector: 'app-item-popup-menu',
  imports: [CommonModule,MatButtonModule, MatMenuModule],
  templateUrl: './item-popup-menu.component.html',
  styleUrl: './item-popup-menu.component.css'
})
export class ItemPopupMenuComponent {
  public MenuActionTypes = actionTypes;

  @Input() showEdit: boolean = true;
  @Input() editTitle: string = '';
  @Output() editRecordClicked = new EventEmitter<any>();

  @Output() editDetailClicked = new EventEmitter<any>();
  @Output() archiveClicked = new EventEmitter<any>();
  @Output() customAClicked = new EventEmitter<any>();
  @Output() customBClicked = new EventEmitter<any>();


  onActionClicked(actionType: actionTypes) {
    
    if (actionType == actionTypes.editRecord)
      this.editRecordClicked.emit();

    if (actionType == actionTypes.editDetails)
      this.editDetailClicked.emit();

    if (actionType == actionTypes.archive)
      this.archiveClicked.emit();

    if (actionType == actionTypes.customActionA)
      this.customAClicked.emit();

    if (actionType == actionTypes.customActionB)
      this.customBClicked.emit();

  }

}
