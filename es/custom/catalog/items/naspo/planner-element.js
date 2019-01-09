import * as Three from 'three';
import React from 'react';

var WIDTH = 50;
var DEPTH = 30;
var HEIGHT = 80;

var red = new Three.MeshPhongMaterial({ color: 0xAA0000 });
var grey = new Three.MeshLambertMaterial({ color: 0xAAAAAA });
var black = new Three.MeshLambertMaterial({ color: 0x000000 });
var textureLoader = new Three.TextureLoader();
var frontTexture = textureLoader.load(require('./naspofront.png'));

var objectMaxLOD = makeObjectMaxLOD();
var objectMiddleLOD = makeObjectMiddleLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var naspo = new Three.Mesh();

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var radius = 0.1;
  var height = 1.2;
  var width = 0.8;
  var depth = 0.6;

  roundedRectShape.moveTo(x, y + radius);
  roundedRectShape.lineTo(x, y + height - radius);
  roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
  roundedRectShape.lineTo(x + width - radius, y + height);
  roundedRectShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  roundedRectShape.lineTo(x + width, y + radius);
  roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
  roundedRectShape.lineTo(x + radius, y);
  roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

  var extrudeSettings = {
    steps: 2,
    depth: depth / 3,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometryBody = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
  var mesh = new Three.Mesh(geometryBody, red);
  mesh.position.set(0.1, 1.1, 0.1);
  naspo.add(mesh);

  var geometryBox = new Three.BoxGeometry(0.95, 1.05, 0.2);
  var mesh1 = new Three.Mesh(geometryBox, red);
  mesh1.position.set(0.5, 1.7, 0.2);
  naspo.add(mesh1);

  var geometryPlane = new Three.PlaneGeometry(0.6, 0.9);
  var mesh3 = new Three.Mesh(geometryPlane, new Three.MeshPhongMaterial({ map: frontTexture, transparent: true }));
  mesh3.position.set(0.5, 1.7, 0.31);
  naspo.add(mesh3);

  var cylinderGeometry1 = new Three.CylinderGeometry(0.05, 0.05, 0.025, 80, 80);
  var handle_p1 = new Three.Mesh(cylinderGeometry1, grey);
  handle_p1.position.set(0.17, 1.7, 0.3);
  handle_p1.rotation.x = Math.PI / 2;
  naspo.add(handle_p1);

  var cylinderGeometry2 = new Three.CylinderGeometry(0.051, 0.051, 0.05, 80, 80, true);
  black.side = Three.DoubleSide;
  var handle_p2 = new Three.Mesh(cylinderGeometry2, black);
  handle_p2.position.set(0.17, 1.7, 0.31);
  handle_p2.rotation.x = Math.PI / 2;
  naspo.add(handle_p2);

  var geometry = new Three.BoxGeometry(0.1, 0.02, 0.02);
  var handle_p3 = new Three.Mesh(geometry, black);
  handle_p3.position.set(0.17, 1.7, 0.32);
  naspo.add(handle_p3);

  var cylinderGeometry4 = new Three.CylinderGeometry(0.015, 0.015, 0.1, 80, 80);
  var pivot1 = new Three.Mesh(cylinderGeometry4, black);
  pivot1.position.set(0.99, 1.9, 0.28);
  naspo.add(pivot1);

  var cylinderGeometry5 = new Three.CylinderGeometry(0.015, 0.015, 0.1, 80, 80);
  var pivot2 = new Three.Mesh(cylinderGeometry5, black);
  pivot2.position.set(0.99, 1.4, 0.28);
  naspo.add(pivot2);

  var roundedRectShape2 = new Three.Shape();

  var width2 = 1.05;
  var height2 = 1.3;
  var radius2 = 0.1;

  roundedRectShape2.moveTo(x, y + radius2);
  roundedRectShape2.lineTo(x, y + height2 - radius2);
  roundedRectShape2.quadraticCurveTo(x, y + height2, x + radius2, y + height2);
  roundedRectShape2.lineTo(x + width2 - radius2, y + height2);
  roundedRectShape2.quadraticCurveTo(x + width2, y + height2, x + width2, y + height2 - radius2);
  roundedRectShape2.lineTo(x + width2, y + radius2);
  roundedRectShape2.quadraticCurveTo(x + width2, y, x + width2 - radius2, y);
  roundedRectShape2.lineTo(x + radius2, y);
  roundedRectShape2.quadraticCurveTo(x, y, x, y + radius2);

  var extrudeSettings2 = {
    steps: 2,
    depth: depth,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometry2 = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
  var mesh2 = new Three.Mesh(geometry2, red);
  mesh2.position.set(0, 1.05, -0.33);
  naspo.add(mesh2);

  return naspo;
}

function makeObjectMiddleLOD() {

  var naspo = new Three.Mesh();

  var roundedRectShape2 = new Three.Shape();

  var x = 0;
  var y = 0;
  var width2 = 1.05;
  var height2 = 1.3;
  var radius2 = 0.1;
  var depth = 0.6;

  roundedRectShape2.moveTo(x, y + radius2);
  roundedRectShape2.lineTo(x, y + height2 - radius2);
  roundedRectShape2.quadraticCurveTo(x, y + height2, x + radius2, y + height2);
  roundedRectShape2.lineTo(x + width2 - radius2, y + height2);
  roundedRectShape2.quadraticCurveTo(x + width2, y + height2, x + width2, y + height2 - radius2);
  roundedRectShape2.lineTo(x + width2, y + radius2);
  roundedRectShape2.quadraticCurveTo(x + width2, y, x + width2 - radius2, y);
  roundedRectShape2.lineTo(x + radius2, y);
  roundedRectShape2.quadraticCurveTo(x, y, x, y + radius2);

  var extrudeSettings2 = {
    steps: 2,
    depth: depth,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometry2 = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
  var mesh2 = new Three.Mesh(geometry2, red);
  mesh2.position.set(0, 1.05, -0.33);
  naspo.add(mesh2);

  var geometryBox = new Three.BoxGeometry(0.95, 1.05, 0.2);
  var mesh1 = new Three.Mesh(geometryBox, red);
  mesh1.position.set(0.5, 1.7, 0.2);
  naspo.add(mesh1);

  var geometryPlane = new Three.PlaneGeometry(0.6, 0.9);
  var mesh3 = new Three.Mesh(geometryPlane, new Three.MeshPhongMaterial({ map: frontTexture, transparent: true }));
  mesh3.position.set(0.5, 1.7, 0.31);
  naspo.add(mesh3);

  return naspo;
}

function makeObjectMinLOD() {

  var naspo = new Three.Mesh();

  var roundedRectShape2 = new Three.Shape();

  var x = 0;
  var y = 0;
  var width2 = 1.05;
  var height2 = 1.3;
  var radius2 = 0.1;
  var depth = 0.6;

  roundedRectShape2.moveTo(x, y + radius2);
  roundedRectShape2.lineTo(x, y + height2 - radius2);
  roundedRectShape2.quadraticCurveTo(x, y + height2, x + radius2, y + height2);
  roundedRectShape2.lineTo(x + width2 - radius2, y + height2);
  roundedRectShape2.quadraticCurveTo(x + width2, y + height2, x + width2, y + height2 - radius2);
  roundedRectShape2.lineTo(x + width2, y + radius2);
  roundedRectShape2.quadraticCurveTo(x + width2, y, x + width2 - radius2, y);
  roundedRectShape2.lineTo(x + radius2, y);
  roundedRectShape2.quadraticCurveTo(x, y, x, y + radius2);

  var extrudeSettings2 = {
    steps: 2,
    depth: depth,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometry2 = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
  var mesh2 = new Three.Mesh(geometry2, red);
  mesh2.position.set(0, 1.05, -0.33);
  naspo.add(mesh2);

  return naspo;
}

export default {
  name: "naspo",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "naspo",
    description: "naspo",
    image: require('./naspo.png')
  },
  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 60,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return React.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#ff0000" } }),
      React.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /**************** LOD max ***********************/

    var naspoMaxLOD = new Three.Object3D();
    naspoMaxLOD.add(objectMaxLOD.clone());

    var valuePosition = new Three.Box3().setFromObject(naspoMaxLOD);

    var deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    var deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    var deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    naspoMaxLOD.rotation.y += Math.PI;
    naspoMaxLOD.position.x += WIDTH / 2;
    naspoMaxLOD.position.y += -HEIGHT / 1.3 + newAltitude;
    naspoMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**************** LOD middle ***********************/

    var naspoMiddleLOD = new Three.Object3D();
    naspoMiddleLOD.add(objectMiddleLOD.clone());

    naspoMiddleLOD.rotation.y += Math.PI;
    naspoMiddleLOD.position.x += WIDTH / 2;
    naspoMiddleLOD.position.y += -HEIGHT / 1.3 + newAltitude;
    naspoMiddleLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**************** LOD min ***********************/

    var naspoMinLOD = new Three.Object3D();
    naspoMinLOD.add(objectMinLOD.clone());

    naspoMinLOD.rotation.y += Math.PI;
    naspoMinLOD.position.x += WIDTH / 2;
    naspoMinLOD.position.y += -HEIGHT / 1.3 + newAltitude;
    naspoMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /*** add all Level of Detail ***/

    var lod = new Three.LOD();

    lod.addLevel(naspoMaxLOD, 200);
    lod.addLevel(naspoMiddleLOD, 900);
    lod.addLevel(naspoMinLOD, 1200);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;

    if (element.selected) {
      var bbox = new Three.BoxHelper(lod, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      lod.add(bbox);
    }

    return Promise.resolve(lod);
  }

};