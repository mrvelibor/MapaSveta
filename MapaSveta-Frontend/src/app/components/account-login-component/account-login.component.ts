import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {AlertService} from '../../services/ui/alert/alert.service';
import {LoaderService} from '../../services/ui/loader/loader.service';

@Component({
  selector: 'app-account-login',
  templateUrl: 'account-login.component.html',
  styleUrls: ['account-login.component.scss']
})
export class AccountLoginComponent {

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
          this.alertService.success('Uspešno ste se ulogovali!', true);
          this.router.navigate(['/']);
        },
        error => {
          this.loaderService.hideProgress();
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
