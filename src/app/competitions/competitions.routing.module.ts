import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetitionsComponent } from './competitions.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TableComponent } from './table/table.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';

const routes: Routes = [
  {
    path: '',
    component: CompetitionsComponent,
    children: [
      { path: '', redirectTo: 'fixtures/2021' },
      { path: 'fixtures/:id', component: FixturesComponent},
      { path: ':table/:id', component: TableComponent},
      { path: 'teams/:id', component: TeamsComponent},
      { path: 'team/:id', component: TeamComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompetitionsRoutingModule {}
