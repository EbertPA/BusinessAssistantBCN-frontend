import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { Map, Popup, Marker } from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor() { }

  ngAfterViewInit(): void {
    Mapboxgl.accessToken = environment.MAPBOX_TOKEN;
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: [ 2.19516507807684, 41.40250915633661 ], // starting position [lng, lat]
      zoom: 14 // starting zoom
      });
    
    const popup = new Popup()
    

    new Marker({color: 'red'})
    .setLngLat([ 2.19516507807684, 41.40250915633661 ])
    .setPopup( popup )
    .addTo( map )




      
  }

}
