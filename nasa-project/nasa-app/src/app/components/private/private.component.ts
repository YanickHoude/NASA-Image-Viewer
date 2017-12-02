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
  showEdit: Boolean = false;
  
  
  // Edit variables
  titleEdit: string = "";
  descriptionEdit: string = "";
  privateEdit: boolean = true;
  

  constructor(router:Router, _authService: AuthService, elRef:ElementRef, private cdRef: ChangeDetectorRef) {
      this.router = router;
      this.authService = _authService;
      this.elementRef = elRef;
  };
  

  ngOnInit() {
    
    this.populate();
    
  };
  
  populate(){
    
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
    
        // Example object
        var tempCard: { id:string, title: string, description: string, showEdit: Boolean, private:Boolean } = { id:coll._id, title: coll.title, description: coll.description, showEdit: false, private:coll.private }
        me.cardArray.push(tempCard);
        
        console.log("current state of array: " + JSON.stringify(me.cardArray))
        
        me.cdRef.detectChanges();
        
      });
    
    });
    
  }
  
  edit(card){
    card.showEdit = !card.showEdit;
  };
  
  delete(card){
    
    var me = this;
    
    $.ajax({
      type:'DELETE',
      url: "https://lab5-yanickhoude.c9users.io:8081/api/collections/" + card.id,
    });
    
    //very dirty
    card.title = "deleted";
    card.description = "deleted";
    card.private = '';
  };
  
  saveEdits(card){
    
    var me = this;
    
    //visibility
    if(this.privateEdit){
      card.private = !card.private;
    }
    
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
