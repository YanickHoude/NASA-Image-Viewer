import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;


@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {
  
  isAdmin:boolean = false;
  newp: any[] = new Array();
  newh5: any[] = new Array();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
    //if edits have been made, update the DOM
    if(localStorage.getItem("pEdits") !== null){
        this.update();
      }
    
    if(this.authService.getAdminStatus()){
    //   admin is signed in, everything can be edited
    //   button will appear to save edits
      this.isAdmin = true;
      $("p").attr("contenteditable", "true");
      $("h5").attr("contenteditable", "true");
    }
  }
  
  //saves current state (after edits) of all <p> and <h5> tags
  save(){
    
    var p = $("p");
    var h5 = $("h5");
    
    console.log(p[0].innerHTML);
    
    for(var i = 0; i<=p.length - 1; i++){
     this.newp.push(p[i].innerHTML);
    }
    
    for(var i = 0; i<=h5.length - 1; i++){
     this.newh5.push(h5[i].innerHTML);
    }
    
    localStorage.setItem("pEdits", JSON.stringify(this.newp));
    localStorage.setItem("h5Edits", JSON.stringify(this.newh5));
  }
  
  //updates current state (after ast admin edits) of all <p> and <h5> tags
  update(){
    var upP = JSON.parse(localStorage.getItem("pEdits"));
    var uph5 = JSON.parse(localStorage.getItem("h5Edits"));
    
    console.log('sanity: ' + $("li").eq(0).html())
    
    for(var i = 0; i<=upP.length; i++){
     $("p").eq(i).text(upP[i]);
    }
    
    for(var i = 0; i<=uph5.length; i++){
      $("h5").eq(i).text(uph5[i]);
    }
      
  }

}
