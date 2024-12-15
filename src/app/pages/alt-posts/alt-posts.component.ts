import { Component } from '@angular/core';
import { IPost } from 'src/app/models/Ipost';
import { DeclarativeCategoryService } from 'src/app/service/declarative-category.service';
import { DeclarativeService } from 'src/app/service/declarative.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.css']
})
export class AltPostsComponent {

  posts$ = this.declarativeServices.postsWithCategory$;
  constructor(private declarativeServices: DeclarativeService){}


  onSelectPost(post: IPost, event: Event){
    event.preventDefault();
    console.log(post);
    post.id && this.declarativeServices.selectPost(post.id);
    
  }
}
