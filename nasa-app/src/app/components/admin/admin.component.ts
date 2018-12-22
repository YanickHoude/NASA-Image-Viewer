import { Component, OnInit } from '@angular/core';


//allow the use of jQuery
declare var jquery:any;
declare var $:any;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //variables for dmca tools
  requests: any[] = new Array();
  req: any;
  email: any;
  
  constructor() { }

  ngOnInit() {
    
    //gets the requests that have been logged
    this.requests = JSON.parse(localStorage.getItem("requests"));
    
  }
  
  //will save a request that is entered into the input field to local storage
  //can be accessed later by admin
  logRequest(){
    var req = $("#request").val();
   
    this.requests.push(req);
    
    localStorage.setItem("requests", JSON.stringify(this.requests));
    
  }
  
  //sends a dmca email notice 
  sendNotice(){
    
      $.ajax({
      type: 'POST',
      url: 'https://lab5-yanickhoude.c9users.io:8081/api/dmca',
      data: {
        email: $("#send").val(),
      }
    });
  }
  
  //will make it so that collection matching the id entered is not visible to any user
  //will make it so blocked collection matching the id becomes visible again
  toggleCollection(){
    
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url:"https://lab5-yanickhoude.c9users.io:8081/api/dmca/" + $("#collection").val(),
    })
  }

}
