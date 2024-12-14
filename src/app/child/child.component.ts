import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  executeFunction(){
    console.log("executing cild");
    return "hai leela";
  }

}
