import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;


@Component({
  selector: 'app-takedownpolicy',
  templateUrl: './takedownpolicy.component.html',
  styleUrls: ['./takedownpolicy.component.css']
})
export class TakedownpolicyComponent implements OnInit {

  isAdmin:boolean = false;
  
  constructor(private authService: AuthService) { }


  //***********************************exact same functionality as privacy policy component just more simple*****************************************//
  
  ngOnInit() {
    
      if(localStorage.getItem("edits") !== null){
        this.update();
      }
      
      if(this.authService.getAdminStatus()){
    //   admin is signed in, everything can be edited
    //   button will appear to save edits
      this.isAdmin = true;
      $("p").attr("contenteditable", "true");
    }
  }
  
  
  save(){
    
    var p = $("p").text();
    
    localStorage.setItem("edits", p);
  }
  
  update(){
    $("p").text(localStorage.getItem("edits"));
  }

}
