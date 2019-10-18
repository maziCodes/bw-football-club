import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dropdownState;
  activeCompetition;
  navBar: HTMLElement;


  constructor(public _appService: AppService, private route: Router,
    ) { }

  ngOnInit() {
    // handle error
    // this._appService.networkState.subscribe( data => {
    //   if (data.state !== 'success' &&  data.state !== 'default') {
    //     alert(data.state);
    //   }
    // });

    this.navBar = document.getElementById('navbarSupportedContent');

  }

  viewTeam(team) {
    this._appService.setTeam(team);
    this.route.navigateByUrl(`/competitions/team/${team.id}`);
    this.dropdownState = false;
  }

  viewCompetitionMobile(competitionCode) {
    this.route.navigateByUrl(`/competitions/fixtures/${competitionCode.id}`);
    this._appService.fetchCompetitionFixtures(competitionCode.id);
    this._appService.fetchTeams(competitionCode.id);
    this.navBar.classList.remove('show');

  }

  viewFixtures() {
    this.route.navigateByUrl(`/competitions/fixtures/${this.activeCompetition.id}`);
    this._appService.fetchCompetitionFixtures(this.activeCompetition.id);
    this._appService.fetchTeams(this.activeCompetition.id);


    this.dropdownState = false;
  }

  showDropDown(competitionCode?) {
    this._appService.fetchTeams(competitionCode);
    this.dropdownState = true;
  }

  closeDropDown() {
    this.dropdownState = false;
  }

}
