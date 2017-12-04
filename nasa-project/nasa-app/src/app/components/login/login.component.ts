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

  ngOnInit() {
    
      this.getCollections();

  };
  
  //**********************************************************For public collection display****************************************************//
  
  //retrieves all public collections
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
      
      //bubble sort by rating add to array that is used by ngFor on the frontend
      me.cardArray = me.bubbleSort(me.cardArray);
      
      me.cdRef.detectChanges();
    
    });
    
  }
  
  
  //sorting algorithm
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
  
//************************** For user authentication ****************************//
  
  login(){
    
    //check for admin and login immediately if admin
    if($('#email').val() === "admin" && $('#password').val() === "admin"){
      
      this.authService.adminSignIn();
      this.router.navigate(['./admin']);
      
    }
    
    $('#emailNull').css("display", "none");
    $('#passwordNull').css("display", "none");
    
    //ensuring that a email or password has been entered
    if($('#email').val() == ''){
      $('#emailNull').css("display", "block");
      return;
    }
    
    if($('#password').val() == ''){
      $('#passwordNull').css("display", "block");
      return;
    }
    
    var me = this;
  
  //retrieve users and check if a user exists with matching email entered
   $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/user', function(data){
     
      $.each(data, function(){
        //check if user exists and then sets the users "active" state to local variable
        if(this.email == $('#email').val()){
          me.userExists = true;
          me.userActive = this.active;
        }
      });

      //if the user exists and has gone through email validation then the password is checked and user logs in if match
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
  
  //user registration
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
  
    //checks to see if user already exists
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
        
        //if user doesn't already exists, user is created and email confirmation linkn is sent, user is alerted of this
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
  
  
  //email verification resent mechanism
  resend(){
    
      var me = this;
      
      //retrieves the user in question
      $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/user', function(data){
     
      $.each(data, function(){
        //only add the collections that were made by this user to the array
        if(this.email == $('#email').val()){
          me.userId = this._id;
        }
      });
      
      
      var that = me;
      
      //deletes that user in question
      $.ajax({
        type: 'DELETE',
        url: 'https://lab5-yanickhoude.c9users.io:8081/api/user/' + that.userId,
      });
    });
    
    //user is prompted to click "register" again which results in another email being sent
  }
  
  
}
  

