import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/ICategory';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclarativeCategoryService {


  private url = 'https://ng-declarative-default-rtdb.firebaseio.com/categories.json';

  categories$ = this.http.get<{[id: string] : ICategory}>(`${this.url}`)
  .pipe( map ( categories => {
      let catergoryData: ICategory[] =[];
      for(const id in categories){
          if (categories.hasOwnProperty(id)) {
              catergoryData.push({...categories[id], id});
          }
      }
      return catergoryData;
  }) 
);

  constructor(private http: HttpClient) { }
}
