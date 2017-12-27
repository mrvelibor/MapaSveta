import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false, dismissable = true) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({color: 'accent', text: message, dismissable: dismissable});
  }

  info(message: string, keepAfterNavigationChange = false, dismissable = true) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({text: message, dismissable: dismissable});
  }

  error(error: any, keepAfterNavigationChange = false, dismissable = true) {
    let message = error.status;
    try {
      let body = JSON.parse(error._body);
      if (body.error) {
        message += ' ' + body.error;
      }
      if (body.message) {
        message += ': ' + body.message;
      }
    } catch (Error) {
      message += ': Unknown error.';
    }
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({color: 'warn', text: message, dismissable: dismissable});
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
