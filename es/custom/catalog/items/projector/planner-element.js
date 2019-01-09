import * as Three from 'three';
import React from 'react';

var white = new Three.MeshLambertMaterial({ color: 0xFFFFFF });
var grey = new Three.MeshLambertMaterial({ color: 0xCCCCCC });

function makeObjectMaxLOD(newWidth, newHeight, newDepth) {

  var projector = new Three.Mesh();
  var radius = 0.5;

  var geometry = new Three.CylinderGeometry(radius, radius, newWidth, 32, 32, false, 0, Math.PI);
  var mesh = new Three.Mesh(geometry, grey);
  mesh.position.set(newWidth / 2, newHeight / 2.75, 0);
  mesh.rotation.z += Math.PI / 2;
  mesh.rotation.x += Math.PI;
  projector.add(mesh);

  var g1 = new Three.PlaneGeometry(2 * radius, newWidth);
  var m1 = new Three.Mesh(g1, grey);
  m1.rotation.z += Math.PI / 2;
  m1.rotation.x -= Math.PI / 2;
  m1.position.set(newWidth / 2, newHeight / 2.75, 0);
  projector.add(m1);

  var geometry2 = new Three.BoxGeometry(newWidth - newWidth / 20, newHeight - newHeight / 8, newDepth / 20);
  var mesh2 = new Three.Mesh(geometry2, white);
  mesh2.position.set(newWidth / 2, 0.8 * newHeight, 0);
  projector.add(mesh2);

  var geometry3 = new Three.BoxGeometry(newWidth, newHeight / 50, newDepth / 20);
  var mesh3 = new Three.Mesh(geometry3, grey);
  mesh3.position.set(newWidth / 2, newHeight + newHeight / 4, 0);
  projector.add(mesh3);

  var geometry4 = new Three.BoxGeometry(newWidth, newDepth / 20, newHeight / 20);
  var mesh4 = new Three.Mesh(geometry4, grey);
  mesh4.rotation.x += Math.PI / 2;
  mesh4.position.set(newWidth / 2, newHeight + newHeight / 4.25, newDepth / 20);
  projector.add(mesh4);

  var mesh5 = new Three.Mesh(geometry4, grey);
  mesh5.rotation.x += Math.PI / 2;
  mesh5.position.set(newWidth / 2, newHeight + newHeight / 4.25, -newDepth / 20);
  projector.add(mesh5);

  return projector;
}

function makeObjectMinLOD(newWidth, newHeight, newDepth) {

  var projector = new Three.Mesh();

  var radius = 0.5;

  var geometry = new Three.CylinderGeometry(radius, radius, newWidth, 32, 32, false, 0, Math.PI);
  var mesh = new Three.Mesh(geometry, grey);
  mesh.position.set(newWidth / 2, newHeight / 2.75, 0);
  mesh.rotation.z += Math.PI / 2;
  mesh.rotation.x += Math.PI;
  projector.add(mesh);

  var g1 = new Three.PlaneGeometry(2 * radius, newWidth);
  var m1 = new Three.Mesh(g1, grey);
  m1.rotation.z += Math.PI / 2;
  m1.rotation.x -= Math.PI / 2;
  m1.position.set(newWidth / 2, newHeight / 2.75, 0);
  projector.add(m1);

  var geometry2 = new Three.BoxGeometry(newWidth - newWidth / 20, newHeight - newHeight / 8, newDepth / 20);
  var mesh2 = new Three.Mesh(geometry2, white);
  mesh2.position.set(newWidth / 2, 0.8 * newHeight, 0);
  projector.add(mesh2);

  var geometry3 = new Three.BoxGeometry(newWidth, newHeight / 50, newDepth / 20);
  var mesh3 = new Three.Mesh(geometry3, grey);
  mesh3.position.set(newWidth / 2, newHeight + newHeight / 4, 0);
  projector.add(mesh3);

  var geometry4 = new Three.BoxGeometry(newWidth, newDepth / 20, newHeight / 20);
  var mesh4 = new Three.Mesh(geometry4, grey);
  mesh4.rotation.x += Math.PI / 2;
  mesh4.position.set(newWidth / 2, newHeight + newHeight / 4.25, newDepth / 20);
  projector.add(mesh4);

  var mesh5 = new Three.Mesh(geometry4, grey);
  mesh5.rotation.x += Math.PI / 2;
  mesh5.position.set(newWidth / 2, newHeight + newHeight / 4.25, -newDepth / 20);
  projector.add(mesh5);

  return projector;
}

export default {
  name: "projector",
  prototype: "items",

  info: {
    tag: ['furnishings', 'wood', 'metal'],
    title: "projector",
    description: "projector",
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
    },
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 150,
        unit: 'cm'
      }
    },
    depth: {
      label: "depth",
      type: "length-measure",
      defaultValue: {
        length: 10,
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

    var rect_style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" };

    return React.createElement(
      'g',
      { transform: 'translate(' + -newWidth / 2 + ',' + -newDepth / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: newWidth, height: newDepth, style: rect_style }),
      React.createElement(
        'text',
        { key: '2', x: '0', y: '0', transform: 'translate(' + newWidth / 2 + ', ' + newDepth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');
    var newWidth = element.properties.get('width').get('length');
    var newHeight = element.properties.get('height').get('length');
    var newDepth = element.properties.get('depth').get('length');

    /*********** lod max ***************/

    var projectorMaxLOD = new Three.Object3D();
    projectorMaxLOD.add(makeObjectMaxLOD(newWidth, newHeight, newDepth).clone());

    var value = new Three.Box3().setFromObject(projectorMaxLOD);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    projectorMaxLOD.rotation.y += Math.PI;
    projectorMaxLOD.position.y += -newHeight / 3.2 + newAltitude;
    projectorMaxLOD.position.x += newWidth / 2;
    projectorMaxLOD.position.z += newDepth / 4;
    projectorMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /*********** lod min *****************/

    var projectorMinLOD = new Three.Object3D();
    projectorMinLOD.add(makeObjectMinLOD(newWidth, newHeight, newDepth).clone());
    projectorMinLOD.rotation.y += Math.PI;
    projectorMinLOD.position.y += -newHeight / 3.2 + newAltitude;
    projectorMinLOD.position.x += newWidth / 2;
    projectorMinLOD.position.z += newDepth / 4;
    projectorMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(projectorMaxLOD, 200);
    lod.addLevel(projectorMinLOD, 900);
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