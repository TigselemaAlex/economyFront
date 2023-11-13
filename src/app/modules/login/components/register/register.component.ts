import {Component, Input} from '@angular/core';
import {Role} from "../../../../shared/enums/Role";
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {UserRequest} from "../../../../shared/models/user-request.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm = this.fb.group({
    identification: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    fullname:['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    telephone: ['', [Validators.required, Validators.minLength(10)]],
    address: ['',Validators.required],
    role: [Role.ADMINISTRADOR],
  });

  constructor(private fb: NonNullableFormBuilder,
              private loginService: LoginService,
              private messageService: MessageService) {}
  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerUser = this.registerForm.value as UserRequest;
      this.loginService.registerUser(registerUser).subscribe(resp => {
        this.messageService.add({severity:'success', summary: 'Registro exitoso', detail: 'Usuario registrado correctamente'});
        console.log(resp);
      });
    }else{
      Object.values(this.registerForm.controls).forEach(control => {
        if(control.invalid){
          control.markAsDirty()
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
}
