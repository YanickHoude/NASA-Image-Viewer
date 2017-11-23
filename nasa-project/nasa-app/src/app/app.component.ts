import { Component } from '@angular/core';

//importing dataservice
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    
  test:any;
  
  text:string;
  
  
  testVariable: any;

  constructor(private _dataservice: DataService) { 
    
    //accessing data services
    this._dataservice.getImages().subscribe(res =>  this.test =((JSON.stringify(res))));
    
  }
}

