// src/app/overlay/overlay.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  standalone: true,
  templateUrl: './overlay.html',
  styleUrls: ['./overlay.scss'],
})
export class OverlayComponent implements OnInit {
  visible = true;

  ngOnInit() {
    setTimeout(() => {
      this.visible = false; 
    }, 100000);
  }
}

