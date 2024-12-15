import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Subject, tap } from 'rxjs';
import { DeclarativeCategoryService } from 'src/app/service/declarative-category.service';
import { DeclarativeService } from 'src/app/service/declarative.service';

@Component({
  selector: 'app-declarative',
  templateUrl: './declarative.component.html',
  styleUrls: ['./declarative.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeclarativeComponent implements OnInit {

  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();

  // composts$ = this.declarativeServices.posts$
  getposts$ = this.declarativeServices.postsWithCategory$
  getCategories$ = this.categoryServices.categories$;
  selectedCategoryId = '';
   
  filterPost$ = combineLatest([
      this.getposts$,
      this.selectedCategoryAction$
    ])
    .pipe(
        tap(([posts, selectCategoryId]) => {
          console.log('Posts before filtering:', posts);
          console.log('Selected Category ID:', selectCategoryId);
        }),
        map(([posts, selectCategoryId]) => {
          return posts.filter( x => selectCategoryId ? x.category_ref == selectCategoryId : true)
      }),
      tap((updatedPosts) => {
        console.log('Updated Posts with Categories:', updatedPosts);
      })
    )  
  


  constructor(private declarativeServices: DeclarativeService, private categoryServices: DeclarativeCategoryService){}

  ngOnInit(): void {
    console.log("composts$", this.getposts$);
    
  }

  onCategoryChange(event: Event){
    // console.log(event);
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategorySubject.next(selectElement.value); // Emit the selected category ID
    // console.log("selectElement", selectElement);
  }

}
