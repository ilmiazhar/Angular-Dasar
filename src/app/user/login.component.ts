import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  userName: any;
  password: any;
  mouseoverLogin: any;
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any) {
    this.authService
      .loginUser(formValues.userName, formValues.password)
      .subscribe((res) => {
        if (!res) {
          this.invalidLogin = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
