import { Component, OnInit } from '@angular/core';
import { DeclarativeService } from 'src/app/service/declarative.service';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglepostComponent implements OnInit {

  getFilterPost$ = this.singlePostSerivice.filterPost$;
  
  constructor(private singlePostSerivice : DeclarativeService){}

  ngOnInit(): void {
    
  }

}
