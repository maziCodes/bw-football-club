import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dropdownState;

  constructor(public _appService: AppService) { }

  ngOnInit() {
    this._appService.networkState.subscribe( data => {
      if (data.fetchTeam !== 'success' &&  data.fetchTeam !== 'default') {
        alert(data.fetchTeam);
      }
    });

  }

  showDropDown(competitionCode?) {
    this._appService.fecthTeams(competitionCode);
    this.dropdownState = true;
  }

  closeDropDown() {
    this.dropdownState = false;
  }

}
