import { Component } from '@angular/core';
import { ActionButtonsComponent, ButtonSets } from '../common/action-buttons/action-buttons.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrl: './samples.component.css',
  standalone:true,
  imports:[ActionButtonsComponent,MatTableModule]

})
export class SamplesComponent {
  public buttonset = ButtonSets.forGrid;

  public dataSource = [
    {Id:0, Name:'test',Remarks:'Over'},
    {Id:1, Name:'The',Remarks:'The Lazy'},
    {Id:2, Name:'Quick',Remarks:'Dog'},
    {Id:3, Name:'Brown',Remarks:'Across'},
    {Id:4, Name:'Fox',Remarks:'The Bunk'},
    {Id:5, Name:'Jump',Remarks:'Of the river'},
  ];


  addClicked(event:any){
    alert("Add Event");
  }

  archivedClicked(event:any){
    alert("Archive");
  }
}
