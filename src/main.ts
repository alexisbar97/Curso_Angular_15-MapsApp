import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));

if(!navigator.geolocation){
  alert('Navegador no Soporta la Geolocalización.');
  throw new Error('Navegador no Soporta la Geolocalización.');
}
