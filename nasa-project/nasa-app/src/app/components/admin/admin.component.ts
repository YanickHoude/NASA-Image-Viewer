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

  requests: any[] = new Array();
  
  req: any;
  email: any;
  
  constructor() { }

  ngOnInit() {
    
    this.requests = JSON.parse(localStorage.getItem("requests"));
    
  }
  
  logRequest(){
    
    var req = $("#request").val();
    
    this.requests.push(req);
    
    localStorage.setItem("requests", JSON.stringify(this.requests));
    
  }
  
  sendNotice(){
    
      $.ajax({
      type: 'POST',
      url: 'https://lab5-yanickhoude.c9users.io:8081/api/dmca',
      data: {
        email: $("#send").val(),
      }
    });
  }
  
  toggleCollection(){
    
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url:"https://lab5-yanickhoude.c9users.io:8081/api/dmca/" + $("#collection").val(),
    })
  }

}
