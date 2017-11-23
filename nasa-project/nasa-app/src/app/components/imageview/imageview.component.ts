import { Component, OnInit } from '@angular/core';

//importing dataservice
//import {DataService} from '../data.service';

@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.css']
})
export class ImageviewComponent implements OnInit {

  test:string;
  
  constructor(){
    
  }

  ngOnInit() {
    this.test = "test";
  }

}
