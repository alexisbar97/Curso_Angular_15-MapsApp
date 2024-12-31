import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapsService, PlacesService } from '../../services';
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
    private mapService: MapsService,
  ) {}

  ngAfterViewInit(): void {
    if(!this.placesService.useLocation) throw Error('No hay placesService.useLocation');

    const map = new mapboxgl.Map({
      container: this.mapDivElement?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.useLocation,
      zoom: 10,
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

    this.mapService.setMap(map);

  }
}
