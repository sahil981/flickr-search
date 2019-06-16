import {Component, Input, OnInit} from '@angular/core';
import {WebService} from '../../services/web.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  @Input() photo;
  photoInfo: any = [];
  constructor(private webservice: WebService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getPhotoInfo();
  }

  // Call the Flickr API for Photos information
  getPhotoInfo() {
    const requestData = {
      'photo_id' : this.photo.id
    }
    this.webservice.getPhotoInfo(requestData).subscribe(data => {
        if ( data.stat === 'ok') {
          this.photoInfo = data.photo;
        }
    });

  }

}
