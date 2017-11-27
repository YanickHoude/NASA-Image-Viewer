import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//import modules
import{HttpModule} from '@angular/http';

//import services
import {DataService} from './data.service';

//import components
import { ImageviewComponent } from './components/imageview/imageview.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

// Using NgModel for variable binding in HTML
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ImageviewComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule, //add Http Module
    FormsModule
  ],
  providers: [DataService], //add Dataservice
  bootstrap: [AppComponent]
})
export class AppModule { }
