import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    
    isVerified: boolean = false;
    activeUser: string = '';
    isAdmin: boolean = false;
    
    authenticated(email:string){
        this.isVerified = true;
        this.activeUser = email;
        console.log(this.activeUser);
    };
    
    adminSignIn(){
        this.isAdmin = true;
    };
    
    getAdminStatus(){
        return this.isAdmin;
    }
    
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
    };
 }
  
