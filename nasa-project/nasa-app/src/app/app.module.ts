import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//import modules
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

//import services
import {DataService} from './data.service';
import {AuthService} from './services/auth.service';
import {ViewService} from './services/view.service';

//import components
import { ImageviewComponent } from './components/imageview/imageview.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { LoginComponent } from './components/login/login.component';
import { PublicComponent } from './components/public/public.component';
import { PrivateComponent } from './components/private/private.component';
import { CreateComponent } from './components/create/create.component';
import { SearchComponent } from './components/search/search.component';

// Using NgModel for variable binding in HTML
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    ImageviewComponent,
    SearchbarComponent,
    LoginComponent,
    PublicComponent,
    PrivateComponent,
    CreateComponent,
    SearchComponent,
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
        path: 'public',
        component: PublicComponent
      },
      
       {
        path: 'private',
        component: PrivateComponent
      },
      
      {
        path: 'create',
        component: CreateComponent
      },
      
      {
        path: 'search',
        component: SearchComponent
      },
      
      {
        path: 'imageView',
        component: ImageviewComponent
      },
      
      ])
  ],
  
  providers: [DataService, AuthService, ViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
