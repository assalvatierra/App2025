import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  getDefaultEntityFields(): any {
    return [
      { key: 'id', label: 'Id' },
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'code', label: 'Code' },
      { key: 'sortOrder', label: 'Sort Order' }
    ];
  }
}
