import * as Three from 'three';
import React from 'react';

var RADIUS = 15;
var HEIGHT = 60;

//colors
var black = new Three.MeshLambertMaterial({ color: 0x000000 });
var red = new Three.MeshLambertMaterial({ color: 0xff0000 });
var grey = new Three.MeshLambertMaterial({ color: 0xCCCCCC });
var yellow = new Three.MeshLambertMaterial({ color: 0xffff00 });

var objectMaxLOD = makeObjectMaxLOD();
var objectMiddleLOD = makeObjectMiddleLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var bodyGeometry = new Three.CylinderGeometry(0.1, 0.1, 0.5, 32);
  var body = new Three.Mesh(bodyGeometry, red);
  body.position.set(0, 1, 0);

  var bodyGeometry2 = new Three.CylinderGeometry(0.11, 0.11, 0.03, 32);
  var lock = new Three.Mesh(bodyGeometry2, black);
  lock.position.set(0, -0.2, 0);
  body.add(lock);

  var geometrySphereUp = new Three.SphereGeometry(0.1, 32, 32);
  var sphereUp = new Three.Mesh(geometrySphereUp, red);
  sphereUp.position.set(0, 0.25, 0);
  body.add(sphereUp);

  var cylinderGeometry = new Three.CylinderGeometry(0.015, 0.025, 0.05, 32);
  var vent_p1 = new Three.Mesh(cylinderGeometry, black);
  vent_p1.position.z = -0.13;
  vent_p1.position.y = -0.23;
  body.add(vent_p1);

  var cylinderGeometry1 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
  var vent_p2 = new Three.Mesh(cylinderGeometry1, grey);
  vent_p2.position.z = -0.13;
  vent_p2.position.y = -0.2;
  body.add(vent_p2);

  var cylinderGeometry2 = new Three.CylinderGeometry(0.015, 0.02, 0.04, 32);
  var cylinder2 = new Three.Mesh(cylinderGeometry2, black);
  cylinder2.position.set(0, 0.35, 0);
  body.add(cylinder2);

  var cylinderGeometry3 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
  var cylinder3 = new Three.Mesh(cylinderGeometry3, grey);
  cylinder3.position.set(0, 0.38, 0);
  body.add(cylinder3);

  var cylinderGeometry4 = new Three.CylinderGeometry(0.005, 0.005, 0.02, 32);
  var cylinder4 = new Three.Mesh(cylinderGeometry4, grey);
  cylinder4.position.set(-0.01, 0.38, 0);
  cylinder4.rotation.z += Math.PI / 2;
  body.add(cylinder4);

  var cylinderGeometry5 = new Three.CylinderGeometry(0.02, 0.02, 0.01, 32);
  var cylinder5 = new Three.Mesh(cylinderGeometry5, grey);
  cylinder5.position.set(-0.02, 0.38, 0);
  cylinder5.rotation.z += Math.PI / 2;
  body.add(cylinder5);

  var textureLoader = new Three.TextureLoader();
  var gageImage = textureLoader.load(null);

  var geometry2 = new Three.PlaneGeometry(0.04, 0.04);
  var material2 = new Three.MeshLambertMaterial({ map: gageImage, transparent: true });
  var gage = new Three.Mesh(geometry2, material2);
  gage.position.set(-0.0255, 0.38, 0);
  gage.rotation.y = -Math.PI / 2;
  body.add(gage);

  var cylinderGeometry6 = new Three.CylinderGeometry(0.005, 0.005, 0.03, 32);
  var cylinder6 = new Three.Mesh(cylinderGeometry6, grey);
  cylinder6.position.set(0, 0.38, -0.01);
  cylinder6.rotation.z += Math.PI / 2;
  cylinder6.rotation.y += Math.PI / 2;
  body.add(cylinder6);

  var cylinderGeometry7 = new Three.CylinderGeometry(0.01, 0.01, 0.02, 32);
  var cylinder7 = new Three.Mesh(cylinderGeometry7, grey);
  cylinder7.position.set(0, 0.38, -0.03);
  cylinder7.rotation.z += Math.PI / 2;
  cylinder7.rotation.y += Math.PI / 2;
  body.add(cylinder7);

  var labelImage = textureLoader.load(null);
  labelImage.wrapS = Three.RepeatWrapping;
  labelImage.wrapT = Three.RepeatWrapping;
  labelImage.repeat.set(1, 1);
  labelImage.offset.x = 0; // 0.0 - 1.0
  labelImage.offset.y = 0; // 0.0 - 1.0

  var points = [new Three.Vector2(.1, .666), new Three.Vector2(.1, 1)];

  var geometry = new Three.LatheGeometry(points, 200, 0, Math.PI);
  var material = new Three.MeshLambertMaterial({ map: labelImage });
  var label = new Three.Mesh(geometry, material);

  label.rotation.y = 60;
  label.position.y -= .75;
  body.add(label);

  var shape2 = new Three.Shape();
  shape2.moveTo(0.02, 0.06);
  shape2.lineTo(0.06, 0.07);
  shape2.lineTo(0.08, 0.1);
  shape2.lineTo(0.16, 0.1);
  shape2.lineTo(0.18, 0.09);
  shape2.lineTo(0.09, 0.08);
  shape2.lineTo(0.07, 0.05);
  shape2.lineTo(0.02, 0.04);

  var extrudeSettings = {
    steps: 2,
    depth: 0.02,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometry4 = new Three.ExtrudeGeometry(shape2, extrudeSettings);
  var material4 = new Three.MeshLambertMaterial({ color: 0xff0000 });
  var valve_p1 = new Three.Mesh(geometry4, material4);
  valve_p1.rotation.y = -Math.PI / 2;
  valve_p1.position.set(0.01, 0.35, -0.035);
  body.add(valve_p1);

  var shape3 = new Three.Shape();
  shape3.moveTo(0.02, 0.06);
  shape3.lineTo(0.04, 0.06);
  shape3.lineTo(0.16, 0.05);
  shape3.lineTo(0.18, 0.03);
  shape3.lineTo(0.16, 0.04);
  shape3.lineTo(0.02, 0.04);

  var extrudeSettings2 = {
    steps: 2,
    depth: 0.016,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometry5 = new Three.ExtrudeGeometry(shape3, extrudeSettings2);
  var valve_p2 = new Three.Mesh(geometry5, red);
  valve_p2.rotation.y = -Math.PI / 2;
  valve_p2.position.set(0.01, 0.34, -0.035);
  body.add(valve_p2);

  var geometry6 = new Three.TorusGeometry(0.0075, 0.00125, 16, 32, 1200);
  var safetyValve_p1 = new Three.Mesh(geometry6, yellow);
  safetyValve_p1.rotation.x = -Math.PI / 2;
  safetyValve_p1.position.set(-0.023, 0.41, 0.02);
  body.add(safetyValve_p1);

  var cylinderGeometry8 = new Three.CylinderGeometry(0.001, 0.001, 0.03, 32);
  var safetyValve_p2 = new Three.Mesh(cylinderGeometry8, yellow);
  safetyValve_p2.position.set(0, 0.41, 0.02);
  safetyValve_p2.rotation.z += Math.PI / 2;
  body.add(safetyValve_p2);

  var cylinderGeometry9 = new Three.CylinderGeometry(0.0025, 0.0025, 0.026, 32);
  var cylinder9 = new Three.Mesh(cylinderGeometry9, grey);
  cylinder9.position.set(0, 0.40, 0.0);
  cylinder9.rotation.z += Math.PI / 2;
  body.add(cylinder9);

  var curve = new Three.CatmullRomCurve3([new Three.Vector3(.5, 0, 0), new Three.Vector3(.5, 0, 0), new Three.Vector3(0, 0, 0), new Three.Vector3(-0.03, .1050, 0), new Three.Vector3(-0.03, .1050, 0)]);

  var geometry7 = new Three.TubeGeometry(curve, 32, 0.008, 16, false);
  var mesh = new Three.Mesh(geometry7, black);
  mesh.position.set(0, 0.35, -0.13);
  mesh.rotation.y -= Math.PI / 2;
  mesh.rotation.z = Math.PI / 2 + 4 * Math.PI;
  mesh.rotation.x += Math.PI;
  body.add(mesh);

  return body;
}

function makeObjectMiddleLOD() {

  var bodyGeometry21 = new Three.CylinderGeometry(0.1, 0.1, 0.5, 8);
  var body1 = new Three.Mesh(bodyGeometry21, red);
  body1.position.set(0, 1, 0);

  var bodyGeometry22 = new Three.CylinderGeometry(0.11, 0.11, 0.03, 8);
  var lock2 = new Three.Mesh(bodyGeometry22, black);
  lock2.position.set(0, -0.2, 0);
  body1.add(lock2);

  var geometrySphereUp1 = new Three.SphereGeometry(0.095, 32, 8);
  var sphereUp1 = new Three.Mesh(geometrySphereUp1, red);
  sphereUp1.position.set(0, 0.25, 0);
  body1.add(sphereUp1);

  return body1;
}

function makeObjectMinLOD() {
  var bodyGeometry0 = new Three.CylinderGeometry(0.1, 0.1, 0.475, 6);
  var body0 = new Three.Mesh(bodyGeometry0, red);
  body0.position.set(0, .95, 0);

  return body0;
}

export default {
  name: "fire-extinguisher",
  prototype: "items",

  info: {
    tag: ['security'],
    title: "Fire extinguisher",
    description: "Fire extinguisher",
    image: null
  },

  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 100,
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

    var arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce" };

    return React.createElement(
      'g',
      { transform: 'translate(' + -RADIUS / (RADIUS / 2) + ',' + -(RADIUS + 5) / (RADIUS / 2) + ')' },
      React.createElement('ellipse', { key: '1', cx: '0', cy: '0', rx: RADIUS + 5, ry: RADIUS,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#ff0000" } }),
      React.createElement('line', { key: '2', x1: 0, x2: 0, y1: RADIUS, y2: 2 * RADIUS, style: arrow_style }),
      React.createElement('line', { key: '3', x1: -RADIUS / 2 + .15 * RADIUS, x2: -RADIUS / 2 + RADIUS / 2, y1: 1.2 * RADIUS, y2: 2 * RADIUS,
        style: arrow_style }),
      React.createElement('line', { key: '4', x1: 0, x2: -RADIUS / 2 + .85 * RADIUS, y1: 2 * RADIUS, y2: 1.2 * RADIUS, style: arrow_style }),
      React.createElement(
        'text',
        { key: '5', cx: RADIUS, cy: RADIUS,
          transform: 'translate(' + RADIUS / 8 + ', ' + 0 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /**************** LOD max ***********************/

    var fireExtinguisher2 = new Three.Object3D();

    fireExtinguisher2.add(objectMaxLOD.clone());

    var value = new Three.Box3().setFromObject(fireExtinguisher2);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);

    fireExtinguisher2.rotation.y += -Math.PI / 2;
    fireExtinguisher2.position.y += -HEIGHT / 1.25 + newAltitude;
    fireExtinguisher2.scale.set(RADIUS / deltaX, RADIUS / deltaX, HEIGHT / deltaY);

    /**************** LOD middle ***********************/

    var fireExtinguisher1 = new Three.Object3D();

    fireExtinguisher1.add(objectMiddleLOD.clone());

    fireExtinguisher1.position.y += -HEIGHT / 1.25 + newAltitude;
    fireExtinguisher1.scale.set(RADIUS / deltaX, RADIUS / deltaX, HEIGHT / deltaY);

    /**************** LOD min ***********************/

    var fireExtinguisher0 = new Three.Object3D();

    fireExtinguisher0.add(objectMinLOD.clone());

    fireExtinguisher0.position.y += -HEIGHT / 1.35 + newAltitude;
    fireExtinguisher0.scale.set(RADIUS / deltaX, RADIUS / deltaX, HEIGHT / deltaY);

    /*** add all Level of Detail ***/

    var lod = new Three.LOD();

    lod.addLevel(fireExtinguisher2, 200);
    lod.addLevel(fireExtinguisher1, 900);
    lod.addLevel(fireExtinguisher0, 1200);
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