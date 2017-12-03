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
      
      var tempArray = []; 
      
      for(let coll of data.collection.items){
        
      var us = me;
      
        //console.log(coll.href);
  
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
  
  incrIndex(){
    this.nasaIndex++;
    this.cdRef.detectChanges();
  };
  
  decrIndex(){
    this.nasaIndex--;
    this.cdRef.detectChanges();
  };
  
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
  
  saveImagePrompt(img){
     img.save = !img.save;
  };
  
  saveImage(link, collection){
    
    var me = this;
    
    console.log("check 1: " + link);
    console.log("check 2: " + collection.title);
    console.log("check 2: " + collection._id);
    
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
    // if(!this.authService.check()){
    //   this.router.navigate(['./login']);
    // }
    // else{
    //   $('#email').text(this.authService.getEmail() + "'s N(ice)ASA Profile");
    // }
    
    this.getCollections()
    
    console.log(this.userColls);
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
