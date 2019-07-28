import { Component, OnInit } from "@angular/core";
import { ConferenceDetailService } from "src/app/shared/conference-detail.service";
import { NgForm } from "@angular/forms";
import { from } from "rxjs";
import { ConferenceDetail } from "src/app/shared/conference-detail.model";

@Component({
  selector: "app-conference-detail",
  templateUrl: "./conference-detail.component.html",
  styles: []
})
export class ConferenceDetailComponent implements OnInit {
  constructor(public service: ConferenceDetailService) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      SessName: "",
      SessDuration: null
    };
  }

  onSubmit(form: NgForm) {
    // if (this.service.formData.Id == 0) this.insertRecord(form);
    // else this.updateRecord(form);
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postConferenceDetail().subscribe(
      res => {
        this.resetForm(form);
        console.log("Submitted successfully");
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  // updateRecord(form: NgForm) {
  //   this.service.putConferenceDetail().subscribe(
  //     res => {
  //       this.resetForm(form);
  //       console.log("Submitted successfully");
  //       this.service.refreshList();
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
}
