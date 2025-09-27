// src/app/app.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './banner/banner';
import { CarouselComponent } from './carousel/carousel';
import { FooterComponent } from './footer/footer';
import { OverlayComponent } from './overlay/overlay';

@Component({
  selector: 'app-root',
  standalone: true,            
  imports: [RouterOutlet, BannerComponent, CarouselComponent, FooterComponent, OverlayComponent], 
  templateUrl: './app.html',    
  styleUrls: ['./app.scss'],   
})
export class App {
  protected readonly title = signal('odin-tek');
}
