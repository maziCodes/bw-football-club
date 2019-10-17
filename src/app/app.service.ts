import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  baseUrl = 'https://api.football-data.org/v2/';
  plan = '&plan=TIER_ONE';

  competitions = new BehaviorSubject<{ [param: string]: any}[]>([]);
  teams = new BehaviorSubject<{ [param: string]: any}>({});
  activeTeams = new BehaviorSubject< { [params: string]: any}[]>([]);

  httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': 'f76a97c0bad842ebaf7981a70d58355e'
    })
  };

  constructor(private _http: HttpClient) { }

  fecthCompetitions() {
    this.fecthData(`competitions?areas=2021,2072,2077,2077,2081,2088,2114,2187,2224,2267&plan=TIER_ONE`)
    .subscribe( (data: any) => {
      this.competitions.next(data['competitions']);
    });
  }

  fecthTeams(competitionCode) {
    if (!this.teams.value[competitionCode]) {
      this.fecthData(`competitions/${competitionCode}/teams`)
      .subscribe( (data: any) => {
        this.teams.value[competitionCode] = data.teams;
        this.activeTeams.next(data.teams);
      } );
    } else {
      console.log("competition exists", competitionCode)
      this.activeTeams.next(this.teams.value[competitionCode]);
    }
  }

  fecthData(params) {
    return this._http.get(`${this.baseUrl}${params}`, this.httpOptions);
  }

}
