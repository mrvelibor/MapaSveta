import {Component, OnInit} from '@angular/core';

import {LoaderService} from './loader.service';
import {ProgressStatus} from './progress-status';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})

export class LoaderComponent implements OnInit {
  status: ProgressStatus;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.getProgressStatus().subscribe(progressStatus => {
      this.status = progressStatus;
    });
  }
}
