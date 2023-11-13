import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './pages/main/main.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { AmortizationComponent } from './pages/amortization/amortization.component';
import {SharedModule} from "../../shared/shared.module";
import { FormCreditComponent } from './components/credit/form-credit/form-credit.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FormChargesComponent } from './components/credit/form-charges/form-charges.component';


@NgModule({
  declarations: [
    MainComponent,
    CreditsComponent,
    AmortizationComponent,
    FormCreditComponent,
    SettingsComponent,
    FormChargesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
