import { Component, OnInit } from '@angular/core';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;

// //include bcrypt in module
// const bcrypt = require('bcrypt');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  isVerified:boolean = false; 
  

  constructor() { };
  
  login(){
    
    //authentication  
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
            this.isVerified = true;
            console.log(this.isVerified);
          }
          else{
            $('#authError').css("display", "block");
          }
      },
      
      error: function(xhr){
        console.log('Error is here');
      }
      
      
      
      
    });
    
    
  };
  
  register(){
    
      $.ajax({
      
      type: 'POST',
      url: 'https://lab5-yanickhoude.c9users.io:8081/api/user',
      data: {
        email: $('#email').val(),
        password: $('#password').val()
      }
      
    });
    
    
  }

}
  

