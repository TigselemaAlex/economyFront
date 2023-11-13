import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SimpleSharedData} from "../../../../../shared/models/simple-shared-data.model";
import {NonNullableFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.css']
})
export class FormCreditComponent implements OnInit{
  @Input() sharedData: SimpleSharedData = {
    title: 'Registrar Crédito',
    isVisible: false,
    data: null,
    response: null
  }

  @Output() submit = new EventEmitter<void>();
  creditForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    minimumamount: [null, Validators.required],
    maximumamount: [null, Validators.required],
    interestrate: [null, Validators.required]
  })

  constructor(private fb: NonNullableFormBuilder) {
  }

  onSubmit(): void {
    if (this.creditForm.valid) {
      console.log(this.creditForm.value);
      this.sharedData.response = this.creditForm.value;
      this.submit.emit();
      this.onClose();
    } else {
      Object.values(this.creditForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  onClose(): void {
    this.creditForm.reset();
    this.sharedData.isVisible = false;
  }

  ngOnInit(): void {
    if (this.sharedData.data) {
      this.creditForm.patchValue(this.sharedData.data);
    }
  }
}
