import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { AppService } from './../app.service';
import { CompetitionService } from './competition.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  routeParam;

  constructor(private _appService: AppService,
    private route: ActivatedRoute, private router: Router,
    public _competitionService: CompetitionService) { }

  ngOnInit() {
    // manage tab state
    this._competitionService.getActivatedRoute(this.route);
    this._competitionService.subscribeToRoute(this.router);
  }

  // manage routing from tab
  routeToComponent(componentName) {

    switch (componentName) {
      case 'fixtures':
        this.router.navigateByUrl(`/competitions/${componentName}/${this._competitionService.routeParam.value}`);
        break;

      case 'table':
        this.router.navigateByUrl(`/competitions/${componentName}/${this._competitionService.routeParam.value}`);
        break;

      case 'teams':
        this.router.navigateByUrl(`/competitions/${componentName}/${this._competitionService.routeParam.value}`);
        // this._competitionService.isActive.next(componentName);
        break;

      default:
        break;
    }
  }

  tabState() {
    return this._competitionService.isActive.value !== 'team';
  }

}
