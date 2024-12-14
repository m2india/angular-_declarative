import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/models/Ipost';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  postsSubscription !: Subscription;

  constructor(private postServices: PostService){}
  

  ngOnInit(): void {
    this.postsSubscription = this.postServices
    .getPostWithCategory()
    .subscribe(
      (data) => {
      this.posts = data
    })
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.postsSubscription && this.postsSubscription.unsubscribe();
  }


}
