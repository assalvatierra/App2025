import { Component } from '@angular/core';
import { ActionButtonsComponent, ButtonSets } from '../common/action-buttons/action-buttons.component';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrl: './samples.component.css',
  standalone:true,
  imports:[ActionButtonsComponent,MatTableModule]

})
export class SamplesComponent {
  public buttonset:ButtonSets;

  constructor( private router: Router ){
    this.buttonset = ButtonSets.forGrid;
  }

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
    this.router.navigate(['/Sample-Form']);

  }

  editClicked(event:any){
    alert("edit Event:" + JSON.stringify(event));
    this.router.navigate(['/Sample-Form',{id:event.Id}]);

  }

  archivedClicked(event:any){
    alert("Archive");
  }

}
