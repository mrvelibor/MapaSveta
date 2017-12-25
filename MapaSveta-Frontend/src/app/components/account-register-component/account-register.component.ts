import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {AlertService} from '../../services/ui/alert/alert.service';
import {LoaderService} from '../../services/ui/loader/loader.service';

@Component({
  selector: 'app-account-register',
  templateUrl: 'account-register.component.html',
  styleUrls: ['account-register.component.scss']
})
export class AccountRegisterComponent {
  model: any = {};
  loading: boolean;

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private alertService: AlertService,
              private loaderService: LoaderService) {
  }

  register() {
    this.loading = true;
    this.loaderService.showIndeterminate();
    this.alertService.clearMessage();
    this.loginService.register(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.loaderService.hideProgress();
          this.alertService.success('Uspešna registracija!', true);
          this.router.navigate(['/']);
        },
        error => {
          this.loaderService.hideProgress();
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
