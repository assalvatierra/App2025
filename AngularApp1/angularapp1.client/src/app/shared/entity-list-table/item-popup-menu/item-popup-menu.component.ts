import { Component, EventEmitter, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

export enum actionTypes {
  editRecord = 1,
  editDetails = 2,
  archive = 3,
  customAction1 = 4,
  customAction2 = 5,
}

@Component({
  selector: 'app-item-popup-menu',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './item-popup-menu.component.html',
  styleUrl: './item-popup-menu.component.css'
})
export class ItemPopupMenuComponent {
  public MenuActionTypes = actionTypes;

  @Output() editRecordClicked = new EventEmitter<any>();
  @Output() editDetailClicked = new EventEmitter<any>();
  @Output() archiveClicked = new EventEmitter<any>();


  onActionClicked(actionType: actionTypes) {
    
    if (actionType == actionTypes.editRecord)
      this.editRecordClicked.emit();

    if (actionType == actionTypes.editDetails)
      this.editDetailClicked.emit();

    if (actionType == actionTypes.archive)
      this.archiveClicked.emit();

    if (actionType == actionTypes.customAction1)
      this.archiveClicked.emit();

    if (actionType == actionTypes.customAction2)
      this.archiveClicked.emit();

  }

}
