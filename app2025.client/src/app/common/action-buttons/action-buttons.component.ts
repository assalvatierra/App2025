import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule  } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css',
  standalone: true,
  imports:[CommonModule,MatMenuModule,MatButtonModule,]

})
export class ActionButtonsComponent {
  @Input()
  public ShowAddButton?: boolean;
  @Input()
  public AddButtonLabel?: string;
  
  @Output() addEvent = new EventEmitter<any>(); 

  constructor(){
  }

  addButtonClicked(event:any) {
    //alert('actionbuttn: addbuttonclicked');
    this.addEvent.emit(event);
  } 
}
