import {NgModule} from '@angular/core';
import {PrimeNGModule} from "./prime-ng/prime-ng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  exports: [
    PrimeNGModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule {
}
