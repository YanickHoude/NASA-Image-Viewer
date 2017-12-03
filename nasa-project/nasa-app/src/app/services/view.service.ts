import { Injectable } from '@angular/core';

@Injectable()
export class ViewService {
    
    collectionViewed: any;
    hasRouted: boolean = false;
    lastRoute: any;
    isPrivate: boolean = false;
    
    setCollectionViewed(collection:any, last:any, priv:boolean){
        this.collectionViewed = collection;
        this.hasRouted = true;
        this.lastRoute = last;
        this.isPrivate = priv;
    }
    
    getCollectionViewed(){
        return this.collectionViewed;
    }
    
    getRouted(){
        return this.hasRouted;
    }
    
    getLastRoute(){
        return this.lastRoute;
    }

    getPrivacy(){
        return this.isPrivate;
    }
}
