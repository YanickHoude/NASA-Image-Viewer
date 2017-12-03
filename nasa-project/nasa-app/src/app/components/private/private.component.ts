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
    
    this.getCollections();
    
  };
  
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
        var tempCard: { deleted: boolean, id:string, title: string, description: string, showEdit: Boolean, private:Boolean, rating: any, images: any[]  } = { deleted: false, id:coll._id, title: coll.title, description: coll.description, showEdit: false, private:coll.private, rating: r, images: coll.images }
        me.cardArray.push(tempCard);
        
        me.cdRef.detectChanges();
        
      });
    
    });
    
  }
  
  edit(card){
    card.showEdit = !card.showEdit;
  };
  
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
  
  privateToggle(card){
    card.private = !card.private;
  }
  
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
