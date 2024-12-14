import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/Ipost';
import { map, mergeMap } from 'rxjs';
import { CateroryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private categoryServices: CateroryService) { }

  private url = 'https://ng-declarative-default-rtdb.firebaseio.com/posts.json';

  getPosts(){
    return this.http.get<{[id: string]: IPost}>(`${this.url}`)
    .pipe(map( posts => {
      let postsData: IPost[] =[];
      for (const id in posts) {
        if (posts.hasOwnProperty(id)) {
          postsData.push({ ...posts[id], id });
        }
      }
      return postsData;
      
    } ));
  }

  getPostWithCategory() {
    return this.getPosts().pipe(
      mergeMap((posts) => 
        this.categoryServices.getCategory().pipe(
          map((categories) => 
            posts.map((post) => {
              const category = categories.find((category) => category.id === post.category_ref);              
              return {
                ...post,
                categoryName: category?.name || null // Add categoryName or null if not found
              };
            })
          )
        )
      )
    );
  }
  

}
