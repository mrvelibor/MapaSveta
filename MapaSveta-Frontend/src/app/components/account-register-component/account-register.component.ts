import {AfterViewInit, Component, NgZone, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/rest/authentication.service';
import {AlertService} from '../../services/ui/alert/alert.service';
import {LoaderService} from '../../services/ui/loader/loader.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-account-register',
  templateUrl: 'account-register.component.html',
  styleUrls: ['account-register.component.scss']
})
export class AccountRegisterComponent implements AfterViewInit, OnDestroy {
  model: any = {};
  loading: boolean;

  constructor(private router: Router,
              private _ngZone: NgZone,
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

  auth2: any;

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.googleClientId,
        cookiepolicy: 'single_host_origin',
        scope: environment.googleScope
      });
      this.auth2.attachClickHandler(document.getElementById('googleBtn'), {},
        (googleUser) => {
          this._ngZone.run(() => this.onGoogleSignIn(googleUser));
        }, (error) => {
          this._ngZone.run(() => this.onGoogleSignInError(error));
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
    this.loading = true;
    this.loaderService.showIndeterminate();
    this.alertService.clearMessage();
    this.authService.googleAuth(googleUser.getAuthResponse().id_token).subscribe(
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

  onGoogleSignInError(error) {
    console.log(error);
    this.alertService.error(JSON.stringify(error));
  }

  facebookHandler: any;

  facebookInit() {
    this.facebookHandler = response => {
      console.log(response);
      if (response.status === 'connected') {
        this._ngZone.run(() => this.onFacebookSignIn(response));
      } else {
        this._ngZone.run(() => this.onFacebookSignInError(response));
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
    this.loading = true;
    this.loaderService.showIndeterminate();
    this.alertService.clearMessage();
    this.authService.facebookAuth(response.authResponse.accessToken).subscribe(
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

  onFacebookSignInError(response) {
    console.log(response);
    this.alertService.error(JSON.stringify(response));
  }
  register() {
    this.loading = true;
    this.loaderService.showIndeterminate();
    this.alertService.clearMessage();
    this.authService.register(this.model)
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
