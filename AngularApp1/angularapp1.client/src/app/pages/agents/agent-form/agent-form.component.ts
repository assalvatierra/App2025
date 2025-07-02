import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ApiAgentsService } from '../../../core/services/api-agents.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';

@Component({
  selector: 'app-agent-form',
  standalone: false,
  templateUrl: './agent-form.component.html',
  styleUrl: './agent-form.component.css'
})
export class AgentFormComponent {

  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: any;
  public dataFormAgent: any;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn:  boolean = false;
  public TitleInfo: string;

  constructor(
    private api: ApiAgentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 

    this.dataFormAgent = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
      roles: new FormControl(),
    });

    this.TitleInfo = 'Add New Agent Form';

  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    if(this.paramId != 0) {
      this.TitleInfo = 'Edit Agent Form';
      this.retrieveApiData(this.paramId);
    }

    if(this.paramId == 0) {
      this.TitleInfo = 'Add New Agent Form';
      this.SetDefaultData();

      this.dataloading = false;
      this.ShowAddBtn = true;
    }


  }

  /* Event Handlers */
  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);

    //alert('City updated!');
    this.router.navigate(['/agents']);
  }

  onAdd(): void{
    
    this.updateCurrentDataValues();
    this.addApiData(this.currentData)

    //alert('City Added!');
    this.router.navigate(['/agents']);
  }

  onCancel(): void {
    this.router.navigate(['/agents']);
  }


  /* API calls */
  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getAgent(paramId)
      .subscribe({
        next: (res: any) => {
          this.initializeData(res);
        },
        error: (err: any) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private updateApiData(Id: number, data: any): void {
    this.dataloading = true;
    this.api.updateAgent(this.paramId, data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
        },
        error: (err: any) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  
  private addApiData(data: any): void {
    this.dataloading = true;
    this.api.addAgent(data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
        },
        error: (err: any) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }


  /* Methods */
  private initializeData(param: any): void {
    this.currentData = param;
  }

  private updateCurrentDataValues(): void {
   
      this.currentData.name = this.dataFormAgent.get('name')?.value;
      this.currentData.description = this.dataFormAgent.get('description')?.value;
      this.currentData.roles = this.dataFormAgent.get('roles')?.value;
    
  }

  private SetDefaultData(){
    this.currentData = {
      id: 0,
      name: '',
      description: '',
      roles: '',
    };

  }

  
}
