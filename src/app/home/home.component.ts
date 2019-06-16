import { Component, OnInit } from '@angular/core';
import { WebService} from '../services/web.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService} from '../services/common.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PhotoDetailsComponent} from '../modals/photo-details/photo-details.component';
import {DataParserService} from '../services/data-parser.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photos = []; // Photos object for populating in HTML
  pageNumber =  1;
  searchForm: FormGroup;
  searchText: string;
  perPage = 30;
  recentSearch = [];
  waitLoader = false;

  constructor(private webServices: WebService, // WebServices Handles HTTP request
              private commonService: CommonService, // Service that contains common function that can be used in any component
              private modalService: NgbModal,
              private dataParser: DataParserService) { }  // Dataparse services that validated incoming data from the API

  ngOnInit() {
    document.body.style.background = '#000';
    this.searchForm = new FormGroup({
      'searchText' : new FormControl()
    });
    this.recentSearch = this.commonService.getDataFromCookies('search_history');
  }

  // Search Function which store data in the cookies and call Flickr API
  search() {
    this.photos = [];
    if (this.searchForm.value.searchText){
      this.commonService.storeDataInCookies(this.searchForm.value.searchText);
    }
    this.recentSearch = this.commonService.getDataFromCookies('search_history')
    this.searchText = this.searchForm.value.searchText;
    this.getPhotos(this.searchText, this.pageNumber, this.perPage);
  }

  // When user Click on the recent search chips, make call again to FLickr API
  recentSearchs(search) {
    this.photos = [];
    this.pageNumber = 1;
    this.searchText  = search;
    this.getPhotos(search, this.pageNumber, this.perPage);
  }

  // Remove recent search from Cookies
  remove(text) {
    this.recentSearch =  this.commonService.removeDataFromCookies(text);
  }

  // Function which makes call to WebService function, which returns data from the Flickr API
  getPhotos(searchText, pageNumber, perPage) {
      if (!searchText) {
        return;
      }
      this.waitLoader = true;
      const requestData = {
        'search_text' : searchText,
        'page_number' : pageNumber,
        'per_page' : perPage
      };
      this.webServices.getFlickerPhotos(requestData).subscribe(response => {
        this.waitLoader = false
        const parsedPhotos = this.dataParser.prasePhotos(response);
        parsedPhotos.forEach((photo) => {
          this.photos.push(photo);
        });
    });


  }

  // This function get called when User scrolls to end of the page,
  // Pagenumber is incremented by when, which is then passed as API param to fetch data from the next page
  onScroll() {
    this.pageNumber++;
    this.getPhotos(this.searchText, this.pageNumber, this.perPage);
  }

  // When we tap on photo, bootsrap modal open with image title and description
  getPhotoInfo(photo, e) {
    const modalRef = this.modalService.open(PhotoDetailsComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.photo = photo;
  }

}
