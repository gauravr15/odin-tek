// src/app/app.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './component/banner/banner';
import { CarouselComponent } from './component/carousel/carousel';
import { FooterComponent } from './component/footer/footer';
import { OverlayComponent } from './component/overlay/overlay';
import { ContactQueryComponent } from './component/contact-query/contact-query';

@Component({
  selector: 'app-root',
  standalone: true,            
  imports: [RouterOutlet, BannerComponent, CarouselComponent, FooterComponent, OverlayComponent, ContactQueryComponent], 
  templateUrl: './app.html',    
  styleUrls: ['./app.scss'],   
})
export class App {
  protected readonly title = signal('odin-tek');
}
