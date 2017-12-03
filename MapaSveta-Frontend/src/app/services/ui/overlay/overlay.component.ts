import {Component, OnInit} from '@angular/core';
import {OverlayService} from './overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html'
})

export class OverlayComponent implements OnInit {
  message: any;

  constructor(private overlayService: OverlayService) {
  }

  ngOnInit() {
    this.overlayService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
}
