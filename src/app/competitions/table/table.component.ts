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

  constructor(private _appService: AppService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // access the route params
    this.route.params.forEach((params: Params) => {
      if (params['id'] === 'none') {
        this.fetchStanding(2021);
      } else {
        this.fetchStanding(+params['id']);
      }
    });
  }

  fetchStanding(competition) {
    const url = `competitions/${competition}/standings?standingType=TOTAL`;
    this._appService.fetchData(url).subscribe( (data: any) => {
      if (data.error) {
        console.log(data);
      } else {
        console.log(data, 'success');
        this.season = data.season;
        this.standings = data.standings[0].table;
      }
    }, err => {
      alert('Network Error!');
    });
  }

}
