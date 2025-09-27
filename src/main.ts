import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .then(() => {
    // Create mouse halo
    const halo = document.createElement('div');
    halo.classList.add('mouse-halo');
    document.body.appendChild(halo);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      halo.style.left = `${e.clientX}px`;
      halo.style.top = `${e.clientY}px`;
    });
  })
  .catch((err) => console.error(err));
