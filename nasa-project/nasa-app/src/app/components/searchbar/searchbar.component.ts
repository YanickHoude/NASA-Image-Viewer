import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs/Observable'
// Use this yanick you primitive cave man
import { NgModel } from '@angular/forms';

// Bring in the HTTP module 
import { Http, Headers, RequestOptions } from '@angular/http';

// Import data service to let us make HTTP calls 
import {DataService} from '../../data.service';


//allow the use of jQuery
declare var jquery:any;
declare var $:any;


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchbarComponent  {
  

  searchText:string = '';
  nasaObjects: any[];
  
 constructor(private ref: ChangeDetectorRef, private _dataservice: DataService, private http:Http) {};

  // Display the current value of the string in the console log
  searchDB(){
    this.ref.detectChanges();
    
    console.log("The value of the variable: " + this.searchText)
    
   //creating an object that holds what the user searched
    var postObj: { property: string; } = { property: this.searchText };
    
    // return as type json
    this._dataservice.searchImages(postObj).subscribe(async res => {

       
      console.log("The amount of items: " + (JSON.parse(res["_body"]).collection.items.length ))

      console.log('The items: ' + JSON.stringify((JSON.parse(res["_body"]).collection.items)))



        this.nasaObjects = (JSON.parse(res["_body"]).collection.items)
        this.ref.detectChanges();
  
      
      }
    )
      
  } 
  
}

  //working example
    // this._dataservice.getImages().subscribe(res =>  this.test =JSON.stringify(res));
    