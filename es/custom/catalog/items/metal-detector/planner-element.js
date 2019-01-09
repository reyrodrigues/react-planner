import * as Three from 'three';
import React from 'react';

var newWidth = 90;
var newDepth = 90;
var newHeight = 220;

var grey = new Three.MeshLambertMaterial({ color: 0xa6a9ad });
var darkGrey = new Three.MeshLambertMaterial({ color: 0x3f454f });
var red = new Three.MeshLambertMaterial({ color: 0xff0000 });

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var metalDetector = new Three.Mesh();

  var textureLoader = new Three.TextureLoader();
  var display1 = textureLoader.load(require('./display1.png'));
  var display2 = textureLoader.load(require('./display2.png'));

  var cubeGeometryBase = new Three.BoxGeometry(0.72, 0.2, 0.4);
  var up = new Three.Mesh(cubeGeometryBase, grey);
  up.position.set(0, 2, 0);
  metalDetector.add(up);

  for (var j = -0.2; j <= 0.2; j += 0.4) {

    var cubeGeometryBorderUp = new Three.BoxGeometry(0.72, 0.03, 0.03);
    var up_border_down = new Three.Mesh(cubeGeometryBorderUp, darkGrey);
    up_border_down.position.set(0, 1.9, j);
    metalDetector.add(up_border_down);

    var up_border_top = new Three.Mesh(cubeGeometryBorderUp, darkGrey);
    up_border_top.position.set(0, 2.1, j);
    metalDetector.add(up_border_top);
  }

  var cubeGeometrySide = new Three.BoxGeometry(0.08, 2.3, 0.6);
  var left = new Three.Mesh(cubeGeometrySide, grey);
  left.position.set(-0.4, 1, 0);
  metalDetector.add(left);

  var right = new Three.Mesh(cubeGeometrySide, grey);
  right.position.set(0.4, 1, 0);
  metalDetector.add(right);

  for (var k = -0.165; k <= 2.20; k += 2.32) {

    var cubeGeometrySide2 = new Three.BoxGeometry(0.09, 0.03, 0.68);
    var left2 = new Three.Mesh(cubeGeometrySide2, darkGrey);
    left2.position.set(-0.4, k, 0);
    metalDetector.add(left2);

    var right2 = new Three.Mesh(cubeGeometrySide2, darkGrey);
    right2.position.set(0.4, k, 0);
    metalDetector.add(right2);
  }

  for (var i = -0.3; i <= 0.3; i += 0.6) {

    var cubeGeometryBorder = new Three.BoxGeometry(0.09, 2.3, 0.05);
    var left_border = new Three.Mesh(cubeGeometryBorder, darkGrey);
    left_border.position.set(-0.4, 1, i);
    metalDetector.add(left_border);

    var right_border = new Three.Mesh(cubeGeometryBorder, darkGrey);
    right_border.position.set(0.4, 1, i);
    metalDetector.add(right_border);

    var cubeGeometryBorderLed = new Three.BoxGeometry(0.02, 2.3, 0.02);
    var left_borderLed = new Three.Mesh(cubeGeometryBorderLed, red);
    var right_borderLed = new Three.Mesh(cubeGeometryBorderLed, red);

    if (i < 0) {

      left_borderLed.position.set(-0.4, 1, i - .02);
      right_borderLed.position.set(0.4, 1, i - .02);
    } else {

      left_borderLed.position.set(-0.4, 1, i + .02);
      right_borderLed.position.set(0.4, 1, i + .02);
    }

    metalDetector.add(left_borderLed);
    metalDetector.add(right_borderLed);
  }

  var planeDisplay1 = new Three.PlaneGeometry(0.15, 0.15);
  var planeMaterial1 = new Three.MeshLambertMaterial({ map: display1, transparent: true });
  var plane1 = new Three.Mesh(planeDisplay1, planeMaterial1);
  plane1.position.set(-0.15, 2, 0.21);

  var planeDisplay2 = new Three.PlaneGeometry(0.25, 0.15);
  var planeMaterial2 = new Three.MeshLambertMaterial({ map: display2, transparent: true });
  var plane2 = new Three.Mesh(planeDisplay2, planeMaterial2);
  plane2.position.set(0.15, 2, 0.21);

  metalDetector.add(plane1);
  metalDetector.add(plane2);

  return metalDetector;
}

