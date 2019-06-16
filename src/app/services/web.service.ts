import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  // Make http GET request to flickr Server for Image search by keyword
  getFlickerPhotos(requestData) {
    // Setting params for the GET request
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

  // Makes http GET request for image information by image ID
  getPhotoInfo(requestData) {
    const params = new HttpParams().set('api_key' , environment.API_KEY)
      .set('photo_id', requestData.photo_id)
      .set('format', 'json')
      .set('method', 'flickr.photos.getInfo')
      .set('nojsoncallback', '1');
    return this.http.get<any>(`${environment.BASE_URL}`, {params: params} );
  }

}
