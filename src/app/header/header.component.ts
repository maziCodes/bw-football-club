import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  competitionsUrl = 'competitions?areas=2021,2072,2077,2077,2081,2088,2114,2187,2224,2267&plan=TIER_ONE';

  dropDownEl = document.getElementsByClassName('drop-down');
  competitions: [];
  teams: any;
  callLimit = 1;
  activeCompetition: any;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.competitions = JSON.parse(localStorage.getItem('competitions'));

    if (!this.competitions) {
      this.fetchData(this.competitionsUrl, 'competitions');
      console.log('call api');
    }
  }

  fetchData(url, type?) {
    this._appService.fecthData(url).subscribe( (data: object) => {
      console.log('api data', data);
      this.assignPeoperty(data, type);
    }, err => {
      console.log(err);
    });
  }

  // switch properties
  assignPeoperty(data, typeOfCall) {

    switch (typeOfCall) {
      case 'competitions':
        this.competitions = data[typeOfCall];
        // store object to reduce api call
        localStorage.setItem('competitions', JSON.stringify(this.competitions));
        break;

      case 'teams':
        this.activeCompetition = data['competition'];
        this.teams = data['teams'];
        break;

      default:
        break;
    }
  }

  showDropDown(competitionCode?) {
    const url = `competitions/${competitionCode}/teams`;

    this.dropDownEl[0]['style'].display = 'block';

    if (this.callLimit === 1) {
      this.fetchData(url, 'teams');
    }

    this.callLimit = this.callLimit + 1;

  }

  closeDropDown() {
    this.dropDownEl[0]['style'].display = 'none';
  }

}
