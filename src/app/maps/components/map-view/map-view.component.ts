import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: false,
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})

export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv')
  public mapDivElement?: ElementRef

  constructor(
    private placesService: PlacesService,
  ) {}

  ngAfterViewInit(): void {
    if(!this.placesService.useLocation) throw Error('No hay placesService.useLocation');

    const map = new mapboxgl.Map({
      container: this.mapDivElement?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.useLocation,
      zoom: 14,
    });

    const popup = new Popup()
    .setHTML(`
      <h6>Aquí Estoy.</h6>
      <span>Estoy en este lugar del mundo.</span>
    `);

    new Marker({color: 'red'})
    .setLngLat(this.placesService.useLocation)
    .setPopup(popup)
    .addTo(map)
    ;

  }
}
