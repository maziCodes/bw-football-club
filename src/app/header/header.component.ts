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

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.fetchCompetitions();
  }

  fetchCompetitions() {
    this._appService.fecthData(this.competitionsUrl)
    .subscribe( (data: object) => {
      console.log('competitions', data);
      this.competitions = data['competitions'];

    }, err => {
      console.log(err);
    });
  }

  showDropDown() {
   this.dropDownEl[0]['style'].display = 'block';
  }

  closeDropDown() {
    this.dropDownEl[0]['style'].display = 'none';
  }

}
