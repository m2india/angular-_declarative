import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/Ipost';
import { combineLatest, forkJoin, map } from 'rxjs';
import { DeclarativeCategoryService } from './declarative-category.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarativeService {

  private url = 'https://ng-declarative-default-rtdb.firebaseio.com/posts.json';
  
  posts$ = this.http.get<{[id: string]: IPost}>(`${this.url}`)
  .pipe(map( posts => {
    let postsData: IPost[] =[];
    for (const id in posts) {
      if (posts.hasOwnProperty(id)) {
        postsData.push({ ...posts[id], id });
      }
    }
    return postsData;
    
  } ));



  postsWithCategory$ = forkJoin([this.posts$, this.categoryService.categories$]).pipe(
    map(([posts, categories]) => 
      posts.map((post) => {
        return {
          ...post, // Spread the individual post object
          categoryName: categories.find((category) => category.id === post.category_ref)?.name
        };
      })
    )
  );
  

  constructor(private http:HttpClient, private categoryService: DeclarativeCategoryService) { }
}
