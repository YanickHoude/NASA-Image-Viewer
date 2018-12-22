import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    
    isVerified: boolean = false;
    activeUser: string = '';
    isAdmin: boolean = false;
    
    //if user is authenticated variables are set to true and active user is saved so that site can be accessed
    
    authenticated(email:string){
        this.isVerified = true;
        this.activeUser = email;
    };
    
    //set admin state
    adminSignIn(){
        this.isAdmin = true;
    };
    
    //return admin state
    getAdminStatus(){
        return this.isAdmin;
    }
    
    //check if user is verified
    check(){
        if(this.isVerified){
            return true;
        }
        else{
            return false;
        }
    };
    
    //get email of verified user
    getEmail(){
        return this.activeUser;
    };
 }
  
