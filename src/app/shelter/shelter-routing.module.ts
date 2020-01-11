import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShelterPage } from './shelter.page';

const routes: Routes = [
  {
    path: '',
    component: ShelterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShelterPageRoutingModule {}
