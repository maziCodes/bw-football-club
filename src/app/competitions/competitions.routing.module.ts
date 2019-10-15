import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetitionsComponent } from './competitions.component';

const routes: Routes = [
  {
    path: '',
    component: CompetitionsComponent,
    // children: [
    //   // { path: '', redirectTo: 'fixtures' },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompetitionsRoutingModule {}
