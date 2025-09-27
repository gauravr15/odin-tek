import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.scss']
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('bannerVideo') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const vid = this.video.nativeElement;
    vid.muted = true;

    // try to play immediately
    vid.play().catch(err => {
      console.warn('Autoplay blocked, will try again on user interaction', err);
      // fallback: play on first click
      document.addEventListener('click', () => {
        vid.play().catch(() => {});
      }, { once: true });
    });
  }
}
