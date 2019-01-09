import * as Three from 'three';
import React from 'react';

var WIDTH = 30;
var DEPTH = 40;
var HEIGHT = 70;

var textureLoader = new Three.TextureLoader();
var Image = textureLoader.load(require('./bronze-texture.jpg'));
var material = new Three.MeshLambertMaterial({ map: Image });

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var umbrellaStand = new Three.Mesh();

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var width = .45;
  var height = .7;

  roundedRectShape.moveTo(x, y);
  roundedRectShape.lineTo(x + width, y);
  roundedRectShape.lineTo(x + width, y + height);
  roundedRectShape.lineTo(x, y + height);

  var holePath = new Three.Path();
  holePath.moveTo(width / 2, height / 2);
  holePath.absellipse(.225, .15, .100, .025, .025, Math.PI * 2, false);
  roundedRectShape.holes.push(holePath);

  var extrudeSettings = {
    steps: 2,
    depth: .05,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var SideGeometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
  var Side1 = new Three.Mesh(SideGeometry, material);

  Side1.position.set(.05, 1.2, 0);
  Side1.rotation.z += Math.PI;
  umbrellaStand.add(Side1);

  var Side2 = new Three.Mesh(SideGeometry, material);
  Side2.position.set(.05, 1.2, -.4);
  Side2.rotation.z += Math.PI;
  umbrellaStand.add(Side2);

  var Side3 = new Three.Mesh(SideGeometry, material);
  Side3.position.set(.05, 1.2, -.4);
  Side3.rotation.z += Math.PI;
  Side3.rotation.y += Math.PI / 2;
  umbrellaStand.add(Side3);

  var Side4 = new Three.Mesh(SideGeometry, material);
  Side4.position.set(-.45, 1.2, -.4);
  Side4.rotation.z += Math.PI;
  Side4.rotation.y += Math.PI / 2;
  umbrellaStand.add(Side4);

  var geometryBox = new Three.BoxGeometry(.55, .45, .05);
  var downPlane = new Three.Mesh(geometryBox, material);
  downPlane.rotation.x += Math.PI / 2;
  downPlane.position.set(-.175, .475, -.175);
  umbrellaStand.add(downPlane);

  return umbrellaStand;
}

function makeObjectMinLOD() {

  var umbrellaStand = new Three.Mesh();

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var width = .45;
  var height = .7;

  roundedRectShape.moveTo(x, y);
  roundedRectShape.lineTo(x + width, y);
  roundedRectShape.lineTo(x + width, y + height);
  roundedRectShape.lineTo(x, y + height);

  var extrudeSettings = {
    steps: 2,
    depth: .05,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var SideGeometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
  var Side1 = new Three.Mesh(SideGeometry, material);

  Side1.position.set(.05, 1.2, 0);
  Side1.rotation.z += Math.PI;
  umbrellaStand.add(Side1);

  var Side2 = new Three.Mesh(SideGeometry, material);
  Side2.position.set(.05, 1.2, -.4);
  Side2.rotation.z += Math.PI;
  umbrellaStand.add(Side2);

  var Side3 = new Three.Mesh(SideGeometry, material);
  Side3.position.set(.05, 1.2, -.4);
  Side3.rotation.z += Math.PI;
  Side3.rotation.y += Math.PI / 2;
  umbrellaStand.add(Side3);

  var Side4 = new Three.Mesh(SideGeometry, material);
  Side4.position.set(-.45, 1.2, -.4);
  Side4.rotation.z += Math.PI;
  Side4.rotation.y += Math.PI / 2;
  umbrellaStand.add(Side4);

  var geometryBox = new Three.BoxGeometry(.55, .45, .05);
  var downPlane = new Three.Mesh(geometryBox, material);
  downPlane.rotation.x += Math.PI / 2;
  downPlane.position.set(-.175, .475, -.175);
  umbrellaStand.add(downPlane);

  return umbrellaStand;
}

export default {
  name: "umbrella-stand",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "umbrella stand",
    description: "umbrella stand",
    image: require('./umbrellaStand.png')
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
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" } }),
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

    /***************** lod max *******************/

    var umbrellaStandMaxLOD = new Three.Object3D();
    umbrellaStandMaxLOD.add(objectMaxLOD.clone());

    var value = new Three.Box3().setFromObject(umbrellaStandMaxLOD);
    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    umbrellaStandMaxLOD.position.x += -WIDTH / 1.5;
    umbrellaStandMaxLOD.position.z += DEPTH / 4;
    umbrellaStandMaxLOD.position.y += -HEIGHT / 1.6 + newAltitude;
    umbrellaStandMaxLOD.rotation.y += -Math.PI / 2;
    umbrellaStandMaxLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX);

    /**************** lod min *******************/

    var umbrellaStandMinLOD = new Three.Object3D();
    umbrellaStandMinLOD.add(objectMinLOD.clone());
    umbrellaStandMinLOD.position.x += -WIDTH / 1.5;
    umbrellaStandMinLOD.position.z += DEPTH / 4;
    umbrellaStandMinLOD.position.y += -HEIGHT / 1.6 + newAltitude;
    umbrellaStandMinLOD.rotation.y += -Math.PI / 2;
    umbrellaStandMinLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(umbrellaStandMaxLOD, 200);
    lod.addLevel(umbrellaStandMinLOD, 900);
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