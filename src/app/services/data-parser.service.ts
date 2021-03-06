import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataParserService {

  constructor() { }

  // receive response from HTTP request, and filter out data with missing fields / irrelevant data
  prasePhotos(response) {
    const responseData = []
    if (response.stat === 'ok') {
        if (response.photos.photo.length) {
           response.photos.photo.forEach( photo => {
             if (photo.url_m && photo.url_h) {
               responseData.push(photo);
             }
            });
           return responseData;

        } else {
          alert('No Result Found');
        }
    } else {
      alert('Something went wrong');
    }
  }

}
