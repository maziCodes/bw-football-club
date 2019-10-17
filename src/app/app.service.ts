import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  baseUrl = 'https://api.football-data.org/v2/';
  plan = '&plan=TIER_ONE';

  team = new BehaviorSubject< { [param: string]: any}>({});
  competitions = new BehaviorSubject< { [param: string]: any}[]>([]);
  teams = new BehaviorSubject< { [param: string]: any}>({});
  activeTeams = new BehaviorSubject< { [params: string]: any}[]>([]);
  networkState = new BehaviorSubject<NetworkState>({'name': 'app', 'state': 'default'});

  httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': 'f76a97c0bad842ebaf7981a70d58355e'
    })
  };

  constructor(private _http: HttpClient) { }

    // set team
    setTeam(team) {
      this.team.next(team);
    }

  fecthCompetitions() {
    this.fecthData(`competitions?areas=2021,2072,2077,2088,2114,2187,2224,2267&plan=TIER_ONE`)
    .subscribe( (data: any) => {
      if (data.error) {
        this.networkState.next({name: 'fetchCompetition', state : 'client error'});
      } else {
        this.competitions.next(data['competitions']);
        this.networkState.next({name: 'fetchCompetition', state : 'success'});
      }
    }, err => {
      this.networkState.next({name: 'fetchCompetition', state : 'network error'});
    });
  }


  fecthTeams(competitionCode) {
    // check if team exits before calling api
    if (!this.teams.value[competitionCode]) {

      this.fecthData(`competitions/${competitionCode}/teams`)
      .subscribe( (data: any) => {
        if (data.error) {
          this.networkState.next({name: 'fecthTeam', state : 'client error'});
        } else {
          // update teams and activeTeams
          this.teams.value[competitionCode] = data.teams;
          this.activeTeams.next(data.teams);
          this.networkState.next({name: 'fecthTeam', state : 'success'});
        }
      }, err => {
        this.networkState.next({name: 'fecthTeam', state : 'network error'});

      } );
    } else {
      this.activeTeams.next(this.teams.value[competitionCode]);
    }
  }

  fecthData(params) {
    return this._http.get(`${this.baseUrl}${params}`, this.httpOptions);
  }

}

export interface NetworkState {
  state: 'success' | 'client error' | 'network error' | 'default';
  name: string;
}
