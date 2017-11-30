import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    
    isVerified: boolean = false;
    activeUser: string = '';
    
    authenticated(email:string){
        this.isVerified = true;
        this.activeUser = email;
        console.log(this.activeUser);
    };
    
    check(){
        if(this.isVerified){
            return true;
        }
        else{
            return false;
        }
    };
    
    getEmail(){
        return this.activeUser;
    }
 }
  
