import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-page-title',
  templateUrl: './ui-page-title.component.html',
  styleUrls: ['./ui-page-title.component.css']
})
export class UiPageTitleComponent {
  @Input() title: string = '';
}
