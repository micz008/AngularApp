import { Component, OnInit } from "@angular/core";
import { ConferenceDetailService } from "src/app/shared/conference-detail.service";
import { ConferenceDetail } from "src/app/shared/conference-detail.model";

@Component({
  selector: "app-conference-detail-list",
  templateUrl: "./conference-detail-list.component.html",
  styles: []
})
export class ConferenceDetailListComponent implements OnInit {
  constructor(public service: ConferenceDetailService) {}

  ngOnInit() {
    this.service.refreshList();
  }

  // populateForm(cd: ConferenceDetail) {
  //   this.service.formData = Object.assign({}, cd);
  // }

  onGenerateSched() {
    this.service.generateSchedule();
  }

  onDelete(SessName) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.deleteConferenceDetail(SessName).subscribe(
        res => {
          this.service.refreshList();
          console.log("Deleted successfully!");
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
