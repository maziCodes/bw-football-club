import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: { [params: string]: any; }[];

  constructor(public _appService: AppService) { }

  ngOnInit() {
    console.log(this._appService.activeTeams.value);
    this.teams = this._appService.activeTeams.value;

  }

}
