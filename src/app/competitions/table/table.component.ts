import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../../app.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  standings: any;
  season: any;
  isMultipleTables: boolean;
  multiStandings: any[] = [];

  constructor(private _appService: AppService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // access the route params
    this.route.params.forEach((params: Params) => {
      if (params['id'] === 'none') {
        this.fetchStanding(2021);
      } else {
        this.fetchStanding(this._appService.competitionCode.value);
      }
    });
  }

  fetchStanding(competition) {
    const url = `competitions/${competition}/standings?standingType=TOTAL`;
    this._appService.fetchData(url).subscribe( (data: any) => {
      if (data.error) {
      } else {
        this.season = data.season;
        this.isMultipleTables = data.standings && data.standings.length > 1;
        this.standings = data.standings[0].table || [];
        console.log('standings: ', this.standings);
        this.multiStandings = data.standings || [];
        console.log('multiStandings: ', this.multiStandings);
      }
    }, err => {
      alert('Network Error!');
    });
  }

}
