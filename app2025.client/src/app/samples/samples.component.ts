import { Component } from '@angular/core';
import { ActionButtonsComponent } from '../common/action-buttons/action-buttons.component';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrl: './samples.component.css',
  standalone:true,
  imports:[ActionButtonsComponent,]

})
export class SamplesComponent {

  addClicked(event:any){
    alert("here");
  }
}
