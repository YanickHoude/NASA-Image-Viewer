import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnInit {

  router:Router;
  authService:AuthService;

  searchText:string = '';
  nasaCollection:any[] = new Array();
  nasaImages: any[] = new Array();
  nasaObjects: any;
  
 constructor(router:Router, _authService: AuthService, private cdRef: ChangeDetectorRef, private _dataservice: DataService, private http:Http) {
   
   this.router = router;
   this.authService = _authService;
   
 };

  // Display the current value of the string in the console log
  searchDatabase(){
    
    // this.cdRef.detectChanges();
    
    console.log("The value of the variable: " + this.searchText)
    
   //creating an object that holds what the user searched
    var postObj: { property: string; } = { property: this.searchText };
    
    var me = this;
    
    var url = 'https://images-api.nasa.gov/search?q=' + this.searchText;
    
    console.log(this.searchText);
    

      
    $.getJSON(url, function(data){
      
      //console.log(JSON.stringify(data));
      
      for(let coll of data.collection.items){
        
      var us = me;
      
        //console.log(coll.href);
  
        $.getJSON(coll.href, function(result){
          
            console.log("picture link   " + result[0]);
          
            //console.log(result);
            
            us.nasaImages = [];
          
            $.each(result, function(i, ilink){
              
             // console.log(ilink);
              us.nasaImages.push(ilink);
              
          });
          
          console.log(us.nasaImages[0]);
          
          us.nasaCollection.push(us.nasaImages);
          
          us.cdRef.detectChanges();
          });
      }
        });

  } 
  

  ngOnInit() {
    
    //prevent someone from just navigating to profile without loging in
    // if(!this.authService.check()){
    //   this.router.navigate(['./login']);
    // }
    // else{
    //   $('#email').text(this.authService.getEmail() + "'s N(ice)ASA Profile");
    // }
  };
  
  allColls(){
    
    this.router.navigate(['./public']);
    
  };
  
  myColls(){
    
    this.router.navigate(['./private']);
    
  };
  
  createColl(){
    
    this.router.navigate(['./create']);
    
  };
  
  searchDB(){
    
    this.router.navigate(['./search']);
  }
}
