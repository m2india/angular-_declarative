import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/Ipost';
import { BehaviorSubject, combineLatest, map, Subject, tap } from 'rxjs';
import { DeclarativeCategoryService } from './declarative-category.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarativeService {

  // Correct URL for posts (assumed you have a different endpoint for posts)
  private postsUrl = 'https://ng-declarative-default-rtdb.firebaseio.com/posts.json'; 

  // Corrected observable for posts
  posts$ = this.http.get<{[id: string]: IPost}>(`${this.postsUrl}`).pipe(
    map(posts => {
      let postsData: IPost[] = [];
      for (const id in posts) {
        if (posts.hasOwnProperty(id)) {
          postsData.push({ ...posts[id], id });
        }
      }
      return postsData;
    })
  );

  // Observable for posts with category
  postsWithCategory$ = combineLatest([this.posts$, this.categoryService.categories$]).pipe(
    // Log posts and categories before any transformation
    tap(([posts, categories]) => {
      console.log('Posts:', posts);  // Log the posts data
      console.log('Categories:', categories);  // Log the categories data
    }),
    map(([posts, categories]) =>
      posts.map((post) => ({
        ...post,  // Spread the individual post object
        categoryName: categories.find((category) => category.id === post.category_ref)?.name || 'Unknown Category'
      }))
    ),
    // Log the final transformed posts with category names
    tap((updatedPosts) => {
      console.log('Updated Posts with Categories:', updatedPosts);
    })
  );

  private selectedPostSubject = new Subject<string>(); // Provide an initial value
  selectedPostAction$ = this.selectedPostSubject.asObservable();

  filterPost$ = combineLatest([
    this.postsWithCategory$,
    this.selectedPostAction$])
    .pipe(
    map(([posts, selectPostId]) => {
      return posts.find((post) => post.id == selectPostId );
    })
  );

  selectPost(postId: string){
    this.selectedPostSubject.next(postId);
  }



  constructor(private http: HttpClient, private categoryService: DeclarativeCategoryService) { }
}

