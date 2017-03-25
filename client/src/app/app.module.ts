import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ApolloModule} from "apollo-angular";
import {getAppoloClientConfig} from "./graphql.config";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.forRoot(getAppoloClientConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
