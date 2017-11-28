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
    
      //empty array that will hold all collections
      var allcolls = [];
       
      console.log("The amount of items: " + (JSON.parse(res["_body"]).collection.items.length ))
        
    
      for(let object of (JSON.parse(res["_body"]).collection.items)){
          
        //this is a literal object that will hold all the info we need about the collections
        var Coll: {title: any, coll: any[] } = {title:'', coll:[]}
            
        //assigning the collection title
        Coll.title = object.data[0].title;
        
        //check me out
        var index = 0;
        var test = [];
        
        //object.href actually gives you a URL to a JSON file, so this is just to get the actual JSON
        $.getJSON(object.href, function(result){
            
            //the JSON file contains an array of image url's so we iterate through and add them to the array in our Coll object
            $.each(result, function(i, ilink){
                
                //getfacked - here's where I'm getting bent over
                Coll.coll.push(ilink);//--> this little doo dad over here adds an undefined element to the array and does fuck all
                console.log(ilink);//--> this litte doo dad over here prints out the idividual fucking image links no problemo
                //basically "ilink" is what it is supposed to be, but something about appending it to an array makes it worthless
                //already tried: declaring a basic ass array (not part of an object) same issue
                //already tried: assigin using "Coll.coll[index] = ilink" 
                //already treid: stringifying that bitch, and parsing that bitch
                
                index = index + 1;
            });
        });
        
        console.log(Coll.coll);
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
    })
    
  }
  
}

  //working example
    // this._dataservice.getImages().subscribe(res =>  this.test =JSON.stringify(res));
    