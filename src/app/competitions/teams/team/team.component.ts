import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: any;

  constructor() { }

  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team'));
    console.log(this.team);
  }

}
