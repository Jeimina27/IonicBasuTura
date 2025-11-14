import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomeConductorPage implements OnInit {
  isLoading = true; 
  currentLocation: { lat: number, lng: number } | null = null;
  map: any;
  constructor() { }

  async ngOnInit() {
    await this.loadMap();
  }
  async loadMap() {
    this.isLoading = true;
    
    
    try {
      const permissions = await Geolocation.checkPermissions();
      
      if (permissions.location !== 'granted') {
        const request = await Geolocation.requestPermissions();
        if (request.location !== 'granted') {
          throw new Error('Permisos de ubicación denegados');
        }
      }

      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      });

      const lat = coordinates.coords.latitude;
      const lng = coordinates.coords.longitude;

      console.log('📍 Ubicación REAL obtenida:', { lat, lng });
      
      this.currentLocation = { lat, lng };

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error('Coordenadas inválidas obtenidas');
      }

      this.initializeMap(lng, lat);
      
    } catch (error) {
      console.error('❌ Error obteniendo ubicación:', error);
      console.log('🗺️ Usando ubicación por defecto: Buenaventura');
      this.initializeMap(-77.0797, 3.8836);
    } finally {
      this.isLoading = false;
    }
  }
  private initializeMap(lng: number, lat: number): void {
    if (this.map) {
      this.map.setTarget(undefined);
    }

    console.log('🗺️ Inicializando mapa en:', { lng, lat });

    this.map = new Map({
      target: 'mapId',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([lng, lat]),
        zoom: 15
      })
    });






 
  }
}
