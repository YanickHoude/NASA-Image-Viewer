"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var PrivateComponent = (function () {
    function PrivateComponent(router, _authService, elRef, cdRef) {
        this.cdRef = cdRef;
        this.cardArray = new Array();
        this.showEdit = false;
        // Edit variables
        this.currentTitle = "";
        this.router = router;
        this.authService = _authService;
        this.elementRef = elRef;
        Window["PrivateComponent"] = this;
    }
    ;
    PrivateComponent.prototype.ngOnInit = function () {
        //prevent someone from just navigating to profile without loging in
        // if(!this.authService.check()){
        //   this.router.navigate(['./login']);
        // }
        // else{
        //   $('#email').text(this.authService.getEmail() + "'s N(ice)ASA Profile");
        // }
        var me = this;
        var colls = [];
        // Typescript array declaration with all properties
        var card = "<div class='card'><img class='card-img-top' src='...' alt='Card image cap'><div class='card-block'><h4 class='card-title'>Title</h4><p class='card-text'>Description</p></div><div class='card-footer'><small class='text-muted'>User</small><button type = 'submit' class = 'btn btn-primary form-control' (click)='edit()'>Edit</button><button type = 'submit' class = 'btn btn-primary form-control' (click)='delete()'>Delete</button></div></div></div>";
        //get collections from backend
        $.getJSON('https://lab5-yanickhoude.c9users.io:8081/api/collections', function (data) {
            $.each(data, function () {
                //only add the collections that were made by this user to the array
                if (this.user == me.authService.getEmail()) {
                    colls.unshift(this);
                }
            });
            $.each(colls, function (i, coll) {
                // Example object
                var tempCard = { title: coll.title, description: coll.description, showEdit: false };
                me.cardArray.push(tempCard);
                console.log("current state of array: " + JSON.stringify(me.cardArray));
                // Jake
                me.cdRef.detectChanges();
                /*
                  console.log(coll);
                  
                  if(coll.private){
                    
                    var newCard = card.replace("Title", coll.title).replace("Description", coll.description).replace("User", coll.user);
                    console.log(newCard);
                    
                    $('#privateColls').append(newCard); // Is this the problem line
                    
                    me.cdRef.detectChanges();
                  }
                  */
            });
        });
    };
    ;
    PrivateComponent.prototype.edit = function (card) {
        console.log($(this).parent().siblings('div').children('h4').text());
        console.log('sanity');
        console.log("The object selected: " + JSON.stringify(card));
        card.showEdit = !card.showEdit;
    };
    ;
    PrivateComponent.prototype.saveEdits = function (card) {
        // Bring in the edit variables
        card.title = this.currentTitle;
        console.log("The updated title: " + card.title);
    };
    //Routing
    PrivateComponent.prototype.allColls = function () {
        this.router.navigate(['./public']);
    };
    ;
    PrivateComponent.prototype.myColls = function () {
        this.router.navigate(['./private']);
    };
    ;
    PrivateComponent.prototype.createColl = function () {
        this.router.navigate(['./create']);
    };
    ;
    PrivateComponent.prototype.searchDB = function () {
        this.router.navigate(['./search']);
    };
    PrivateComponent = __decorate([
        core_1.Component({
            selector: 'app-private',
            templateUrl: './private.component.html',
            styleUrls: ['./private.component.css'],
            changeDetection: core_2.ChangeDetectionStrategy.OnPush
        })
    ], PrivateComponent);
    return PrivateComponent;
}());
exports.PrivateComponent = PrivateComponent;
