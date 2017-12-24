import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from './models/user/user';
import {AuthenticationService} from './services/rest/authentication.service';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {AlertService} from "./services/ui/alert/alert.service";
import {MapService, MapType} from "./components/map-component/map.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  currentUser: User;

  url = environment.apiUrl;

  currentUrl: string;

  constructor(private authService: AuthenticationService,
              private alertService: AlertService,
              private mapService: MapService,
              private router: Router) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.currentUser = user);
    this.router.events.subscribe(event => {
      console.log(event);
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.alertService.success('Logged out!');
  }

  auth() {
    this.authService.auth().subscribe(
      data => {
        console.log(data);
      }
    );
  }

  setMapType(type: string) {
    this.mapService.setMapType(new MapType(type, null));
  }
}
