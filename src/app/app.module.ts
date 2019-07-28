import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { ConferenceDetailsComponent } from "./conference-details/conference-details.component";
import { ConferenceDetailComponent } from "./conference-details/conference-detail/conference-detail.component";
import { ConferenceDetailListComponent } from "./conference-details/conference-detail-list/conference-detail-list.component";
import { ConferenceDetailService } from "./shared/conference-detail.service";
import { ConferenceScheduleComponent } from './conference-details/conference-schedule/conference-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    ConferenceDetailsComponent,
    ConferenceDetailComponent,
    ConferenceDetailListComponent,
    ConferenceScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ConferenceDetailService],
  bootstrap: [AppComponent]
})
export class AppModule {}
