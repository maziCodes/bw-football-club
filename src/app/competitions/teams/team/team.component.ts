import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app/app.service';
import { CompetitionService } from '../../competition.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: any;

  constructor(public _appService: AppService, public _competitionService: CompetitionService) { }

  ngOnInit() {
  }

}
