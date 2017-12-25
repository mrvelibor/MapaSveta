import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {AlertService} from '../../services/ui/alert/alert.service';
import {LoaderService} from '../../services/ui/loader/loader.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-account-login',
  templateUrl: 'account-login.component.html',
  styleUrls: ['account-login.component.scss']
})
export class AccountLoginComponent implements AfterViewInit {
  model: any = {};
  loading: boolean;

  public auth2: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private loaderService: LoaderService) {
  }

  ngAfterViewInit(){
    this.googleInit();
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.googleClientId,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.auth2.attachClickHandler(document.getElementById('googleBtn'), {},
        (googleUser) => {
          this.onGoogleSignIn(googleUser);
        }, (error) => {
          this.onGoogleSignInError(error);
        });
    });
    gapi.signin2.render('googleBtn', {
      'scope': 'profile email',
      'width': 240,
      'height': 40,
      'longtitle': true,
      'theme': 'light'
    });
  }

  onGoogleSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('Token || ' + googleUser.getAuthResponse().id_token);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('First Name: ' + profile.getFirstName());
    console.log('Last Name: ' + profile.getLastName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }

  onGoogleSignInError(error) {
    alert(JSON.stringify(error, undefined, 2));
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
