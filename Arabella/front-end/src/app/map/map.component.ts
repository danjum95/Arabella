import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlXyzSource from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import {Icon, Style} from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { markParentViewsForCheck } from '@angular/core/src/view/util';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  
  constructor() { }

  map: OlMap;
    vectorSource: OlVectorSource;
    vectorLayer: OlVectorLayer;
    xyzSource: OlXyzSource;
    tileLayer: OlTileLayer;
    view: OlView;
    marker: OlFeature;
  latitude: number = 52.4082663;
  longitude: number = 16.9335199;

  ngOnInit() {

    this.marker = new OlFeature({
      // Added fromLonLat
  });

    this.view = new OlView({
      center: fromLonLat([16.9335199, 52.4082663]),
      zoom: 8
    });

    this.vectorSource = new OlVectorSource({
      features: [this.marker]
  });

  this.vectorLayer = new OlVectorLayer({
      source: this.vectorSource
  });

  /* XYZ */

  this.xyzSource = new OlXyzSource({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
  });

  this.tileLayer = new OlTileLayer({
      source: this.xyzSource
  });

  /* View and map */

  this.map = new OlMap({
      target: 'map',
      // Added both layers
      layers: [this.tileLayer, this.vectorLayer],
      view: this.view
  });
  }
}
