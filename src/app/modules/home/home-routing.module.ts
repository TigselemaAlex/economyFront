import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {CreditsComponent} from "./pages/credits/credits.component";
import {SettingsComponent} from "./pages/settings/settings.component";

const routes: Routes = [
  {
    path: '', component: MainComponent ,
    children: [
      {
        path: 'credits', component:CreditsComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: '', redirectTo: 'credits', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
