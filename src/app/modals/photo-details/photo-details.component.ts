import {Component, Input, OnInit} from '@angular/core';
import {WebService} from '../../services/web.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  @Input() photo;
  photoInfo: any = [];
  constructor(private webservice: WebService) { }

  ngOnInit() {
    console.log(this.photo);
    this.getPhotoInfo();
  }

  getPhotoInfo(){
    const requestData = {
      'photo_id' : this.photo.id
    }
    this.webservice.getPhotoInfo(requestData).subscribe(data => {
        if( data.stat === 'ok') {
          this.photoInfo = data.photo
          console.log(this.photoInfo);
        }
    });

  }

}
