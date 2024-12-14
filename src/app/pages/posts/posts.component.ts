import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { IPost } from 'src/app/models/Ipost';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  
  posts: IPost[] = [];
  postsSubscription : Subscription;
  intervalSubscription : Subscription;

  constructor(private postServices: PostService, private ref: ChangeDetectorRef, private zone: NgZone){}
  

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.intervalSubscription = interval(1000).subscribe({
      next: (data) => {
        console.log(data); 
      },
      error : (error) => {
        console.log(error);
      },
      complete : () => {
        console.log("complete interval");
        
      }
    });

    this.postsSubscription = this.postServices
    .getPostWithCategory()
    .subscribe({
      next: (data) => {
        this.zone.run(() => { // Ensure change detection triggers
          this.posts = data;
          this.ref.detectChanges(); // Explicitly notify Angular
        });
      },
      error : (error) => {
        console.log(error);
      },
      complete : () => {
        console.log("complete http call");
        
      }
    });
  }
  

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.postsSubscription && this.postsSubscription.unsubscribe();
    this.intervalSubscription && this.intervalSubscription.unsubscribe(); 
  }


}
