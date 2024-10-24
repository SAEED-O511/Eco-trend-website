import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  
  constructor(private _HttpClient: HttpClient) { }

  getAllCategories():Observable<any> {
    return this._HttpClient.get('https://api.storerestapi.com/categories');
  }
}
