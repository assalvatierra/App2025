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
      { key: 'contactNo1', label: 'ContactNo1' },
      { key: 'contactNo2', label: 'ContactNo2' },
      { key: 'address1', label: 'Address1' },
      { key: 'address2', label: 'Address2' },
      { key: 'email1', label: 'Email1' },
      { key: 'email2', label: 'Email2' }
    ];
  }

  getCitiesFields(): tableField[] {
    return [
     { key: 'countryId', label: 'CountryId' },
     { key: 'refCountry', label: 'Country' },
    ];
  }




}

 
