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
  nasaIndex: any = 0;
  saving: boolean = false;
  userColls: any[] = new Array();
  
 constructor(router:Router, _authService: AuthService, private cdRef: ChangeDetectorRef, private _dataservice: DataService, private http:Http) {
   
   this.router = router;
   this.authService = _authService;
   
 };

  //Uses the nasa api to retrieve images based on user searchword
  searchDatabase(){
    
    
   //creating an object that holds what the user searched
    var postObj: { property: string; } = { property: this.searchText };
    
    var me = this;
    
    var url = 'https://images-api.nasa.gov/search?q=' + this.searchText;
    
    console.log(this.searchText);
    

    //gets json associated with nasa api query
    $.getJSON(url, function(data){
      
      //console.log(JSON.stringify(data));
      
      var tempArray = []; 
      
      for(let coll of data.collection.items){
        
      var us = me;
      
        //console.log(coll.href);
  
        //gets the first image from the nasa collection json link returned by the original search query
        $.getJSON(coll.href, function(result){

          var tempImage: {link:string, save:boolean} = {link:result[0], save: false}
          
          tempArray.push(tempImage);
          
          if(tempArray.length - 1 === 9){
            
            us.nasaCollection.push(tempArray);
            tempArray = [];
          };
          
          //us.nasaCollection.push(us.nasaImages);
          
          us.cdRef.detectChanges();
          });
      }
    });

  };
  
  //allows user to go to next page and view more images
  incrIndex(){
    this.nasaIndex++;
    this.cdRef.detectChanges();
  };
  
  //allows user to go the last page
  decrIndex(){
    this.nasaIndex--;
    this.cdRef.detectChanges();
  };
  
  //gets the collections owned by the current user so that they can add images to their collections
  getCollections(){
    
    this.userColls = [];
    
    var me = this;
    
    //get collections from backend
    $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/collections', function(data){
      
    
      $.each(data, function(){
        //only add the collections that were made by this user to the array
        if(this.user == me.authService.getEmail()){
          me.userColls.unshift(this);
        }
      });
    
    });
      

  };
  
  //toggles the save image to collection html div
  saveImagePrompt(img){
     img.save = !img.save;
  };
  
  //image link is saved in user collection using a PUT request to the api
  saveImage(link, collection){
    
    var me = this;
    
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url:"https://lab5-yanickhoude.c9users.io:8081/api/collections/save/" + collection._id,
      data: {
        link: link
      }
    });
    
  }
  

  ngOnInit() {
    
    //prevent someone from just navigating to profile without loging in
    if(!this.authService.check()){
      this.router.navigate(['./login']);
    }
    else{
      $('#email').text(this.authService.getEmail() + "'s N(ice)ASA Profile");
          
      this.getCollections()
    }

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
