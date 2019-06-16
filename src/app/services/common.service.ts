import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private cookieData = [];
  constructor(private cookieService: CookieService) { }


  // Storedata in Cookies as key value pair, After converting to string
  storeDataInCookies(text) {
    if (this.cookieService.get('search_history')) {
      this.cookieData = JSON.parse(this.cookieService.get('search_history'));
    }
    this.cookieData.unshift(text);
    this.cookieService.set( 'search_history', JSON.stringify(this.cookieData));
    return this.cookieData;
  }

  //  getting data from cookies by passing key to it
  getDataFromCookies(key) {
    if (this.cookieService.get(key)) {
      return JSON.parse(this.cookieService.get(key));
    }
  }

  // removes a search keyword from cookies
  removeDataFromCookies(text) {
    if (this.cookieService.get('search_history')) {
      this.cookieData = JSON.parse(this.cookieService.get('search_history'));
    }

    let index = this.cookieData.indexOf(text);
    if (index !== -1) {
      this.cookieData.splice(index, 1);
    }
    this.cookieService.set( 'search_history', JSON.stringify(this.cookieData));
    return this.cookieData;
  }
}
