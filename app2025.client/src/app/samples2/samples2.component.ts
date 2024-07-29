import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
// import { AppRoutingModule } from './../app-routing.module';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-samples2',
  templateUrl: './samples2.component.html',
  styleUrl: './samples2.component.css',
  standalone:true ,
  imports:[MatTableModule,MatSortModule], 
  // imports:[CommonModule,MatTableModule,MatSortModule,AppRoutingModule], 
})
export class Samples2Component {

  displayedColumns = ['id', 'name', 'description', 'status'];

  public customers: CustMain[]=[];

  public _error?: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getForecasts();
    // this.getSample();
  }

  getForecasts() {
    this.http.get<CustMain[]>('/weatherforecast').subscribe(
      (result) => {
        this.customers = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSample() {

    var apiurl = 'https://localhost:7228/api/custstatus';

    this.http.get<CustStatus[]>('/api/CustStatus').subscribe(
      (result) => {
        var t = result;
      },
      (error) => {
        this._error = error.error;
        console.log(error.error);
      }
    );
  }

  title = 'app2025.client';



}


interface ReferenceInfo {
  Code?: string;
  display?: string;
  Remarks?: string;
  OrderNo?: string;
  IsActive?: boolean;
  IsDefault?: boolean;
}
interface CustStatus {
  Id: number;
  referenceInfo: ReferenceInfo
}

interface RecordInfo {
    dtCreated?:Date;
    createdBy?:string;
    dtEdited?:Date;
    editedBy?:string;
    isActive?:boolean;
    recordOrder?:number;
}
interface DataInfo {
  name?: string;
  description?: string;
  remarks?: string
}
interface CustMain {
  id: number;
  custStatusId?: number;
  dataInfo: DataInfo;
  custStatus: CustStatus;
  recordInfo:RecordInfo;
}
