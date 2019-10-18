import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { NetworkState} from './../network.model';

import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, ActivationStart, UrlSegment } from '@angular/router';

@Injectable()
export class CompetitionService {

  // property to toggle active state
  isActive = new BehaviorSubject<string>('fixtures');
  routeParam = new BehaviorSubject<string>('2021');
  teamFixtures = new BehaviorSubject< { [param: string]: any}>({});
  activeTeamFixtures = new BehaviorSubject< { [param: string]: any}[]>([]);

  networkStateCompetition = new BehaviorSubject<NetworkState>({'name': 'competition', 'state': 'default'});


  baseUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': environment.headerToken
    })
  };

  // use moment.js to format date
  // to get 30 days of all fixtures
  // previous 15 days and next 15 days
  dateFrom = moment().subtract(15, 'days').format('YYYY-MM-DD');
  dateTo = moment().add(15, 'days').format('YYYY-MM-DD');

  constructor(private _http: HttpClient) {}

  getTeamFixtures(teamCode) {

    const url = `teams/${teamCode}/matches?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}`;
    // check if fixtures exits
    if (!this.teamFixtures.value[teamCode]) {

      this.fetchData(url).subscribe( (data: any) => {
        if (data.error) {
          this.networkStateCompetition.next({name: 'fetchTeamFixtures', state : 'client error'});
        } else {
          this.teamFixtures.next(data.matches);
          this.activeTeamFixtures.next(data.matches);
          this.networkStateCompetition.next({name: 'fetchTeamFixtures', state : 'success'});
        }
      }, err => {
        this.networkStateCompetition.next({name: 'fetchTeamFixtures', state : 'network error'});
        console.log(err);
      });
    } else {
      this.teamFixtures.next(this.teamFixtures.value[teamCode]);
    }

  }

  fetchData(url) {
    return this._http.get(`${this.baseUrl}${url}`, this.httpOptions);
  }

  // get initial activated route
  getActivatedRoute(route) {
    route.children[0].url.subscribe( (urlSegment: UrlSegment[]) => {
      this.isActive.next(urlSegment[0].path);

      // ignore if value of first path is team
      if (this.isActive.value !== 'team') {
        this.routeParam.next(urlSegment[1].path);
      }
    });
  }

  subscribeToRoute(router) {
    // subscribe to subsequent router events
    router.events.subscribe( (event) => {
      if (event instanceof ActivationStart) {

        // change the state of isActive
        this.isActive.next(event.snapshot.url[0].path);

        // ignore if value if first path is team
        if (this.isActive.value !== 'team') {
          this.routeParam.next(event.snapshot.url[1].path);
        }
      }

    });
  }
}
