import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app/app';
import { appConfig } from './app/app.config';

function removeLoader() {
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => loader.remove(), 500);
  }
}

function waitForImagesAndRemoveLoader() {
  const images = document.querySelectorAll<HTMLImageElement>('img');
  if (images.length === 0) {
    removeLoader();
    return;
  }

  let loadedCount = 0;
  const total = images.length;

  images.forEach((img) => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === total) {
          removeLoader();
        }
      };
    }
  });

  if (loadedCount === total) {
    removeLoader();
  }
}

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(HttpClientModule) // ✅ Add HttpClientModule here
  ]
})
  .then(() => {
    setTimeout(() => waitForImagesAndRemoveLoader(), 200);

    const halo = document.createElement('div');
    halo.classList.add('mouse-halo');
    document.body.appendChild(halo);

    document.addEventListener('mousemove', (e) => {
      halo.style.left = `${e.clientX}px`;
      halo.style.top = `${e.clientY}px`;
    });
  })
  .catch((err) => console.error(err));
