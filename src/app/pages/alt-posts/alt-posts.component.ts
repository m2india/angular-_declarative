import { Component } from '@angular/core';
import { IPost } from 'src/app/models/Ipost';
import { DeclarativeCategoryService } from 'src/app/service/declarative-category.service';
import { DeclarativeService } from 'src/app/service/declarative.service';
import { LoaderServiceService } from 'src/app/service/loader-service.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.css']
})
export class AltPostsComponent {

  posts$ = this.declarativeServices.postsWithCategory$;
  selectedPost$ = this.declarativeServices.filterPost$;

  

  constructor(private declarativeServices: DeclarativeService, private loaderService: LoaderServiceService){}

  ngOnInit(): void {
    // this.loaderService.showLoader();
  }


  onSelectPost(post: IPost, event: Event){
    event.preventDefault();
    post.id && this.declarativeServices.selectPost(post.id);
    this.loaderService.showLoader();
    // console.log(post);
  }

  
}
