import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, ActivationStart, UrlSegment } from '@angular/router';

@Injectable()
export class CompetitionService {

  // property to toggle active state
  isActive = new BehaviorSubject<string>('fixtures');
  routeParam = new BehaviorSubject<string>('2021');
  teamFixtures = new BehaviorSubject< { [param: string]: any}[]>([]);

  httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': environment.headerToken
    })
  };

  constructor() {}

  getTeamFixtures() {

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
    // subscribe to router events
    router.events.subscribe( (event) => {
      if (event instanceof ActivationStart) {

        // change the state of isActive
        this.isActive.next(event.snapshot.url[0].path);

        // ignore if value of first path is team
        if (this.isActive.value !== 'team') {
          this.routeParam.next(event.snapshot.url[1].path);
        }
      }

    });
  }
}
