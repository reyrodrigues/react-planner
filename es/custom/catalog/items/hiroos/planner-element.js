import * as Three from 'three';
import React from 'react';

var cubeMaterial = new Three.MeshLambertMaterial({ color: 0x65696c });
var textureLoader = new Three.TextureLoader();
var frontTexture1 = textureLoader.load(null);
var newWidth = 175;
var newDepth = 85;
var newHeight = 195;

function makeObjectMaxLOD(newWidth, newHeight, newDepth) {

  var rack = new Three.Mesh();

  var frontTexture = void 0,
      backTexture = void 0;

  // if((Math.floor(Math.random()*10)+1) % 2 === 0) {
  //   backTexture  = backTexture1;
  frontTexture = frontTexture1;
  // }
  // else {
  //   backTexture = backTexture2;
  //   frontTexture= frontTexture2;
  // }

  //base
  var cubeGeometryBase = new Three.BoxGeometry(newWidth, newHeight, newDepth);

  var p1 = new Three.Mesh(cubeGeometryBase, cubeMaterial);
  p1.position.set(0, 1, 0);
  rack.add(p1);

  var planeGeometryFront = new Three.PlaneGeometry(newWidth, newHeight);
  var planeMaterialFront = new Three.MeshLambertMaterial({ map: frontTexture });

  var front = new Three.Mesh(planeGeometryFront, planeMaterialFront);
  front.position.set(0, 1, newDepth / 1.95);
  rack.add(front);

  // let planeGeometryBack = new Three.PlaneGeometry(newWidth,newHeight);
  // let planeMaterialBack = new Three.MeshLambertMaterial({map:backTexture});
  //
  // let back = new Three.Mesh(planeGeometryBack,planeMaterialBack);
  // back.position.set(0,1,-newDepth/1.95);
  // back.rotation.y+=Math.PI;
  // rack.add(back);

  return rack;
}

function makeObjectMinLOD(newWidth, newHeight, newDepth) {

  var rack = new Three.Mesh();

  //base
  var cubeGeometryBase = new Three.BoxGeometry(newWidth, newHeight, newDepth);

  var p1 = new Three.Mesh(cubeGeometryBase, cubeMaterial);
  p1.position.set(0, 1, 0);
  rack.add(p1);

  return rack;
}

export default {
  name: "hiroos",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "hiroos",
    description: "hiroos",
    image: null
  },
  properties: {
    patternColor: {
      label: "pattern colori",
      type: "color",
      defaultValue: "#f5f4f4"
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

    var fillValue = element.selected ? "#99c3fb" : element.properties.get('patternColor');

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }
    return React.createElement(
      'g',
      { transform: 'translate(' + -newWidth / 2 + ',' + -newDepth / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: newWidth, height: newDepth,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: fillValue } }),
      React.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + newWidth / 2 + ', ' + newDepth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.get('name')
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /**************** LOD max ***********************/

    var rackMaxLOD = new Three.Object3D();

    var objectMaxLOD = makeObjectMaxLOD(newWidth, newHeight, newDepth);
    rackMaxLOD.add(objectMaxLOD.clone());
    rackMaxLOD.rotation.y = Math.PI;
    rackMaxLOD.position.y += newHeight / 2 + newAltitude;

    /**************** LOD min ***********************/

    var rackMinLOD = new Three.Object3D();
    var objectMinLOD = makeObjectMinLOD(newWidth, newHeight, newDepth);
    rackMinLOD.add(objectMinLOD.clone());
    rackMinLOD.rotation.y = Math.PI;
    rackMinLOD.position.y += newHeight / 2 + newAltitude;

    /*** add all Level of Detail ***/

    var lod = new Three.LOD();

    lod.addLevel(rackMaxLOD, 100);
    lod.addLevel(rackMinLOD, 1800);
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