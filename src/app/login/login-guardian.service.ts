import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardianService implements CanActivate {

  constructor(private loginService: LoginService,
    private router: Router) { }

  canActivate() {
    if (this.loginService.isAutenticado() == true) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
