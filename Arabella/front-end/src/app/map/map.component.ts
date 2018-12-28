import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './../authorization.service';
import OlMap from 'ol/Map';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlXyzSource from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import { fromLonLat } from 'ol/proj';
import { markParentViewsForCheck } from '@angular/core/src/view/util';
import { Observable } from 'rxjs';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  
  constructor(protected Auth: AuthorizationService) { }

  map: OlMap;
    vectorSource: OlVectorSource;
    vectorLine: OlVectorSource;
    vectorLayer: OlVectorLayer;
    xyzSource: OlXyzSource;
    tileLayer: OlTileLayer;
    view: OlView;
  latitude: number = 52.4082663;
  longitude: number = 16.9335199;
  lessonsId: string[] = [];

  ngOnInit() {
    this.vectorSource = new OlVectorSource({});
    this.vectorLine = new OlVectorSource({});
    
    this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(dat => {
      this.Auth.getLessons(localStorage.getItem('userToken'), dat.id).subscribe(da => {
        for (var i = 0; i < da.length; i++)
        {
          this.lessonsId.push(da[i].id);
          console.log(this.lessonsId[i]);
        }
        this.Auth.getMap(this.lessonsId[this.lessonsId.length-1]).subscribe(map => {
          console.log(map.error);
        })
            

        var places = [
          [16.9335199, 52.4082663, "r"],
          [15.9335000, 52.4082000, "y"],
          [14.9300000, 52.4080000, "b"],
        ];
        
        var points = [ 
        [16.9335199, 52.4082663],
        [15.9335000, 52.4082000],
        [14.9300000, 52.4080000]
      ];

        
        for (var i = 0; i < places.length; i++) {
          console.log(places[i][0], places[i][1],places[i][2]);
        
          var iconFeature = new OlFeature({
            geometry: new OlPoint(fromLonLat([places[i][0], places[i][1]])),
          });
          if (places[i][2] == "r")
          {
            var iconStyle= new Style({
              image: new Icon({
                color: '#4271AE',
                crossOrigin: 'anonymous',
                src: '../assets/images/marker.png'
              })
            })
          }
          else if (places[i][2] == "b")
          {
            var iconStyle = new Style({
              image: new Icon({
                color: '#4271AE',
                crossOrigin: 'anonymous',
                src: '../assets/images/marker2.png'
              })
            })
          }
          else
          {
            var iconStyle = new Style({
              image: new Icon({
                color: '#4271AE',
                crossOrigin: 'anonymous',
                src: '../assets/images/marker3.png'
              })
            })
          }
          iconFeature.setStyle(iconStyle);
          this.vectorSource.addFeature(iconFeature);
        }
        
          for (var i = 0; i < points.length; i++) {
                points[i] = fromLonLat(points[i]);
                console.log(points[i]);
          }

          var featureLine = new OlFeature({
            geometry: new LineString(points)
          });
          this.vectorLine.addFeature(featureLine);
        

          var vectorLineLayer = new OlVectorLayer({
              source: this.vectorLine,
              style: new Style({
                  fill: new Fill({ color: '#000000', weight: 2 }),
                  stroke: new Stroke({ color: '#000000', width: 2 })
              })
          });
        this.view = new OlView({
          center: fromLonLat([16.9335199, 52.4082663]),
          zoom: 8
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
          layers: [this.tileLayer, vectorLineLayer, this.vectorLayer],
          view: this.view
      });
      })
    });
  }
}