function makeObjectMinLOD() {

  var metalDetector = new Three.Mesh();

  var cubeGeometryBase = new Three.BoxGeometry(0.72, 0.2, 0.4);
  var up = new Three.Mesh(cubeGeometryBase, grey);
  up.position.set(0, 2, 0);
  metalDetector.add(up);

  for (var j = -0.2; j <= 0.2; j += 0.4) {

    var cubeGeometryBorderUp = new Three.BoxGeometry(0.72, 0.03, 0.03);
    var up_border_down = new Three.Mesh(cubeGeometryBorderUp, darkGrey);
    up_border_down.position.set(0, 1.9, j);
    metalDetector.add(up_border_down);

    var up_border_top = new Three.Mesh(cubeGeometryBorderUp, darkGrey);
    up_border_top.position.set(0, 2.1, j);
    metalDetector.add(up_border_top);
  }

  var cubeGeometrySide = new Three.BoxGeometry(0.08, 2.3, 0.6);
  var left = new Three.Mesh(cubeGeometrySide, grey);
  left.position.set(-0.4, 1, 0);
  metalDetector.add(left);

  var right = new Three.Mesh(cubeGeometrySide, grey);
  right.position.set(0.4, 1, 0);
  metalDetector.add(right);

  for (var k = -0.165; k <= 2.20; k += 2.32) {

    var cubeGeometrySide2 = new Three.BoxGeometry(0.09, 0.03, 0.68);
    var left2 = new Three.Mesh(cubeGeometrySide2, darkGrey);
    left2.position.set(-0.4, k, 0);
    metalDetector.add(left2);

    var right2 = new Three.Mesh(cubeGeometrySide2, darkGrey);
    right2.position.set(0.4, k, 0);
    metalDetector.add(right2);
  }

  for (var i = -0.3; i <= 0.3; i += 0.6) {

    var cubeGeometryBorder = new Three.BoxGeometry(0.09, 2.3, 0.05);
    var left_border = new Three.Mesh(cubeGeometryBorder, darkGrey);
    left_border.position.set(-0.4, 1, i);
    metalDetector.add(left_border);

    var right_border = new Three.Mesh(cubeGeometryBorder, darkGrey);
    right_border.position.set(0.4, 1, i);
    metalDetector.add(right_border);
  }

  return metalDetector;
}

export default {
  name: "metal_detector",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "metal detector",
    description: "metal detector",
    image: require('./metalDetector.png')
  },
  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
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
      { transform: 'translate(' + -newWidth / 2 + ',' + -newDepth / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: newWidth, height: newDepth,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#101010" } }),
      React.createElement('circle', { key: '2', cx: '0', cy: '0', r: '45', stroke: 'black', style: { stroke: "black", strokeWidth: "2px", fill: "white" }, transform: 'translate(45,45)' }),
      React.createElement(
        'text',
        { key: '3', x: '0', y: '0', transform: 'translate(' + newWidth / 2 + ', ' + newDepth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    var metalDetectorMaxLOD = new Three.Object3D();
    metalDetectorMaxLOD.add(objectMaxLOD.clone());

    var value = new Three.Box3().setFromObject(metalDetectorMaxLOD);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    metalDetectorMaxLOD.position.y += newHeight / 11.5 + newAltitude;
    metalDetectorMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    var metalDetectorMinLOD = new Three.Object3D();
    metalDetectorMinLOD.add(objectMinLOD.clone());
    metalDetectorMinLOD.position.y += newHeight / 11.5 + newAltitude;
    metalDetectorMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /*** add all Level of Detail ***/

    var lod = new Three.LOD();

    lod.addLevel(metalDetectorMaxLOD, 700);
    lod.addLevel(metalDetectorMinLOD, 1200);
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