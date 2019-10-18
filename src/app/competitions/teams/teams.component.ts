import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: { [params: string]: any; }[];

  constructor(public _appService: AppService, private router: Router,
    public _competitionService: CompetitionService) { }

  ngOnInit() {
    setTimeout(() => {
      this.teams = this._appService.activeTeams.value;

    }, 500);
  }

  viewTeam(team) {
    this._appService.setTeam(team);
    this.router.navigateByUrl(`/competitions/team/${team.id}`);
  }

}
