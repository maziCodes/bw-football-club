import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {

  allFixtures;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.fetchCompetitionFixtures();
  }

  fetchCompetitionFixtures() {
    this._appService.activeCompetitionsFixtures
    .subscribe( data => {
      this.allFixtures = data;
    });
  }

}
