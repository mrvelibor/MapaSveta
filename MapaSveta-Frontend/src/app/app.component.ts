import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from './models/user';
import {AuthenticationService} from './services/rest/authentication.service';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUser: User;

  url = environment.apiUrl;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  auth() {
    this.authService.auth()
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
        });
  }
}
