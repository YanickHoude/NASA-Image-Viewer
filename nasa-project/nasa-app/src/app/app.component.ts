import { Component } from '@angular/core';

//importing dataservice
import {DataService} from './data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    
  constructor(private _dataservice: DataService) { 
    
  };
}

