import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionsRoutingModule } from './competitions.routing.module';

import { CompetitionsComponent } from './competitions.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompetitionsRoutingModule
  ],
  declarations: [
    CompetitionsComponent
  ]
})
export class CompetitionsModule { }
