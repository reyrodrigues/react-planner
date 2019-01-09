import * as Three from 'three';
import React from 'react';

var textureLoader = new Three.TextureLoader();
var front = textureLoader.load(require('./front.png'));
var blackMaterial = new Three.MeshLambertMaterial({ color: 0x3d3d3d });

function makeObjectMaxLOD(newWidth, newHeight, newDepth) {

  var hub = new Three.Mesh();

  var cubeGeometryBase = new Three.BoxGeometry(newWidth, newHeight, newDepth);
  var body = new Three.Mesh(cubeGeometryBase, blackMaterial);
  body.position.set(0, 1, 0);
  hub.add(body);

  for (var i = -newHeight / 2 + newHeight / 32; i < newHeight / 2; i += newHeight / 16) {

    var planeGeometry = new Three.PlaneGeometry(newWidth, newHeight / 16);
    var planeMaterial = new Three.MeshLambertMaterial({ map: front });
    var plane_texture = new Three.Mesh(planeGeometry, planeMaterial);
    plane_texture.position.set(0, i, newDepth / 3 + newDepth / 5.9);
    body.add(plane_texture);
  }

  return hub;
}

function makeObjectMinLOD(newWidth, newHeight, newDepth) {

  var hub = new Three.Mesh();

  var cubeGeometryBase = new Three.BoxGeometry(newWidth, newHeight, newDepth);
  var body = new Three.Mesh(cubeGeometryBase, blackMaterial);
  body.position.set(0, 1, 0);
  hub.add(body);

  return hub;
}
export default {
  name: "hub",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "hub",
    description: "hub",
    image: require('./hub.png')
  },
  properties: {
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 60,
        unit: 'cm'
      }
    },
    depth: {
      label: "depth",
      type: "length-measure",
      defaultValue: {
        length: 30,
        unit: 'cm'
      }
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 200,
        unit: 'cm'
      }
    },
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

    var newWidth = element.properties.get('width').get('length');
    var newDepth = element.properties.get('depth').get('length');

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return React.createElement(
      'g',
      { transform: 'translate(' + -newWidth / 2 + ',' + -newDepth / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: newWidth, height: newDepth,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" } }),
      React.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + newWidth / 2 + ', ' + newDepth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newWidth = element.properties.get('width').get('length');
    var newDepth = element.properties.get('depth').get('length');
    var newHeight = element.properties.get('height').get('length');
    var newAltitude = element.properties.get('altitude').get('length');

    /*************** lod max ******************/

    var hubMaxLOD = new Three.Object3D();
    hubMaxLOD.add(makeObjectMaxLOD(newWidth, newHeight, newDepth).clone());

    var valuePosition = new Three.Box3().setFromObject(hubMaxLOD);

    var deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    var deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    var deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    hubMaxLOD.position.y += newHeight / 2 + newAltitude;
    hubMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /*************** lod min ******************/

    var hubMinLOD = new Three.Object3D();
    hubMinLOD.add(makeObjectMinLOD(newWidth, newHeight, newDepth).clone());
    hubMinLOD.position.y += newHeight / 2 + newAltitude;
    hubMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(hubMaxLOD, 200);
    lod.addLevel(hubMinLOD, 900);
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