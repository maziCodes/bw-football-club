import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../../app.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  standing: any;

  constructor(private _appService: AppService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to route params
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
    this._appService.fecthData(url).subscribe( (data: any) => {
      if (data.error) {
        console.log(data);
      } else {
        console.log(data, 'success');
        this.standing = data;
      }
    }, err => {
      alert('Network Error!');
    });
  }

}
