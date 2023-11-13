import { Component } from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  institutionForm = this.fb.group({
    name: ['',Validators.required],
    logo: [null],
  })

  constructor(private fb:NonNullableFormBuilder) {
  }

  onUpload(event: any) {
    for(let file of event.files) {
      this.institutionForm.patchValue({logo: file});
    }

  }

}
