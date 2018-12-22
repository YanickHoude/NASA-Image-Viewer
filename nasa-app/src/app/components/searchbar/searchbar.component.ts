import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent  {
  

  searchText:string = '';
  nasaObjects: any[];
  
  //trying this out
  titles: any[];
  collections: any[];
  
  
  constructor(private _dataservice: DataService, private http:Http) {
    

  };

  // Display the current value of the string in the console log
  searchDB(){
    
    console.log("The value of the variable: " + this.searchText)
    
   //creating an object that holds what the user searched
    var postObj: { property: string; } = { property: this.searchText };
    
    // return as type json
    this._dataservice.searchImages(postObj).subscribe( function(res){
    
      //empty array that will hold all collection titles
      //var titlestemp = [];
      //empty array that will hold all collections
      var allcolls = [];
      //keep track of where to push collection into allcolls
      var index = 0;
       
      console.log("The amount of items: " + (JSON.parse(res["_body"]).collection.items.length ))
        
    
      for(let object of (JSON.parse(res["_body"]).collection.items)){
        
        var Coll: {title: any, coll: any[] } = {title:'', coll:[]}
            
        //get image titles
        //titlestemp.push(object.data[0].title);
        Coll.title = object.data[0].title;
        
        //empty array for image links
        var coll = [];

        
        console.log(Coll)
        
        allcolls.push(Coll);
        
        //test = this.http.get(object.href).map(res => JSON.stringify(res.json));
        
        // for(let img of object.href){
        //     collectionstemp[colindex][imgindex] = img;
        //     imgindex = imgindex + 1;
        //     console.log(img);
        // }
        
      };
      
      //this.titles = titlestemp;
      this.collections = allcolls;
      
      console.log("first collection: ", this.collections[0]);
      console.log("second collections: ", this.collections[1]);
      
      
          
          
          
    //     // Put each image object with info into an array
    //   nasaItems.push(object)
    //   console.log(JSON.stringify(object.href)
     
     // Set our array to a class object so that it can be referenced in the HTML file.
     // Current problem is we neet to figure out how to get our array to automically update when the array is changed.
     // This is dumb becuase angular 1 automatically checks if an array is updated. 
   //console.log("The new array: " + JSON.stringify(this.nasaObjects))
    })
    
    
  }
  
}

  //working example
    // this._dataservice.getImages().subscribe(res =>  this.test =JSON.stringify(res));
    
//for turning JSON returned from search into usable objects
//   export class Collection {
//     title: string;
//     images: any[];
      
//     constructor(title:string,coll:any){
//       this.title = title;
//       var obj = JSON.parse(coll);
      
//       for(let x of obj){
//           this.images.push(x);
//           console.log(x);
//       }
//     }
//   };