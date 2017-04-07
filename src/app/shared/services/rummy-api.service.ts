import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class RummyApiService {

  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: Http) {
  }

  request(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.request(this.apiBaseUrl + url, options);
  }

  get(url: string, options?: RequestOptionsArgs, absoluteUrl: boolean = false): Observable<Response> {
    return this.http.get(absoluteUrl ? url : (this.apiBaseUrl + url), options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(this.apiBaseUrl + url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(this.apiBaseUrl + url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(this.apiBaseUrl + url, options);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(this.apiBaseUrl + url, body, options);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(this.apiBaseUrl + url, options);
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.options(this.apiBaseUrl + url, options);
  }

}
