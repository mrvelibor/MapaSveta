import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    let user = localStorage.getItem('user');
    if (user) {
      let userObj = JSON.parse(user);
      if (userObj.userRole.roleId === 1) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
