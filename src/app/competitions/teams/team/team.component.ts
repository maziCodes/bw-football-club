import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app/app.service';
import { CompetitionService } from '../../competition.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: any;
  fixtures: any;

  constructor(public _appService: AppService, public _competitionService: CompetitionService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.teamObservable();
    this.fixturesObservable();
  }

  getRouteParam() {
    return this.route.snapshot.params['id'];
  }

  teamObservable() {
    this._appService.team.subscribe( data => {
      this.team = data;
      let teamId = data['id'];

      // hanndle undefined teamId
      if (!teamId) {
        teamId = this.getRouteParam();
        this.router.navigateByUrl('/competitions');
        return;
      }
      this._competitionService.getTeamFixtures(teamId);
    });
  }

  fixturesObservable() {
    this._competitionService.activeTeamFixtures.subscribe( data => {
      this.fixtures = data;
      console.log(this.fixtures)
    });

  }

}
