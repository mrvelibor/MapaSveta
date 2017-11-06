import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {
  model: any = {};
  loading: boolean;

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private alertService: AlertService) {
  }

  login() {
    this.loading = true;
    this.alertService.clearMessage();
    this.loginService.login(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Login successful!', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
