import {Component, OnInit} from '@angular/core';
import {Institution} from "../../shared/models/institution.model";
import {AMORTIZATION_TYPES, AmortizationType} from "../../shared/models/amortization-type.model";
import {Charge} from "../../shared/models/charge.model";
import {AmortizationService} from "../services/amortization.service";
import {Credit} from "../../shared/models/credit.model";
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AmortizationRow} from "../../shared/models/amortization-row.model";

@Component({
  selector: 'app-amortization',
  templateUrl: './amortization.component.html',
  styleUrls: ['./amortization.component.css']
})
export class AmortizationComponent implements OnInit{

  institutions: Institution[] = []
  selectedInstitution!: Institution;
  amortizationTypes: AmortizationType[] = []
  amortizationType!: AmortizationType;

  credits: Credit[] = [];
  selectedCredit!: Credit;
  visible: boolean = false;

  amortizationRows: AmortizationRow[] = [];

  amortizationForm = this.fb.group({
    amount: [0, Validators.required],
    term: [0, Validators.required],
    interestrate: [0, Validators.required],
    chargesamount: [0, Validators.required],
  });
  constructor(private amortizationService: AmortizationService,
              private fb: NonNullableFormBuilder,
              private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.amortizationService.getTypeAmortization().subscribe( resp => {
      this.amortizationTypes = resp.data;
    });
    this.amortizationService.getInstitutions().subscribe( resp => {
      this.institutions = resp.data;
    });
  }

  getCredits(){
    this.amortizationService.getCredit(this.selectedInstitution.id!).subscribe( resp => {
      this.credits = resp.data;
    });
  }

  simulateAmortization(){
    if (this.selectedCredit == null || this.selectedInstitution == null){
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe completar todos los campos'});
      return;
    }else{
      this.amortizationForm.patchValue({interestrate: this.selectedCredit.interestrate})
      if (this.amortizationForm.invalid || this.selectedCredit == null || this.selectedInstitution == null){
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe completar todos los campos'});
        return;
      }
    }
    const chargesamount = this.selectedCredit.indirectCharges?.reduce((acc, charge) => acc + charge.amount, 0) ?? 0;
    let type = '';
    if (this.amortizationType.name == 'ALEMAN'){
      type = 'german';
    }else{
      type = 'french';
    }
    this.amortizationForm.patchValue({chargesamount: chargesamount})
    let request = this.amortizationForm.value;
    this.amortizationService.simulateAmortization(request, type).subscribe( resp => {
      this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Se ha simulado la amortización'});
      this.amortizationRows = resp.data;
      this.visible = true;
    });
  }

  printPDF(){
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(
          [{title: 'N', dataKey: 'numeroMes'},
            {title: 'Cuota', dataKey: 'cuota'},
            {title: 'Interés', dataKey: 'interes'},
            {title: 'Capital', dataKey: 'capital'},
            {title: 'Saldo', dataKey: 'saldo'},
            {title: 'Cargos', dataKey: 'chargesamount'}],
          this.amortizationRows);
        doc.save('amortizacion.pdf');
      });
    });
  }

}
