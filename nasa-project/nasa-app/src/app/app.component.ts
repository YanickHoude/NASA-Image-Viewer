import { Component } from '@angular/core';
import {Router} from '@angular/router';
//importing dataservice
import {DataService} from './data.service';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    
  constructor(private _dataservice: DataService, private router: Router) { 
    
  };
  
  showPrivacy(){
    this.router.navigate(['./privacypolicy']);
  }

  showTakedown(){
    this.router.navigate(['./takedownpolicy']);
  }
}

