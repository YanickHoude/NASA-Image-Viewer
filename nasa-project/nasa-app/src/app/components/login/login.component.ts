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

  constructor(router:Router, _authService: AuthService) {
      this.router = router;
      this.authService = _authService;
  };
  
  login(){
    //authentication  
    
    //allows us to access class elements within ajax callback function
    var me = this;
    
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
            me.router.navigate(['./profile']);
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
  

