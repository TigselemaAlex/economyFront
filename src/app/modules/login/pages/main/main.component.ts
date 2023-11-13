import { Component } from '@angular/core';
import {SimpleSharedData} from "../../../../shared/models/simple-shared-data.model";

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

  toggleVisibility(): void {
    this.sharedData.isVisible = !this.sharedData.isVisible;
    if (this.sharedData.isVisible) {
      this.sharedData.title = 'Registrate';
    } else {
      this.sharedData.title = 'Inicio de Sesión';
    }
  }

  protected readonly FocusEvent = FocusEvent;
}
