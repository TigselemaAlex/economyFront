import {Component, OnInit} from '@angular/core';
import {Credit} from "../../../../shared/models/credit.model";
import {SimpleSharedData} from "../../../../shared/models/simple-shared-data.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {Charge} from "../../../../shared/models/charge.model";
import {CreditService} from "../../services/credit.service";
import {JWTResponse} from "../../../../shared/models/jwtresponse.model";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  sharedData: SimpleSharedData = {
    title: 'Registrar Crédito',
    isVisible: false,
    data: null,
    response: null
  }

  sharedDataCharges: SimpleSharedData = {
    title: 'Cargos',
    isVisible: false,
    data: null,
    response: null
  }

  jwtResponse: JWTResponse = JSON.parse(localStorage.getItem('token') as string);

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private creditService: CreditService
  ) {
  }

  ngOnInit() {
    this.allCredits();
  }

  allCredits(){
    this.creditService.getAllCredits(this.jwtResponse.user.institution.id!).subscribe({
      next: (resp) => {
        this.credits = resp.data;
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los créditos'});
      }
    });
}

  credits: Credit[] = []

  openForm(credit?: Credit): void {
    if (credit) {
      this.sharedData.data = credit;
      this.sharedData.isVisible = true;
      this.sharedData.title = 'Editar Crédito';
    } else {
      this.sharedData.data = null;
      this.sharedData.isVisible = true;
      this.sharedData.title = 'Registrar Crédito';
    }
  }

  openFormCharges(credit: Credit): void {
    this.sharedDataCharges.data = credit;
    this.sharedDataCharges.isVisible = true;
    this.sharedDataCharges.title = 'Cargos';
  }

  save(): void {
    if (this.sharedData.response) {
      let credit: Credit = this.sharedData.response;
      if (credit.id) {
        /*this.credits = this.credits.map(c => c.id == credit.id ? credit : c);
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Crédito actualizado correctamente'});*/
        this.creditService.updateCredit(credit).subscribe({
          next: (resp) => {
            this.allCredits();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Crédito actualizado correctamente'});
          },
          error: (err) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el crédito'});
          }
        });
      } else {
        /*credit.id = (this.credits.length + 1).toString();
        this.credits.push(credit);*/
        this.creditService.saveCredit(this.jwtResponse.user.institution.id!, credit).subscribe({
          next: (resp) => {
            this.allCredits();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Crédito registrado' +
                ' correctamente'});
          },
          error: (err) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo registrar el crédito'});
          }
        });
      }
    }
  }

  delete(credit: Credit, event: Event): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el crédito?',
      target: event.target!,
      accept: () => {
        /*this.credits = this.credits.filter(c => c.id != credit.id);
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Crédito eliminado correctamente'});*/
        this.creditService.deleteCredit(credit.id!).subscribe({
          next: (resp) => {
            this.allCredits();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Crédito eliminado correctamente'});
          },
          error: (err) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el crédito'});
          }
        });
      }
    });
  }

  updateCharges(id?: string): void {
    if (id) {
      /*this.credits = this.credits.map(c => {
        c.charges = c.charges ? c.charges.filter(ch => ch.id != id) : [];
        return c;
      });*/
      this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Cargo eliminado correctamente'});
      return;
    }
    let charges: Charge = this.sharedDataCharges.response;
    if (charges.id){
      /*this.credits = this.credits.map(c => {
        c.charges = c.charges ? c.charges.map(ch => ch.id == charges.id ? charges : ch) : [charges];
        return c;
      });*/
      this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Cargo actualizado correctamente'});
    }else{
      /*charges.id = (this.credits.length + 1).toString();
      this.credits = this.credits.map(c => {
        if (c.id == this.sharedDataCharges.data?.id) {
          c.charges = c.charges ? [...c.charges, charges] : [charges];
        }
        return c;
      });*/
      this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Cargo registrado correctamente'});
    }
  }

}
