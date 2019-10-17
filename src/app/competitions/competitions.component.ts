import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, UrlSegment } from '@angular/router';

import { AppService } from './../app.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  routeParam;
  // property to toggle active state
  isActive;

  constructor(private _appService: AppService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    // subscribe to the url of the first child
    this.route.children[0].url.subscribe( (urlSegment: UrlSegment[]) => {
      this.isActive = urlSegment[0].path;
      this.routeParam  = urlSegment[1].path;
    });

  }

  // manage routing from tab
  routeToComponent(componentName) {

    // get params of the active child route
    switch (componentName) {
      case 'fixtures':
        this.router.navigateByUrl(`/competitions/${componentName}/${this.routeParam}`);
        this.isActive = componentName;
        break;

      case 'table':
        this.router.navigateByUrl(`/competitions/${componentName}/${this.routeParam}`);
        this.isActive = componentName;
        break;

      default:
        this.router.navigateByUrl(`/competitions/${componentName}/${this.routeParam}`);
        this.isActive = componentName;
        break;
    }
  }

}
