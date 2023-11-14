import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {loginGuard} from "./core/guards/login.guard";

const routes: Routes = [
  {
    path: '', pathMatch:'full', redirectTo: 'login'
  },
  {
    path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [
      loginGuard
    ]
  },
  {
    path: 'amortization', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
