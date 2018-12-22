import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  router:Router;
  authService:AuthService;

  constructor(router:Router, _authService: AuthService) {
      this.router = router;
      this.authService = _authService;
  };
  
  ngOnInit() {
    
    //checks to see if user is authenticated, if test fails they are routed back to login page to be validated
    if(!this.authService.check()){
      this.router.navigate(['./login']);
    }
    else{
      $('#email').text(this.authService.getEmail() + "'s N(ice)ASA Profile");
    }
  };
  
  //allows user to create a collection
  createCollection(){
    
    //variables for all values entered in the form
    var user = this.authService.getEmail();
    var priv = !$('#private').prop('checked');
    var title = $('#title').val();
    var desc = $('#description').val();
    
    //post request, creating the collection in the backend
    $.ajax({
      type: 'POST',
      url: 'https://lab5-yanickhoude.c9users.io:8081/api/collections',
      data: {
        user: user,
        title: title,
        description: desc,
        private: priv
      },
      
      success:function(response) {
        
        //collection created alert
         window.alert("Collection Created!");
         $('#private').prop('checked', false);
       },
       error:function(){
        alert("error");
       }
    });
    
  };
  
  
  //routes for the different application pages
  
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
