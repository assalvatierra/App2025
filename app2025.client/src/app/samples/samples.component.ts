import { Component } from '@angular/core';
import { ActionButtonsComponent, ButtonSets } from '../common/action-buttons/action-buttons.component';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrl: './samples.component.css',
  standalone:true,
  imports:[ActionButtonsComponent]

})
export class SamplesComponent {
  public buttonset = ButtonSets.forGrid;

  addClicked(event:any){
    alert("here");
  }
}
