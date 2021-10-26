import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormsModule } from'@angular/forms';
import{ HttpClientModule } from'@angular/common/http';

import { AppComponent } from './app.component';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { YoutubeSearchInjectables } from './youtube-search/youtube-search.injectables';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    SearchResultComponent,
    YoutubeSearchComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [YoutubeSearchInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
