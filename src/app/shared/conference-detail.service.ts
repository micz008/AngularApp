import { Injectable } from "@angular/core";
import { ConferenceDetail } from "./conference-detail.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConferenceSchedule } from "./conference-schedule.model";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";
import { strictEqual } from "assert";

@Injectable({
  providedIn: "root"
})
export class ConferenceDetailService {
  formData: ConferenceDetail;
  //readonly rootURL = "http://localhost:53743/api/";
  readonly rootURL =
    "https://8jmj424b4d.execute-api.us-west-2.amazonaws.com/Prod/api/";
  list: ConferenceDetail[];
  confSched: ConferenceSchedule[];

  constructor(private http: HttpClient) {}

  postConferenceDetail() {
    return this.http.post(this.rootURL + "conferenceList", this.formData);
  }

  // putConferenceDetail() {
  //   return this.http.put(
  //     this.rootURL + "conferenceList/" + this.formData.SessName,
  //     this.formData
  //   );
  // }

  deleteConferenceDetail(name) {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      body: {
        SessName: name
      }
    };
    return this.http.delete(this.rootURL + "conferenceList", options);
  }

  refreshList() {
    this.http
      .get(this.rootURL + "conferenceList")
      .toPromise()
      .then(res => this.convertList(res));
  }

  convertList(dictionary) {
    console.log(dictionary);
    let convertedList = [];
    for (const [key, value] of Object.entries(dictionary)) {
      convertedList.push({ SessName: key, SessDuration: value });
    }
    console.log(convertedList);
    this.list = convertedList as ConferenceDetail[];
    //console.log(this.list);
  }

  generateSchedule() {
    let val = [];
    let sess = {
      TrackName: "",
      TrackSessions: []
    };
    var startTime = 5400;
    var count = 1;
    var newTrack = 0;
    let num = this.list.length;

    this.list.forEach(sessData => {
      num--;
      let sesSched = {};
      let formattedTime = new Date(startTime * 1000).toLocaleTimeString(
        "en-US",
        { hour: "2-digit", minute: "2-digit" }
      );

      if (startTime == 5400) {
        sess.TrackName = "Track " + count;
      }

      startTime = startTime + sessData.SessDuration * 60;

      if (startTime > 34200) {
        sesSched = {
          SessName: "Networking Event",
          SessTime: formattedTime
        };
        sess.TrackSessions.push(sesSched);
        val.push(sess);

        sess = {
          TrackName: "",
          TrackSessions: []
        };
        sesSched = {};
        startTime = 5400;
        newTrack = 0;
        count++;
        formattedTime = new Date(startTime * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        });

        sess.TrackName = "Track " + count;
        startTime = startTime + sessData.SessDuration * 60;
      }

      if (startTime <= 34200) {
        if (startTime > 16200 && newTrack == 0) {
          formattedTime = new Date(16200 * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          });
          sesSched = {
            SessName: "Lunch Break",
            SessTime: formattedTime
          };
          sess.TrackSessions.push(sesSched);
          newTrack = 1;
          startTime = 19800;
          formattedTime = new Date(startTime * 1000).toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit"
            }
          );
          startTime = startTime + sessData.SessDuration * 60;
        }

        sesSched = {
          SessName: sessData.SessName,
          SessTime: formattedTime
        };
        sess.TrackSessions.push(sesSched);

        if (num <= 0) {
          if (startTime > 30600 && startTime < 34200) {
            formattedTime = new Date(startTime * 1000).toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit"
              }
            );
          } else {
            formattedTime = new Date(30600 * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            });
          }

          sesSched = {
            SessName: "Networking Event",
            SessTime: formattedTime
          };
          sess.TrackSessions.push(sesSched);

          val.push(sess);
        }
      }
    });

    this.confSched = val as ConferenceSchedule[];
    console.log(val);
  }
}
