import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
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
export class ActionButtonsComponent implements OnInit {
  @Input()
  public buttonSet?: ButtonSets;


  @Input()
  public ShowAddButton?: boolean;
  @Input()
  public AddButtonLabel?: string;
  
  @Input()
  public ShowArchiveButton?: boolean;
  @Input()
  public ArchiveButtonLabel?: string;

  @Output() addEvent = new EventEmitter<any>(); 
  @Output() archiveEvent = new EventEmitter<any>(); 

  constructor(){
    
  }


  ngOnInit():void {

  }

  ngAfterViewInit():void {
    if(this.buttonSet && this.buttonSet==ButtonSets.forGrid){
      this.ShowAddButton=true;
      this.ShowArchiveButton=true;
    }

  }

  addButtonClicked(event:any) {
    //alert('actionbuttn: addbuttonclicked');
    this.addEvent.emit(event);
  }
  archiveButtonClicked(event:any){
    this.archiveEvent.emit(event);
  } 
}


export enum ButtonSets{
  forGrid='for-grid',
  forForm='for-form'
}