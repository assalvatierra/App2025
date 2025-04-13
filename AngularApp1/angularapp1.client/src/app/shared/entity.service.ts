import { Injectable } from '@angular/core';
import { tableField } from './models/entityListTableField';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  getDefaultEntityFields(): tableField[] {
    return [
      { key: 'id', label: 'Id' },
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'code', label: 'Code' },
      { key: 'sortOrder', label: 'Sort Order' }
    ];
  }

  getDefaultContactInfoFields(): tableField[] {
    return [
      { key: 'id', label: 'Id' },
      { key: 'ContactNo1', label: 'ContactNo1' },
      { key: 'ContactNo1', label: 'ContactNo1' },
      { key: 'Address1', label: 'Address1' },
      { key: 'Address1', label: 'Address1' },
      { key: 'Email1', label: 'Email1' },
      { key: 'Email2', label: 'Email2' }
    ];
  }




}

 
