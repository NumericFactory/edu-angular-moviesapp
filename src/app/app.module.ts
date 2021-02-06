import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

import { CuttextPipe } from './shared/pipes/cuttext.pipe';
import { RatingsComponent } from './shared/ratings/ratings.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    CuttextPipe,
    RatingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
