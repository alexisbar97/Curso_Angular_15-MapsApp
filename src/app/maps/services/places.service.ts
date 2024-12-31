import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  public useLocation?: [number,number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
  ){
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number,number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización.')
          console.log(err);
          reject();
        }
      )
    });
  }

  getPlacesByQuery(query: string = ''){
    if(!this.useLocation) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`${ query }`,{
      params: {
        proximity: this.useLocation.join(','),
      }
    })
    .subscribe(resp => {
      console.log(resp.features);

      this.isLoadingPlaces = false;
      this.places = resp.features;
    });
  }
}
