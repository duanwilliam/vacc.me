import {Threebox} from 'threebox-plugin';

import Drivethru from 'assets/scenes/drivethru2.glb';
import Walkthru from 'assets/scenes/walkthru2.glb';

var m='';

export const loadLocations = (map, sites) => {
  console.log('LOADING MAP');
  const driveThrus = [], walkThrus = [];
  const siteValues = Object.values(sites);
  for (let i = 0; i < siteValues.length; i ++) {
    const site = siteValues[i];
    if (site.type) {
      driveThrus.push(site);
    }
    else {
      walkThrus.push(site);
    }
  }

  let car;
  map.addLayer({
    id: 'drive-thru',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, mbxContext) {

      window.tb = new Threebox(
        map,
        mbxContext,
        { defaultLights: true }
      );

      var options = {
        obj: Drivethru,//'scenes/drivethru.glb',
        type: 'gltf',
        scale: 50,
        units: 'meters',
        anchor: 'center',
        rotation: { x: 180, y: 0, z: 180 }
      }

      for (let i = 0; i < driveThrus.length; i ++) {
        const driveThru = driveThrus[i];
        window.tb.loadObj(options, function (model) {
          car = model.setCoords([driveThru.long, driveThru.lat]);
          window.tb.add(car);
        })
      }
    },
    render: function (gl, matrix) {
      window.tb.update();
    }
  });

  let person;
  map.addLayer({
    id: 'walk-thru',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, mbxContext) {

      window.tb = new Threebox(
        map,
        mbxContext,
        { defaultLights: true }
      );

      var options = {
        obj: Walkthru,//'scenes/walkthru.glb',
        type: 'gltf',
        scale: 30,
        units: 'meters',
        anchor: 'center',
        rotation: { x: 180, y: 0, z: 180 }
      }

      for (let i = 0; i < walkThrus.length; i ++) {
        const walkThru = walkThrus[i];
        window.tb.loadObj(options, function (model) {
          person = model.setCoords([walkThru.long, walkThru.lat]);
          window.tb.add(person);
        })
      }
    },
    render: function (gl, matrix) {
      window.tb.update();
    }
  });
} 