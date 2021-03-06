import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {WebService} from './services/web.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CookieService } from 'ngx-cookie-service';
import { PhotoDetailsComponent } from './modals/photo-details/photo-details.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhotoDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgbModule.forRoot(),
],
  providers: [WebService, CookieService],
  entryComponents: [PhotoDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
