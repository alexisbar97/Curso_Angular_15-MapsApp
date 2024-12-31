import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import mapboxgl from 'mapbox-gl';

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
  }
}
