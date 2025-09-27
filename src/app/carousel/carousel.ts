import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CAROUSEL_MESSAGES } from './carousel-messages';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {

  messages = CAROUSEL_MESSAGES;

  @Input() slides: string[] = [];
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  extendedSlides: string[] = [];
  currentIndex = 0;
  slideWidth = 0;
  currentTranslate = 0;
  isDragging = false;
  startX = 0;
  autoSlideInterval: any;

  // --- NEW: dots support ---
  dots: number[] = [];

  ngAfterViewInit() {
    // Duplicate slides for infinite looping
    this.extendedSlides = [...this.slides, ...this.slides, ...this.slides];
    this.currentIndex = this.slides.length; // start in middle set

    // --- NEW: initialize dots ---
    this.dots = this.slides.map((_, i) => i);

    this.calculateSlideWidth();
    window.addEventListener('resize', () => this.calculateSlideWidth());

    // Auto slide every 10s
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 10000);
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }

  private calculateSlideWidth() {
    if (!this.carousel?.nativeElement) return;

    const containerWidth = this.carousel.nativeElement.offsetWidth;

    if (window.innerWidth <= 768) {
      this.slideWidth = containerWidth; // 1 slide
    } else if (window.innerWidth <= 1024) {
      this.slideWidth = containerWidth / 2; // 2 slides for tablet
    } else {
      this.slideWidth = containerWidth / 3; // desktop default
    }

    this.updatePosition(false);
  }

  private updatePosition(withTransition = true) {
    const track = this.carousel.nativeElement.querySelector('.carousel-track') as HTMLElement;
    track.style.transition = withTransition ? 'transform 0.3s ease-out' : 'none';
    this.currentTranslate = -this.currentIndex * this.slideWidth;
    track.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  private snapToIndex() {
    if (this.currentIndex < this.slides.length) {
      this.currentIndex += this.slides.length;
      this.updatePosition(false);
    } else if (this.currentIndex >= this.slides.length * 2) {
      this.currentIndex -= this.slides.length;
      this.updatePosition(false);
    }
  }

  nextSlide() {
    this.currentIndex++;
    this.updatePosition(true);
    setTimeout(() => this.snapToIndex(), 310);
  }

  prevSlide() {
    this.currentIndex--;
    this.updatePosition(true);
    setTimeout(() => this.snapToIndex(), 310);
  }

  // Drag events
  onDragStart(x: number) {
    this.isDragging = true;
    this.startX = x;
    const track = this.carousel.nativeElement.querySelector('.carousel-track') as HTMLElement;
    track.style.transition = 'none';
  }

  onDragMove(x: number) {
    if (!this.isDragging) return;
    const delta = x - this.startX;
    const track = this.carousel.nativeElement.querySelector('.carousel-track') as HTMLElement;
    track.style.transform = `translateX(${this.currentTranslate + delta}px)`;
  }

  onDragEnd(x: number) {
    if (!this.isDragging) return;
    const delta = x - this.startX;

    if (Math.abs(delta) > this.slideWidth / 3) {
      if (delta < 0) this.currentIndex++;
      if (delta > 0) this.currentIndex--;
    }

    this.isDragging = false;
    this.updatePosition(true);
    setTimeout(() => this.snapToIndex(), 310);
  }

  // --- NEW: get current dot index ---
  currentDotIndex(): number {
    return this.currentIndex % this.slides.length;
  }

  // --- NEW: click a dot to go to a slide ---
  goToSlide(index: number) {
    this.currentIndex = index + this.slides.length; // jump to middle duplicate for infinite loop
    this.updatePosition(true);
  }
}
