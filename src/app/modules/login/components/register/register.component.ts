import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Role} from "../../../../shared/enums/Role";
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {UserRequest} from "../../../../shared/models/user-request.model";
import {MessageService} from "primeng/api";
import {Route, Router} from "@angular/router";

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

  @Output() register = new EventEmitter<void>();

  constructor(private fb: NonNullableFormBuilder,
              private loginService: LoginService,
              private messageService: MessageService,
              private router: Router) {}
  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerUser = this.registerForm.value as UserRequest;
      this.loginService.registerUser(registerUser).subscribe(resp => {
        this.messageService.add({severity:'success', summary: 'Registro exitoso', detail: 'Usuario registrado correctamente'});
        this.register.emit();
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
