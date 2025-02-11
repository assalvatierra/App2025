import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrl: './sample-form.component.css',
  standalone:true,
  imports:[]

})
export class SampleFormComponent implements OnInit {

  public sampleID: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit() {
    this.sampleID = this.route.snapshot.paramMap.get('id');
    
  }
}
