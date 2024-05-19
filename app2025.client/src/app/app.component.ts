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
  Display: string;
  Remarks: string;
  OrderNo: string;
  IsActive: boolean;
  IsDefault: boolean;
}
interface CustStatus {
  Id: number;
  ReferenceInfo: ReferenceInfo
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
    this.getSample();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSample() {
    this.http.get<CustStatus[]>('/api/CustStatus').subscribe(
      (result) => {
        var t = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'app2025.client';
}
