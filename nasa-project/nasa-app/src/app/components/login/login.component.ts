import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  
  router:Router;
  authService:AuthService;
  userExists: boolean = false;
  userActive: boolean = false;
  userId: any; 
  cardArray:any[] = new Array();
  rating:any;


  constructor(router:Router, _authService: AuthService, private cdRef: ChangeDetectorRef) {
      this.router = router;
      this.authService = _authService;
  };
  
  //*******Make this into a component if you have time*******//
  
  ngOnInit() {
    
      this.getCollections();

  };
  
  getCollections(){
    
    
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
          var tempCard: {disabled: boolean, deleted: boolean, edited: boolean, rated: boolean, id:string, title: string, description: string, user:any, showRate:boolean, rating: any, images: any[] } = {disabled: coll.disabled, deleted: false, edited: false, rated: false, id:coll._id, title: coll.title, description: coll.description, user: coll.user, showRate:false, rating: r, images: coll.images };
          if(!tempCard.disabled){
            me.cardArray.push(tempCard);
          }
          }
      });
      
      //bubble sort
      me.cardArray = me.bubbleSort(me.cardArray);
      
      me.cdRef.detectChanges();
    
    });
    
  }
  
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
  
//******************************************************//
  
  login(){
    
    //check for admin
    if($('#email').val() === "admin" && $('#password').val() === "admin"){
      
      this.authService.adminSignIn();
      this.router.navigate(['./admin']);
      
    }
    //authentication  
    
    $('#emailNull').css("display", "none");
    $('#passwordNull').css("display", "none");
    
    if($('#email').val() == ''){
      $('#emailNull').css("display", "block");
      return;
    }
    
    if($('#password').val() == ''){
      $('#passwordNull').css("display", "block");
      return;
    }
    
    //allows us to access class elements within ajax callback function
    var me = this;
    
  
   $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/user', function(data){
     
      $.each(data, function(){
        //only add the collections that were made by this user to the array
        if(this.email == $('#email').val()){
          me.userExists = true;
          me.userActive = this.active;
        }
      });
    
      console.log(me.userActive);
      
      if(me.userExists && me.userActive){
      
      $.ajax({
        type: 'POST',
        url: 'https://lab5-yanickhoude.c9users.io:8081/api/login',
        data: {
          email: $('#email').val(),
          password: $('#password').val()
        },
        
        success: function(response){
            
            if(response.email == $('#email').val()){
              console.log(response.email);
              me.authService.authenticated(response.email);
              me.router.navigate(['./private']);
            }
            else{
              $('#passError').css("display", "block");
              $('#emailError').css("display", "none");
            }
            
        },
        error: function(xhr){
          console.log('Error is here');
        }
      });
    }
      else{
        $('#passError').css("display", "none");
        if(!me.userActive){
        console.log(me.userActive);
        window.alert("Need To Register, or If Registered: Need Email Confirmation");
        }
        else{
        $('#emailError').css("display", "block");
        }
      }
     });
     
   
    
  };
  
  register(){
    
    $('#resend').css("display", "block");
    $('#emailNull').css("display", "none");
    $('#passwordNull').css("display", "none");
    
    if($('#email').val() == ''){
      $('#emailNull').css("display", "block");
      return;
    }
    
    if($('#password').val() == ''){
      $('#passwordNull').css("display", "block");
      return;
    }
    
    var me = this;
  
     $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/user', function(data){

        $.each(data, function(){
          if(this.email == $('#email').val()){
            me.userExists = true;
        }
      });

      if(me.userExists){
        $('#regiError').css("display", "block");
      }
      else{
        $('#regiError').css("display", "none");
        
        window.alert("Account Created, Need Email Confirmation");
        
        $.ajax({
        
        type: 'POST',
        url: 'https://lab5-yanickhoude.c9users.io:8081/api/user',
        data: {
          email: $('#email').val(),
          password: $('#password').val()
        }
        });
      }
    });
    
    this.userExists = false;
  };
  
  resend(){
    
      var me = this;
      
      $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/user', function(data){
     
      $.each(data, function(){
        //only add the collections that were made by this user to the array
        if(this.email == $('#email').val()){
          me.userId = this._id;
        }
      });
      
      console.log(me.userId);
      
      var that = me;
    
      $.ajax({
        type: 'DELETE',
        url: 'https://lab5-yanickhoude.c9users.io:8081/api/user/' + that.userId,
      });
    });
  }
  
  
}
  

