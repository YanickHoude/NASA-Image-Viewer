"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SearchbarComponent = (function () {
    function SearchbarComponent(_dataservice) {
        this._dataservice = _dataservice;
        this.searchText = '';
        this.test = "asdf";
        this.testArray = ['1', '2', '3', '4'];
    }
    ;
    // Display the current value of the string in the console log
    SearchbarComponent.prototype.searchDB = function () {
        console.log("The value of the variable: " + this.searchText);
        //creating an object that holds what the user searched
        var postObj = { property: this.searchText };
        //working example
        // this._dataservice.getImages().subscribe(res =>  this.test =JSON.stringify(res));
        // return as type json
        this._dataservice.searchImages(postObj).subscribe(function (res) {
            //console.log(JSON.stringify(this.test));
            //create empty array that will hold object in NASA collectio
            var nasaItems = [];
            // Iterate through all objects in the NASA collection to find each picture link
            var temp = {
                href: ""
            };
            console.log("The amount of items: " + (JSON.parse(res["_body"]).collection.items.length));
            for (var _i = 0, _a = (JSON.parse(res["_body"]).collection.items); _i < _a.length; _i++) {
                var object = _a[_i];
                // Put each image object with info into an array
                nasaItems.push(object);
            }
            // Set our array to a class object so that it can be referenced in the HTML file. 
            this.nasaObjects = nasaItems;
            // Current problem is we neet to figure out how to get our array to automically update when the array is changed.
            // This is dumb becuase angular 1 automatically checks if an array is updated. 
            console.log("The new array: " + JSON.stringify(this.nasaObjects));
        });
    };
    SearchbarComponent = __decorate([
        core_1.Component({
            selector: 'app-searchbar',
            templateUrl: './searchbar.component.html',
            styleUrls: ['./searchbar.component.css']
        })
    ], SearchbarComponent);
    return SearchbarComponent;
}());
exports.SearchbarComponent = SearchbarComponent;
