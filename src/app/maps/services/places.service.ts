import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';

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
    private http: HttpClient,
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
    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&limit=5&proximity=-71.40650182822317%2C-33.04615000062797&language=es&access_token=pk.eyJ1IjoiYWxleGlzYmFyOTciLCJhIjoiY200eWs2a3BnMGk5NTJsb3Bzc3pweXk1eiJ9.jcrp--kp7iAeuLp3bSprnA`)
    .subscribe(resp => {
      this.isLoadingPlaces = false;
      this.places = resp.features;
    });
  }
}
