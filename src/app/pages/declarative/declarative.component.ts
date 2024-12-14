import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DeclarativeCategoryService } from 'src/app/service/declarative-category.service';
import { DeclarativeService } from 'src/app/service/declarative.service';

@Component({
  selector: 'app-declarative',
  templateUrl: './declarative.component.html',
  styleUrls: ['./declarative.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeclarativeComponent implements OnInit {

  // composts$ = this.declarativeServices.posts$
  composts$ = this.declarativeServices.postsWithCategory$
  getCategories$ = this.categoryServices.categories$;

  selectedCategoryId = '';
   
  filterPost$ = this.composts$.pipe(map( posts =>{
    return posts.filter( x => this.selectedCategoryId ? x.category_ref == this.selectedCategoryId : true)
  }))

  constructor(private declarativeServices: DeclarativeService, private categoryServices: DeclarativeCategoryService){}

  ngOnInit(): void {
    console.log("composts$", this.composts$);
    
  }

  onChange(event: Event){
    // console.log(event);
    const selectElement = event.target as HTMLSelectElement;  // Cast to HTMLSelectElement
    this.selectedCategoryId = selectElement.value;  // Now TypeScript knows `value` exists
    
    console.log("this.selectedCategoryId", this.selectedCategoryId);
    
  }

}
