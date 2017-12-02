import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent implements OnInit {

  router:Router;
  authService:AuthService;
  cardArray:any[] = new Array();
  rating:any;

  constructor(router:Router, _authService: AuthService, private cdRef: ChangeDetectorRef) {
      this.router = router;
      this.authService = _authService;
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
    
    //get collections from backend
    $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/collections', function(data){
      
      $.each(data, function(){
        
        //add all collections
        colls.unshift(this);
      })
      
      $.each(colls, function(i, coll){
        
        var r = 0;
        
        if(coll.ratingPoints != 0){
          r = coll.ratingPoints / coll.ratingNum;
        }

         
        if(!coll.private){
          var tempCard: { id:string, title: string, description: string, user:any, showRate:boolean, rating: any } = { id:coll._id, title: coll.title, description: coll.description, user: coll.user, showRate:false, rating: r };
          me.cardArray.push(tempCard);
          }
      });
      
      //bubble sort
      me.cardArray = me.bubbleSort(me.cardArray);
      
      me.cdRef.detectChanges();
    
    });
  };
  
  bubbleSort(array){
    var len = array.length;
    
    for(var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        
        if(array[j-1].rating<array[j].rating){
          var temp = array[j-1];
          array[j-1] = array[j];
          array[j] = temp;
        }
      }
    }
    
    return array;
  };
  
  rate(card){
    card.showRate = !card.showRate;
  };
  
  saveRating(card){
    
    card.showRate = !card.showRate;
    
    if(card.user == this.authService.getEmail()){
      window.alert("Can't rate your own collection!");
      return;
    }
    
    var me = this;

    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url:"https://lab5-yanickhoude.c9users.io:8081/api/collections/rate/" + card.id,
      data: {
        rating: me.rating
      }
    });
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
