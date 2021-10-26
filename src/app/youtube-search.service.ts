import {
  Component,
  Injectable,
  OnInit,
  ElementRef,
  EventEmitter,
  Inject
} from '@angular/core';
import{ HttpClient } from'@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchResult } from './search-result/search-result.model';

/*
  This API key may or may not work for you. Your best bet is to issue your own
  API key by following these instructions:
  https://developers.google.com/youtube/registering_an_application#Create_API_Keys
  Here I've used a **server key** and make sure you enable YouTube.
  Note that if you do use this API key, it will only work if the URL in
  your browser is "localhost"
*/
export var YOUTUBE_API_KEY: string = 'AIzaSyBYoXUVMUYkhnjAXF4QdEzJi66Qbrq-6Dk';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';

/**
 * YouTubeService connects to the YouTube API
 * See: * https://developers.google.com/youtube/v3/docs/search/list
 */
@Injectable()
export class YoutubeSearchService {
  constructor(
              private http: HttpClient,
              @Inject(YOUTUBE_API_KEY) private apiKey: string,
              @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) {}

  search(query:string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    const queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl)
      .pipe(map((response: Response) => {
        return (<any>response).items.map(item => {
          // console.log("raw item", item); // uncomment if you want to debug
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      }));
  }
}
