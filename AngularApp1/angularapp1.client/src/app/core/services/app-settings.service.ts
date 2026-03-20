import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface AppSetting {
  id: number;
  sysKey: string;
  sysValue: string;
  remarks?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private baseUrl = 'http://localhost:5157';
  private settings = signal<AppSetting[]>([]);

  constructor(private http: HttpClient) {}

  loadSettings(): Observable<AppSetting[]> {
    return this.http.get<AppSetting[]>(`${this.baseUrl}/api/AppSettings`).pipe(
      tap(settings => this.settings.set(settings)),
      catchError(() => {
        this.settings.set([]);
        return of([]);
      })
    );
  }

  getSetting(key: string): string | null {
    const setting = this.settings().find(s => s.sysKey === key);
    return setting ? setting.sysValue : null;
  }

  isMenuItemVisible(settingKey: string): boolean {
    const value = this.getSetting(settingKey);
    if (value === null) {
      return true; // visible by default if setting is not configured
    }
    return value.toLowerCase() === 'true';
  }
}
