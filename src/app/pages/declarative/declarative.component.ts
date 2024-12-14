import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  constructor(private declarativeServices: DeclarativeService){}

  ngOnInit(): void {
    
  }

}
