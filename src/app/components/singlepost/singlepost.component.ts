import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { DeclarativeService } from 'src/app/service/declarative.service';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglepostComponent implements OnInit {

  errorMessage = '';
  singleClickPost$ = this.singlePostSerivice.filterPost$.pipe(
    catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY;
    })
  )

  constructor(private singlePostSerivice : DeclarativeService){}

  ngOnInit(): void {
    
  }

}
