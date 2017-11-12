import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {AlertService} from '../../services/alert/alert.service';
import {FormInputMatcher} from '../../directives/form-input.matcher';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  matcher = new FormInputMatcher();

  model: any = {};
  loading: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private loaderService: LoaderService) {
  }

  login() {
    this.loading = true;
    this.loaderService.showIndeterminate();
    this.alertService.clearMessage();
    this.authenticationService.login(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.loaderService.hideProgress();
          this.alertService.success('Login successful!', true);
          this.router.navigate(['/']);
        },
        error => {
          this.loaderService.hideProgress();
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
