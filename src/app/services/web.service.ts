import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  getFlickerPhotos(requestData) {
    const params = new HttpParams().set('api_key' , environment.API_KEY)
      .set('extras', 'url_m,url_c,url_l,url_h,url_o')
      .set('format', 'json')
      .set('method', 'flickr.photos.search')
      .set('page', requestData.page_number)
      .set('per_page', requestData.per_page)
      .set('text', requestData.search_text)
      .set('nojsoncallback', '1');
    return this.http.get<any>(`${environment.BASE_URL}`, {params: params} );
  }

}
