import { Component, OnInit } from '@angular/core';
import { WebService} from '../services/web.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService} from '../services/common.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photos = [];
  pageNumber =  1;
  searchForm: FormGroup;
  searchText: string;
  perPage = 30;
  recentSearch = [];

  constructor(private webServices: WebService,
              private commonService: CommonService) { }

  ngOnInit() {
    document.body.style.background = '#000';
    this.searchForm = new FormGroup({
      'searchText' : new FormControl()
    });
    this.recentSearch = this.commonService.getDataFromCookies('search_history');
  }

  search() {
    this.photos = [];
    this.recentSearch = this.commonService.storeDataInCookies(this.searchForm.value.searchText);
    this.searchText = this.searchForm.value.searchText;
    this.getPhotos(this.searchText, this.pageNumber, this.perPage);
  }

  recentSearchs(search) {
    this.photos = [];
    this.getPhotos(search, this.pageNumber, this.perPage);
  }

  remove(text) {
    this.recentSearch =  this.commonService.removeDataFromCookies(text);
  }

  getPhotos(searchText, pageNumber, perPage) {
      const requestData = {
        'search_text' : searchText,
        'page_number' : pageNumber,
        'per_page' : perPage
      };
      this.webServices.getFlickerPhotos(requestData).subscribe(data => {
        const Data  = data.photos.photo;
        Data.forEach( (photo) => {
          this.photos.push(photo);
        });
    });


  }

  onScroll() {
    this.pageNumber++;
    this.getPhotos(this.searchText, this.pageNumber, this.perPage);
  }

}
