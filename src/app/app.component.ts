import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bw-football-club';

  constructor(private _appService: AppService) {

  }


  ngOnInit(): void {
    this._appService.fetchCompetitions();
    // default to EPL
    this._appService.fetchTeams(2021);
    this._appService.fetchCompetitionFixtures(2021);
  }
}
