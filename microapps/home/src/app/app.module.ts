import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SingleSpaModule } from 'single-spa-angular-cli/angular';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SingleSpaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
