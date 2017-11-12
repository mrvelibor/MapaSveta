import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ProgressStatus} from './progress-status';

@Injectable()
export class LoaderService {
  private subject = new Subject<ProgressStatus>();
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

  showProgress(progress: number, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next(new ProgressStatus(progress, 'determinate'));
  }

  showIndeterminate(keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next(new ProgressStatus(0, 'indeterminate'));
  }

  hideProgress() {
    this.subject.next();
  }

  getProgressStatus(): Observable<ProgressStatus> {
    return this.subject.asObservable();
  }
}
