import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SimpleSharedData} from "../../../../../shared/models/simple-shared-data.model";
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-form-charges',
  templateUrl: './form-charges.component.html',
  styleUrls: ['./form-charges.component.css']
})
export class FormChargesComponent implements OnInit{

  @Input() sharedData: SimpleSharedData = {
    title: 'Registrar Crédito',
    isVisible: false,
    data: null,
    response: null
  }
  @Output() submit = new EventEmitter<string>();

  formTitle: string = 'Registrar Cargo';
  ngOnInit(): void {
  }

  chargeForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    amount: [null, Validators.required],
    description: ['']
  })

  constructor(private fb: NonNullableFormBuilder, private confirmationService: ConfirmationService) {
  }
  onSubmit(): void {
    if (this.chargeForm.valid) {
      console.log(this.chargeForm.value);
      this.sharedData.response = this.chargeForm.value;
      this.submit.emit();
      this.chargeForm.reset();
      this.formTitle = 'Registrar Cargo';
    } else {
      Object.values(this.chargeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  onClose(): void {
    this.chargeForm.reset();
    this.sharedData.isVisible = false;
  }

  updateCharge(charge: any): void {
    this.formTitle = 'Editar Cargo';
    this.chargeForm.patchValue(charge);
  }

  newCharge(): void {
    this.formTitle = 'Registrar Cargo';
    this.chargeForm.reset();
  }

  deleteCharge(charge: any, event: Event): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el cargo?',
      target: event.target!,
      accept: () => {
        this.submit.emit(charge.id);
        this.chargeForm.reset();
        this.formTitle = 'Registrar Cargo';
      }
    });
  }
}
