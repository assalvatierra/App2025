import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface ReferenceInfo {
  Code: string;
  display: string;
  Remarks: string;
  OrderNo: string;
  IsActive: boolean;
  IsDefault: boolean;
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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  public customers: CustMain[]=[];

  public _error?: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
    //this.getSample();
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

  //getSample() {

  //  var apiUrl = 'https://localhost:7228/api/CustStatus';

  //  this.http.get<CustStatus[]>('/Api/CustStatus').subscribe(
  //    (result) => {
  //      var t = result;
  //    },
  //    (error) => {
  //      this._error = error.error;
  //      console.log(error.error);
  //    }
  //  );
  //}

  title = 'app2025.client';
}
