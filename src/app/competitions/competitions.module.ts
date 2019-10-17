import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionsRoutingModule } from './competitions.routing.module';

import { CompetitionsComponent } from './competitions.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TableComponent } from './table/table.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';
import { CompetitionService } from './competition.service';

@NgModule({
  declarations: [
    CompetitionsComponent,
    FixturesComponent,
    TableComponent,
    TeamsComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    CompetitionsRoutingModule
  ],
  providers: [CompetitionService]
})
export class CompetitionsModule { }
