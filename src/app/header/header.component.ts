import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  competitionsUrl = 'competitions?areas=2021,2072,2077,2077,2088,2114,2187,2224,2267&plan=TIER_ONE';

  dropDownEl = document.getElementsByClassName('drop-down');
  competitions: [];
  teams: any;
  activeCompetition: any;

  dropdownState;

  constructor(public _appService: AppService) { }

  ngOnInit() {

  }

  showDropDown(competitionCode?) {
    this._appService.fecthTeams(competitionCode);
    this.dropdownState = true;
  }

  closeDropDown() {
    this.dropdownState = false;
  }

}
