import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

// Use to bind variables between html and this file
import { NgModel } from '@angular/forms';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateComponent implements OnInit {

  router:Router;
  authService:AuthService;
  elementRef:ElementRef;
  cardArray:any[] = new Array();
  showEdit: Boolean = false
  
  
  // Edit variables
  currentTitle: string = ""

  constructor(router:Router, _authService: AuthService, elRef:ElementRef, private cdRef: ChangeDetectorRef) {
      this.router = router;
      this.authService = _authService;
      this.elementRef = elRef;
      
      Window["PrivateComponent"] = this;
  };
  

  ngOnInit() {
    
    //prevent someone from just navigating to profile without loging in
    // if(!this.authService.check()){
    //   this.router.navigate(['./login']);
    // }
    // else{
    //   $('#email').text(this.authService.getEmail() + "'s N(ice)ASA Profile");
    // }
    
    var me = this;
    
    var colls = [];
    
    // Typescript array declaration with all properties

    
    var card = "<div class='card'><img class='card-img-top' src='...' alt='Card image cap'><div class='card-block'><h4 class='card-title'>Title</h4><p class='card-text'>Description</p></div><div class='card-footer'><small class='text-muted'>User</small><button type = 'submit' class = 'btn btn-primary form-control' (click)='edit()'>Edit</button><button type = 'submit' class = 'btn btn-primary form-control' (click)='delete()'>Delete</button></div></div></div>";
    
    //get collections from backend
    $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/collections', function(data){
      
    
      $.each(data, function(){
        //only add the collections that were made by this user to the array
        if(this.user == me.authService.getEmail()){
          colls.unshift(this);
        }
      });
      
      $.each(colls, function(i, coll){
        
        
        // Example object
        var tempCard: { title: string, description: string, showEdit: Boolean } = { title: coll.title, description: coll.description, showEdit: false }
        me.cardArray.push(tempCard)
        
        
        console.log("current state of array: " + JSON.stringify(me.cardArray))
        
        
        // Jake
        me.cdRef.detectChanges();
      /*
        console.log(coll);
        
        if(coll.private){
          
          var newCard = card.replace("Title", coll.title).replace("Description", coll.description).replace("User", coll.user);
          console.log(newCard);
          
          $('#privateColls').append(newCard); // Is this the problem line
          
          me.cdRef.detectChanges();
        }
        */
        
      });
    
    });
    
  };
  
  edit(card){
    console.log($(this).parent().siblings('div').children('h4').text());
    console.log('sanity');
    console.log("The object selected: " + JSON.stringify(card))
  
    card.showEdit = !card.showEdit;
  
    
  };
  
  saveEdits(card){
    
    // Bring in the edit variables
     card.title = this.currentTitle
    
    console.log("The updated title: " + card.title)
  }
  
  //Routing
  
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
