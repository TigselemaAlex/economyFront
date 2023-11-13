import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {JWTResponse} from "../../../../shared/models/jwtresponse.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  sidebarVisible: boolean = false;

  items: MenuItem[] = [];

  jwtResponse: JWTResponse = JSON.parse(localStorage.getItem('token') as string);
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.items = [
      {
        label: 'Créditos',
        icon: 'pi pi-fw pi-credit-card',
        routerLink: '/home/credits',
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Ajustes',
        icon: 'pi pi-cog',
        routerLink: '/home/settings',
        routerLinkActiveOptions: {exact: true}
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    ];
  }

  getRouteUrl(): string {
    let currentURL = this.router.url.split('/').pop();
    switch (currentURL) {
      case 'credits':
        return 'Créditos';
      case 'settings':
        return 'Ajustes';
      default:
        return '';
    }
  }
}
