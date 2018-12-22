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
    
    //using a service to get the current collection details and whether it is owned by the current user or not
    this.card = this.viewService.getCollectionViewed();
    this.isPrivate = this.viewService.getPrivacy();
    
  }
  
  //this isn't necessary (can just use back button) but incase user is confused, this will take them back to their last route
  back(){
    this.router.navigate([this.viewService.getLastRoute()]);
  }
  
  //if the collection belongs to the user this will allow the user to remove images from the collection
  removeImage(card,img){
    
    var me = this;

      $.ajax({
        type:'DELETE',
        url: "https://lab5-yanickhoude.c9users.io:8081/api/collections/save/" + card.id,
        data: {
          image: img
        }
      });
    
    //card display image is updated to reflect the state of the image
    var index = card.images.indexOf(img);
    card.images[index] = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Removed.svg/2000px-Removed.svg.png"
      
    me.cdRef.detectChanges();
      
  }

}
