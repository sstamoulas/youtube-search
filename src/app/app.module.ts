import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormsModule } from'@angular/forms';
import{ HttpClientModule } from'@angular/common/http';

import { AppComponent } from './app.component';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
