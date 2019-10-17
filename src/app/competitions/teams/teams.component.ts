import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: { [params: string]: any; }[];

  constructor(public _appService: AppService, private router: Router) { }

  ngOnInit() {
    console.log(this._appService.activeTeams.value);
    this.teams = this._appService.activeTeams.value;

  }

  viewTeam(team) {
    localStorage.setItem('team', JSON.stringify(team));
    this.router.navigateByUrl(`/competitions/team/${team.id}`);
  }

}
