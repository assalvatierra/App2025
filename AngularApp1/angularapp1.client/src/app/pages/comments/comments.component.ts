import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';


@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  public apiResult?: string;
  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.api.getCountries().subscribe((res) => {
      console.log(res);

      this.apiResult = JSON.stringify(res);
    });
  }

}
