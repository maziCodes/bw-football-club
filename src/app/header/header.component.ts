import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dropDownEl = document.getElementsByClassName('drop-down');

  constructor() { }

  ngOnInit() {
  }

  showDropDown() {
   this.dropDownEl[0]['style'].display = 'block';
  }

  closeDropDown() {
    this.dropDownEl[0]['style'].display = 'none';
  }

}
