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
  photos = [];
  pageNumber =  1;
  searchForm: FormGroup;
  searchText: string;
  perPage = 30;
  recentSearch = [];
  waitLoader = false;

  constructor(private webServices: WebService,
              private commonService: CommonService,
              private modalService: NgbModal,
              private dataParser: DataParserService) { }

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
      this.waitLoader = true;
      const requestData = {
        'search_text' : searchText,
        'page_number' : pageNumber,
        'per_page' : perPage
      };
      this.webServices.getFlickerPhotos(requestData).subscribe(response => {
        this.waitLoader = false
        let parsedPhotos = this.dataParser.prasePhotos(response);
        parsedPhotos.forEach((photo) => {
          this.photos.push(photo);
        });
    });


  }

  onScroll() {
    this.pageNumber++;
    this.getPhotos(this.searchText, this.pageNumber, this.perPage);
  }

  getPhotoInfo(photo, e) {
    const modalRef = this.modalService.open(PhotoDetailsComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.photo = photo;
  }

}
