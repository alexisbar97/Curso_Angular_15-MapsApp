import { Component } from '@angular/core';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  standalone: false,
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})

export class BtnMyLocationComponent {
  constructor(
    private placesServices: PlacesService,
    private mapService: MapsService,
  ){}

  public goToMyLocation() {
    if(!this.placesServices.isUserLocationReady) throw Error('No hay ubicación de usuario.');
    if(!this.mapService.isMapReady) throw Error('No se ha inicializado el mapa.');

    this.mapService.flyTo(this.placesServices.userLocation!);
  }
}
