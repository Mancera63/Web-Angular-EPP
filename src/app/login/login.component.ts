import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, public notificationService: NotificationService) { }

  check: boolean = false;

  ngOnInit() {
  }

  onSubmit(values: Observable<any>) {
    this.loginService.login(values['user'], values['pass']).subscribe(
      (response) => {
        console.log(response);
        this.loginService.setToken(response.access_token);
        this.loginService.setAuth("true");
        this.router.navigate(["/dash"]);
      },
      (error) => {
        console.log(error);
        this.notificationService.error('Correo y/o contraseña incorrectos.');
      }
    );
  }

}
