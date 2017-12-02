import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  router:Router;
  authService:AuthService;
  userExists: boolean = false;
  currentUser: any;
  
  //ng bind variables
  enteredEmail: string = "";
  enteredPassword: string = "";

  constructor(router:Router, _authService: AuthService) {
      this.router = router;
      this.authService = _authService;
  };
  
  ngOnInit() {
    
    var me = this;
    
    var colls = [];
    
    var card = "<div class='card'><img class='card-img-top' src='...' alt='Card image cap'><div class='card-block'><h4 class='card-title'>Title</h4><p class='card-text'>Description</p><p class='card-text'><small class='text-muted'>User</small></p></div></div>";
    
    //get collections from backend
    $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/collections', function(data){
      
      $.each(data, function(){
        
        //add all collections
        colls.unshift(this);
        
      })
      
      $.each(colls, function(i, coll){
      
        console.log(coll);
        
        if(!coll.private){
          
          var newCard = card.replace("Title", coll.title).replace("Description", coll.description).replace("User", coll.user);
          console.log(newCard);
          
          $('#privateColls').append(newCard);
        }
      });
    
    });
    
  };
  
  login(){
    
    var currentUser: {email: string, password:string} = {email: this.enteredEmail, password: this.enteredPassword};
    
    //allows us to access class elements within ajax callback function
    var me = this;
    
    console.log(currentUser);
  
   $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/user', function(data){
     
      $.each(data, function(){
        if(this.email == currentUser.email){
          me.userExists = true;
      }
    });
   });
   
   console.log(this.userExists);
   
   if(this.userExists){
    
    $.ajax({
      type: 'POST',
      url: 'https://lab5-yanickhoude.c9users.io:8081/api/login',
      data: {
        email: currentUser.email,
        password: currentUser.password
      },
      
      success: function(response){
          
          if(response.email == currentUser.email){
            console.log(response.email);
            me.authService.authenticated(response.email);
            me.router.navigate(['./public']);
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
     $('#emailError').css("display", "block");
     $('#passError').css("display", "none");
   }
    
  };
  
  register(){
    
    var currentUser: {email: string, password:string} = {email: this.enteredEmail, password: this.enteredPassword};
    
    var me = this;
  
     $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/user', function(data){
       
        $.each(data, function(){
          //only add the collections that were made by this user to the array
          if(this.email == currentUser.email){
            me.userExists = true;
            console.log(currentUser.email);
        }
      });
     });
     
     if(this.userExists){
        $('#regiError').css("display", "block");
     }
     else{
        $.ajax({
        
        type: 'POST',
        url: 'https://lab5-yanickhoude.c9users.io:8081/api/user',
        data: {
          email: currentUser.email,
          password: currentUser.password
        }
      });
     }
    }
  
  
}
  

