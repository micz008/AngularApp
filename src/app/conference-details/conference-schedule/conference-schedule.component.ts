import { Component, OnInit } from "@angular/core";
import { ConferenceDetailService } from "src/app/shared/conference-detail.service";

@Component({
  selector: "app-conference-schedule",
  templateUrl: "./conference-schedule.component.html",
  styles: []
})
export class ConferenceScheduleComponent implements OnInit {
  constructor(public service: ConferenceDetailService) {}

  ngOnInit() {}
}
