import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGlzYmFyOTciLCJhIjoiY201Y3BoMzByM3pzbzJscHF6ZXBjdWFjbCJ9.a14cXrREPusq7ruoi-UFEA';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));

if(!navigator.geolocation){
  alert('Navegador no Soporta la Geolocalización.');
  throw new Error('Navegador no Soporta la Geolocalización.');
}
