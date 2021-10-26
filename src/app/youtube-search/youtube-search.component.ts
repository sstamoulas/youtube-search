import { Component, OnInit } from '@angular/core';
import { SearchResult } from './../search-result/search-result.model';

@Component({
  selector: 'youtube-search',
  templateUrl: './youtube-search.component.html'
})

export class YoutubeSearchComponent implements OnInit {
  results: SearchResult[];
  loading: Boolean;

  constructor() {}

  ngOnInit() {}

  updateResults(results: SearchResult[]): void {
    this.results = results;

    //console.log("results:", this.results); // uncomment to take a look
  }
}