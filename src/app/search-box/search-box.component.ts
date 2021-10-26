import { 
  Component, 
  OnInit, 
  Output,
  ElementRef,
  EventEmitter 
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, filter, tap, switchMap } from 'rxjs/operators';

import { SearchResult } from './../search-result/search-result.model'
import { YoutubeSearchService } from './../youtube-search.service';

@Component({
  selector: 'search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();
  
  constructor(
    private youtube: YoutubeSearchService,
    private el: ElementRef) {
  }

  ngOnInit(): void {
    // convert the `keyup` event into an observable stream
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value), // extract the value of the input
        filter((text: string) => text.length > 1), // filter out if empty
        debounceTime(250),                         // only once every 250ms
        tap(() => this.loading.emit(true)),         // enable loading
        // search, discarding old events if new input comes in
        switchMap((query: string) => this.youtube.search(query)),
      )
      // act on the return of the search
      .subscribe(
        (results: SearchResult[]) => { // on sucesss
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.emit(false);
        },
        () => { // on completion
          this.loading.emit(false);
        }
      );
  }
}
