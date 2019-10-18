import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import * as moment from 'moment';
import { NetworkState } from './network.model';

@Injectable()
export class AppService {
  baseUrl = environment.baseUrl;

  team = new BehaviorSubject< { [param: string]: any}>({});
  // activeTeam = new BehaviorSubject< { [param: string]: any}>[]([]);
  competitions = new BehaviorSubject< { [param: string]: any}[]>([]);

  competitionsFixtures = new BehaviorSubject< { [param: string]: any}>({});
  activeCompetitionsFixtures = new BehaviorSubject< { [param: string]: any}[]>([]);
  competitionCode = new BehaviorSubject<string>('');
  pageTitle = new BehaviorSubject<string>('Premier League');

  // store all the accessed teams
  teams = new BehaviorSubject< { [param: string]: any}>({});
  activeTeams = new BehaviorSubject< { [params: string]: any}[]>([]);
  networkState = new BehaviorSubject<NetworkState>({'name': 'app', 'state': 'default'});

  httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': environment.headerToken
    })
  };

  // use moment.js to format date
  // to get 10 days of all fixtures
  // previous 5 days and next 5 days
  dateFrom = moment().subtract(5, 'days').format('YYYY-MM-DD');
  dateTo = moment().add(5, 'days').format('YYYY-MM-DD');

  constructor(private _http: HttpClient) { }

    // set team
    setTeam(team) {
      this.team.next(team);
    }

  fetchCompetitions() {
    this.fetchData(`competitions?areas=2021,2072,2077,2088,2114,2187,2224&plan=TIER_ONE`)
    .subscribe( (data: any) => {
      if (data.error) {
        this.networkState.next({name: 'fetchCompetition', state : 'client error'});
      } else {
        // delete European Championship
        data.competitions.forEach(element => {
          if (element.name === 'European Championship') {
            delete element.name;
          }
        });

        this.competitions.next(data['competitions']);
        this.networkState.next({name: 'fetchCompetition', state : 'success'});
      }
    }, err => {
      this.networkState.next({name: 'fetchCompetition', state : 'network error'});
    });
  }


  fetchTeams(competitionCode) {
    this.competitionCode.next(competitionCode);
    // check if team exits before calling api
    if (!this.teams.value[competitionCode] || this.teams.value[competitionCode].lenght < 1) {

      this.fetchData(`competitions/${competitionCode}/teams`)
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

  fetchCompetitionFixtures(competitionCode) {
    this.competitionCode.next(competitionCode);
    if (!this.competitionsFixtures.value[competitionCode] || this.competitionsFixtures.value[competitionCode] < 1) {

    this.fetchData(`matches?competitions=${competitionCode}&dateTo=${this.dateTo}&dateFrom=${this.dateFrom}`)
    .subscribe( (data: any) => {
      if (data.error) {
        this.networkState.next({name: 'fetchCompetitionFixtures', state : 'client error'});
      } else {
        // update teams and activeTeams
        this.competitionsFixtures.value[competitionCode] = data.matches;
        this.activeCompetitionsFixtures.next(data.matches);
        this.networkState.next({name: 'fetchCompetitionFixtures', state : 'success'});
      }
    }, err => {
      this.networkState.next({name: 'fetchCompetitionFixtures', state : 'network error'});
    } );

  } else {
      this.activeCompetitionsFixtures.next(this.competitionsFixtures.value[competitionCode]);
    }
  }

  setPageTitle() {

    //  check if competition has value
    if (this.competitions.value || this.competitions.value.length > 0) {
      const currentTitle = this.competitions.value.filter( (element) => element.id === this.competitionCode.value);
      this.pageTitle.next(currentTitle[0].name);
    }

  }

  fetchData(params) {
    return this._http.get(`${this.baseUrl}${params}`, this.httpOptions);
  }

}
