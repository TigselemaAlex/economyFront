import {Component, inject} from '@angular/core';
import {SimpleSharedData} from "../../../../shared/models/simple-shared-data.model";
import {provideRouter, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  sharedData: SimpleSharedData = {
    title: 'Inicio de Sesión',
    isVisible: false,
  };
  constructor(private router: Router) {
  }

  toggleVisibility(): void {
    this.sharedData.isVisible = !this.sharedData.isVisible;
    if (this.sharedData.isVisible) {
      this.sharedData.title = 'Registrate';
    } else {
      this.sharedData.title = 'Inicio de Sesión';
    }
  }
  openSimulator(): void {
    this.router.navigate(['/amortization']);
  }
}
