import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//import modules
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

//import services
import {DataService} from './data.service';
import {AuthService} from './services/auth.service';

//import components
import { ImageviewComponent } from './components/imageview/imageview.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

// Using NgModel for variable binding in HTML
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ImageviewComponent,
    SearchbarComponent,
    LoginComponent,
    ProfileComponent
  ],
  
  imports: [
    BrowserModule,
    HttpModule, //add Http Module
    FormsModule,
    RouterModule.forRoot([
      
      {
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full'
        
      },
      
      {
        path: 'login', 
        component: LoginComponent
        
      },
      
      {
        path: 'profile', 
        component: ProfileComponent
      }
      
      ])
  ],
  
  providers: [DataService, AuthService], //add Dataservice
  bootstrap: [AppComponent]
})
export class AppModule { }
