import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ViewService} from '../../services/view.service';
import {Router} from '@angular/router';
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

  //import variables
  router:Router;
  authService:AuthService;
  viewService:ViewService;
  
  //variables for collection view
  cardArray:any[] = new Array();
  showEdit: Boolean = false;
  
  
  // Edit variables
  titleEdit: string = "";
  descriptionEdit: string = "";
  privateEdit: boolean = true;
  

  constructor(router:Router, _viewService:ViewService, _authService: AuthService, private cdRef: ChangeDetectorRef) {
      this.router = router;
      this.authService = _authService;
      this.viewService = _viewService;
  };
  

  ngOnInit() {
    
    //checks to see if user is authenticated, if test fails they are routed back to login page to be validated
    if(!this.authService.check()){
      this.router.navigate(['./login']);
    }
    else{
      $('#email').text(this.authService.getEmail() + "'s N(ice)ASA Profile");
      this.getCollections();
    }
  };
  
  
  //retrieves all collections that were created by the current user
  getCollections(){
    
    var me = this;
    
    var colls = [];
    
    //get collections from backend
    $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/collections', function(data){
      
    
      $.each(data, function(){
        //only add the collections that were made by this user to the array
        if(this.user == me.authService.getEmail()){
          colls.unshift(this);
        }
      });
      
      $.each(colls, function(i, coll){
        
        var r = 0;
        
        if(coll.ratingPoints != 0){
          r = coll.ratingPoints / coll.ratingNum;
        }
    
        // Example object
        var tempCard: {disabled: boolean, deleted: boolean, id:string, title: string, description: string, showEdit: Boolean, private:Boolean, rating: any, images: any[]  } = {disabled: coll.disabled, deleted: false, id:coll._id, title: coll.title, description: coll.description, showEdit: false, private:coll.private, rating: r, images: coll.images }
        if(!tempCard.disabled){
          me.cardArray.push(tempCard);
        }
        
        me.cdRef.detectChanges();
        
      });
    
    });
    
  }
  
  //toggles the html edit div
  edit(card){
    card.showEdit = !card.showEdit;
  };
  
  //deletes the collection, removed in real time using a boolean variable attached to the card
  delete(card){
    
    var result = confirm("Are you sure you want to delete this collection?");
    var me = this;
    
    if(result){
    
      $.ajax({
        type:'DELETE',
        url: "https://lab5-yanickhoude.c9users.io:8081/api/collections/" + card.id,
      });
      
      card.deleted = true;
      
      me.cdRef.detectChanges();
      
    }
  };
  
  //saves the users edits using a "put" request call to the back end
  saveEdits(card){
    
    var me = this;
    
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url:"https://lab5-yanickhoude.c9users.io:8081/api/collections/" + card.id,
      data: {
        title: me.titleEdit,
        description: me.descriptionEdit,
        private: card.private
      }
    });
    
    card.title = this.titleEdit;
    card.description = this.descriptionEdit;
    card.private = this.privateEdit;
    card.showEdit = !card.showEdit;
    
  }
  
  //toggles the visibility setting of the collection
  privateToggle(card){
    card.private = !card.private;
  }
  
  //allows user to view the images held in that collection
  view(card){
    
    this.viewService.setCollectionViewed(card,'./private', true);
    
    var test = this.viewService.getCollectionViewed();
    
    console.log(test);
    
    this.router.navigate(['./imageView']);
    
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
