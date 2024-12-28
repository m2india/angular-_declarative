import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { DeclarativeService } from 'src/app/service/declarative.service';
import { LoaderServiceService } from 'src/app/service/loader-service.service';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglepostComponent implements OnInit {

  errorMessage = '';
  singleClickPost$ = this.singlePostSerivice.filterPost$.
  pipe(
    tap((data => {
      console.log("check data", data);
      this.loaderService.hideLoader();
    })),
    catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY;
    })
  )

  constructor(private singlePostSerivice : DeclarativeService, private loaderService: LoaderServiceService){}

  ngOnInit(): void {
      // console.log("check 1");
      
  }

}
