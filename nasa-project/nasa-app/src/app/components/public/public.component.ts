import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  router:Router;
  authService:AuthService;

  constructor(router:Router, _authService: AuthService) {
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
