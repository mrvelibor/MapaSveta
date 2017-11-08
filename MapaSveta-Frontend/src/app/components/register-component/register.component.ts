import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})

export class RegisterComponent {
  model: any = {};
  loading: boolean;

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private alertService: AlertService) {
  }

  register() {
    this.loading = true;
    this.alertService.clearMessage();
    this.loginService.register(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Registration successful!', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
