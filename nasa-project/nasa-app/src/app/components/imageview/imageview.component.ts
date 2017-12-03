import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {ViewService} from '../../services/view.service';

//allow the use of jQuery
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.css']
})
export class ImageviewComponent implements OnInit {

  card: any = {};
  viewService: ViewService;
  isPrivate: boolean = false;
  
  constructor(_viewService: ViewService, private router: Router, private cdRef: ChangeDetectorRef) {
      this.viewService = _viewService;
  };

  ngOnInit() {
    
    //prevent someone from going straight to imageView
    if(!this.viewService.getRouted()){
      this.router.navigate(['./login']);
      return;
    };
    
    this.card = this.viewService.getCollectionViewed();
    this.isPrivate = this.viewService.getPrivacy();
    
    console.log(this.card);
    
  }
  
  back(){
    this.router.navigate([this.viewService.getLastRoute()]);
  }
  
  removeImage(card,img){
    
    var me = this;

      $.ajax({
        type:'DELETE',
        url: "https://lab5-yanickhoude.c9users.io:8081/api/collections/save/" + card.id,
        data: {
          image: img
        }
      });
      
    var index = card.images.indexOf(img);
    card.images[index] = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Removed.svg/2000px-Removed.svg.png"
      
    me.cdRef.detectChanges();
      
  }

}
