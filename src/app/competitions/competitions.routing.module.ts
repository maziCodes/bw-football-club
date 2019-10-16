import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetitionsComponent } from './competitions.component';
import { FixturesComponent } from './fixtures/fixtures.component';

const routes: Routes = [
  {
    path: '',
    component: CompetitionsComponent,
    children: [
      { path: '', redirectTo: 'fixtures/none' },
      { path: 'fixtures/:id', component: FixturesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompetitionsRoutingModule {}
