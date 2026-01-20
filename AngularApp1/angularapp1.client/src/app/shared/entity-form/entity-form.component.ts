import { Component, inject, Input, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-entity-form',
  standalone: false,
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})
export class EntityFormComponent implements AfterViewInit {

  @Input() modelData: any;

  public dataForm: any;
  public cities: any[] = [];
  public filteredCities$: Observable<any[]> | undefined;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadCities();
  }

  ngAfterViewInit(): void {
    this.setFormData(this.modelData);
  }

  private initForm() {
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0,
      refCity: '',
      refCityId: 0
    });
  }

  public setFormData(param: any) {
    this.dataForm.patchValue(param);
    console.log('entity form data:');
    console.log(param);
  }

  private loadCities(): void {
    this.api.getCities().subscribe((res: any) => {
      this.cities = res || [];
      const control = this.dataForm.get('refCity');
      this.filteredCities$ = control.valueChanges.pipe(
        startWith((control.value as any) || ''),
        map((value: any) => typeof value === 'string' ? value : (value?.name || '')),
        map((name: any) => name ? this._filterCities(String(name)) : this.cities.slice())
      );
    }, err => {
      console.error('Error loading cities', err);
    });
  }

  private _filterCities(name: string) {
    const filterValue = name.toLowerCase();
    return this.cities.filter(c => (c.name || '').toLowerCase().includes(filterValue));
  }

  onCitySelected(option: any) {
    if (!option) return;
    this.dataForm.patchValue({ refCity: option.name, refCityId: option.id });
  }


}
