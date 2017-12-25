import {AfterViewInit, Component, OnDestroy} from '@angular/core';
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
export class AccountLoginComponent implements AfterViewInit, OnDestroy {
  model: any = {};
  loading: boolean;

  auth2: any;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private alertService: AlertService,
              private loaderService: LoaderService) {
  }

  ngAfterViewInit(){
    this.googleInit();
    this.facebookInit();
  }

  ngOnDestroy() {
    this.facebookDestroy();
  }

  googleInit() {
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
    console.log(googleUser);
    this.authService.googleAuth(googleUser.getAuthResponse().id_token).subscribe(result => console.log(result));
  }

  onGoogleSignInError(error) {
    console.log(error);
    alert(JSON.stringify(error));
  }

  facebookHandler: any;

  facebookInit() {
    this.facebookHandler = response => {
      console.log(response);
      if (response.status === 'connected') {
        this.onFacebookSignIn(response);
      } else {
        this.onFacebookSignInError(response);
      }
    };
    FB.Event.subscribe('auth.statusChange', this.facebookHandler);
    if (window['FB']) {
      window['FB'].XFBML.parse();
    }
  }

  facebookDestroy() {
    FB.Event.unsubscribe('auth.statusChange', this.facebookHandler);
  }

  onFacebookSignIn(response) {
    console.log(response);
    this.authService.facebookAuth(response.authResponse.accessToken).subscribe(result => console.log(result));
  }

  onFacebookSignInError(response) {
    console.log(response);
    alert(JSON.stringify(response));
  }

  login() {
    this.loading = true;
    this.loaderService.showIndeterminate();
    this.alertService.clearMessage();
    this.authService.login(this.model)
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
