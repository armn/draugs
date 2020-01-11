import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedPage } from './liked.page';

const routes: Routes = [
  {
    path: '',
    component: LikedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedPageRoutingModule {}
