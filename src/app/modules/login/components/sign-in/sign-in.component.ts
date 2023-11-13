import {Component} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {LoginRequest} from "../../../../shared/models/login-request.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(private fb: NonNullableFormBuilder, private router: Router, private loginService: LoginService, private messageService: MessageService) {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm.value as LoginRequest)
        .subscribe({next: (resp) => {
            this.router.navigate(['/home']);
            localStorage.setItem('token', JSON.stringify(resp));
          },
          error: (err) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos'});
          }
        });
    }else{
      Object.values(this.loginForm.controls).forEach(control => {
        if(control.invalid){
          control.markAsDirty()
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

}
