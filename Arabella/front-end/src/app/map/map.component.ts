import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AuthorizationService } from './../authorization.service';
import OlMap from 'ol/Map';
import Overlay from 'ol/Overlay';
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
import { fromLonLat, toLonLat } from 'ol/proj';


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
  overlay = Overlay;
  latitude: number = 52.4082663;
  longitude: number = 16.9335199;
  lessonsId: Array<string> = [];
  mapNotDefined = false;
  mapRendered = false;
  previousMap: string = "";
  closer: any;
  container: any;
  content: any;

  ngOnInit() {
    this.closer = document.getElementById('popup-closer');
    this.content = document.getElementById('popup-content');
    this.container = document.getElementById('popup');
    this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(dat => {
      this.Auth.getLessons(localStorage.getItem('userToken'), dat.id).subscribe(da => {
        for (var i = 0; i < da.length; i++)
        {
          this.lessonsId.push(da[i].id);
          //console.log(this.lessonsId[i]);
        }
        this.getMap(this.lessonsId[this.lessonsId.length - 1]);
      })
      
    });

  }

  getMap(id)
  {
        setTimeout(() => this.mapRendered = true, 10);
        setTimeout(() => this.mapRendered = false, 10);
        this.vectorSource = new OlVectorSource({});
        this.vectorLine = new OlVectorSource({});
        //console.log(id + " " +this.previousMap);
        var contents = this.content;
        //var container = document.getElementById('popup');
        this.Auth.getMap(id).subscribe(map => {
        if (id != this.previousMap)
        {
        console.log(this.closer);
        var overlay = new Overlay({
          element: this.container,
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
        });

        this.closer.onclick = function() {
          overlay.setPosition(undefined);
          this.closer.blur();
          return false;
        };

        this.previousMap = id.toString();
        
        var places = [];
        var coords = [];

        for (var i = 0; i < map.mapMarkers.length; i++)
        {
          places.push([map.mapMarkers[i].coordinates.longitude, map.mapMarkers[i].coordinates.latitude, map.mapMarkers[i].title]);
          
        }
        //console.log(places);

        var points = [];

        for (var i = 0; i < map.mapLines.length; i++)
        {
          points.push([map.mapLines[i].longitude, map.mapLines[i].latitude]);
        }

        for (var i = 0; i < places.length; i++) {
          //console.log(places[i][0], places[i][1],places[i][2]);
        
          var iconFeature = new OlFeature({
            description: places[i][2],
            geometry: new OlPoint(fromLonLat([places[i][0], places[i][1]])),
          });

            var iconStyle= new Style({
              image: new Icon({
                crossOrigin: 'anonymous',
                src: '../assets/images/marker.png'
              })
            })
          
          iconFeature.setStyle(iconStyle);
          this.vectorSource.addFeature(iconFeature);
        }
        
          for (var i = 0; i < points.length; i++) {
                points[i] = fromLonLat(points[i]);
                //console.log("P" + points[i]);
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
          center: fromLonLat([places[0][0],  places[0][1]]),
          zoom: 15
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
      console.log(vectorLineLayer);

      /* View and map */
      this.map = new OlMap({
          target: 'map',
          // Added both layers
          overlays: [overlay],
          layers: [this.tileLayer, vectorLineLayer, this.vectorLayer],
          view: this.view
      });
      
      this.map.on('singleclick', function(evt) {
        var coordinate = evt.coordinate;
        var hdms = toLonLat(coordinate);
        for (var i = 0; i < places.length; i++) {
          var coord1 = hdms[0].toFixed(3);
          var coord2 = hdms[1].toFixed(3);
          var pl1 = places [i][0].toFixed(3);
          var pl2 = places [i][1].toFixed(3);
          //console.log(coord1 + "  " + coord2);
          //console.log(pl1 + "  " + pl2);
          if ((coord1 == pl1) && (coord2 == pl2))
          {
            contents.innerHTML = '<p>Twój błąd:</p><code>' + places[i][2] +
            '</code>';
        overlay.setPosition(coordinate);
          break;
          }
        }
      });

      this.mapNotDefined = false;
      this.mapRendered = false;
      //console.log(this.mapRendered + "  " + this.mapNotDefined)
    }
    else
    {
      this.previousMap = id.toString();
      this.mapRendered = true;
      this.mapNotDefined = true;
      //console.log(this.mapRendered + "  " + this.mapNotDefined)
      
    }
        }, error => {
          if (error.status == 404)
          {            
            this.mapNotDefined = true;
            this.mapRendered = false;
            this.previousMap = id.toString();
            //console.log(this.mapRendered + "  " + this.mapNotDefined)
            setTimeout(() => this.mapRendered = true, 500);
            setTimeout(() => this.mapRendered = false, 500);
          }
        });
  }
}

