import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/app']);
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'admin',
    canActivate: [AngularFireAuthGuard, RoleGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      role: 'ADMIN'
    },
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'shelter/:id',
    loadChildren: () => import('./shelter/shelter.module').then( m => m.ShelterPageModule)
  },
  {
     path: 'donate',
    loadChildren: () => import('./donate/donate.module').then( m => m.DonatePageModule)
  }

 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
