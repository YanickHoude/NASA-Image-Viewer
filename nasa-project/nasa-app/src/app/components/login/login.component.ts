import { Component, OnInit } from '@angular/core';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor() { };
  
  login(){
    console.log("button working");
    
    console.log($('#email').val());
    
    
  };

}
  

