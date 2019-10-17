import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app/app.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: any;

  constructor(public _appService: AppService) { }

  ngOnInit() {
  }

}
