import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    result:any;
    
    constructor(private _http: Http) {
    }
    
    getImages(){
        
        return this._http.get("/api/getImages").map(result =>  this.result = result);
    }
    
    //working for previous set u
    searchImages(obj){
        return this._http.post("/api/searchQuery", obj).map(result =>  this.result = result);
    }
    
    
    
}
