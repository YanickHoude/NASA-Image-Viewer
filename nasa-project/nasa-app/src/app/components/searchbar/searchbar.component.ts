import { Component, OnInit } from '@angular/core';

// Use this yanick you primitive cave man
import { NgModel } from '@angular/forms';

// Bring in the HTTP module 
import { Http, Headers, RequestOptions } from '@angular/http';

// Import data service to let us make HTTP calls 
import {DataService} from '../../data.service';



@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent  {
  

  searchText:string = '';
  test:string = "asdf"
  

  nasaObjects: any[]
  
  testArray: Array<string> = ['1','2','3','4']

  constructor(private _dataservice: DataService) {
    

  };

  // Display the current value of the string in the console log
  searchDB(){
    
    console.log("The value of the variable: " + this.searchText)
    
   //creating an object that holds what the user searched
    var postObj: { property: string; } = { property: this.searchText };
    
    //working example
    // this._dataservice.getImages().subscribe(res =>  this.test =JSON.stringify(res));
    
    // return as type json
    this._dataservice.searchImages(postObj).subscribe( function(res){
    
      //create empty array that will hold object in NASA collectio
      var nasaItems = []
      
      // Iterate through all objects in the NASA collection to find each picture link
      var temp = {
       href: ""
       }
       
       
      console.log("The amount of items: " + (JSON.parse(res["_body"]).collection.items.length ))
        
      for(let object of (JSON.parse(res["_body"]).collection.items)){
    
        // Put each image object with info into an array
       nasaItems.push(object)
       console.log(JSON.stringify(object.href))
     }
     
     // Set our array to a class object so that it can be referenced in the HTML file. 
    this.nasaObjects = nasaItems
     
     // Current problem is we neet to figure out how to get our array to automically update when the array is changed.
     // This is dumb becuase angular 1 automatically checks if an array is updated. 
   //console.log("The new array: " + JSON.stringify(this.nasaObjects))
    })
    
    
  }
  
}
