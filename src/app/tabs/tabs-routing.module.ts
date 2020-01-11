import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'animals',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../animals/animals.module').then(m => m.AnimalsPageModule)
          },
          {
            path: 'details/:id',
            loadChildren: () => import('../details/details.module').then(m => m.DetailsPageModule)
          },
        ]
      },
      {
        path: 'lost',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../lost/lost.module').then(m => m.LostPageModule)
          },
          
        ]
      },
      {
        path: 'liked',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../liked/liked.module').then(m => m.LikedPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/animals',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/animals',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
