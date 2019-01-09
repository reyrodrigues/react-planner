import * as Three from 'three';
import React from 'react';

var textureLoader = new Three.TextureLoader();
var mat = textureLoader.load(require('./copper.jpg'));
var frameMaterial = new Three.MeshLambertMaterial({ map: mat });

function makeObjectMaxLOD(RADIUS, HEIGHT) {

  var RADIUS_10 = RADIUS / 10;
  var RADIUS_2_5 = RADIUS / 2.5;

  var column = new Three.Mesh();
  var object = new Three.Mesh(new Three.CylinderGeometry(RADIUS, RADIUS, HEIGHT, 32), frameMaterial);

  var frame1 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT + HEIGHT / 10, 32), frameMaterial);
  var frame2 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT + HEIGHT / 10, 32), frameMaterial);
  var frame3 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT + HEIGHT / 10, 32), frameMaterial);
  var frame4 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT + HEIGHT / 10, 32), frameMaterial);

  frame1.position.x += RADIUS_2_5;
  frame1.position.z += RADIUS_2_5;
  frame2.position.x -= RADIUS_2_5;
  frame2.position.z -= RADIUS_2_5;
  frame3.position.x -= RADIUS_2_5;
  frame3.position.z += RADIUS_2_5;
  frame4.position.x += RADIUS_2_5;
  frame4.position.z -= RADIUS_2_5;
  column.add(frame1);
  column.add(frame2);
  column.add(frame3);
  column.add(frame4);
  column.add(object);

  return column;
}

function makeObjectMinLOD(RADIUS, HEIGHT) {

  var RADIUS_10 = RADIUS / 10;
  var RADIUS_2_5 = RADIUS / 2.5;

  var column = new Three.Mesh();
  var object = new Three.Mesh(new Three.CylinderGeometry(RADIUS, RADIUS, HEIGHT, 6, 6), frameMaterial);

  var frame1 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT + HEIGHT / 10, 6), frameMaterial);
  var frame2 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT + HEIGHT / 10, 6), frameMaterial);
  var frame3 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT + HEIGHT / 10, 6), frameMaterial);
  var frame4 = new Three.Mesh(new Three.CylinderGeometry(RADIUS_10, RADIUS_10, HEIGHT + HEIGHT / 10, 6), frameMaterial);

  frame1.position.x += RADIUS_2_5;
  frame1.position.z += RADIUS_2_5;
  frame2.position.x -= RADIUS_2_5;
  frame2.position.z -= RADIUS_2_5;
  frame3.position.x -= RADIUS_2_5;
  frame3.position.z += RADIUS_2_5;
  frame4.position.x += RADIUS_2_5;
  frame4.position.z -= RADIUS_2_5;
  column.add(frame1);
  column.add(frame2);
  column.add(frame3);
  column.add(frame4);
  column.add(object);

  return column;
}
export default {
  name: 'round column',
  prototype: 'items',

  info: {
    tag: ['structure'],
    title: 'round column',
    description: 'round column',
    image: require('./column.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    radius: {
      label: 'radius',
      type: 'length-measure',
      defaultValue: {
        length: 20,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var RADIUS = element.properties.get('radius').get('length');
    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    var circleStyle = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };

    return React.createElement(
      'g',
      null,
      React.createElement('circle', { key: '1', cx: '0', cy: '0', r: RADIUS, style: circleStyle }),
      React.createElement(
        'text',
        { key: '2', cx: '0', cy: '0',
          transform: 'scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: 'middle', fontSize: '11px' } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var HEIGHT = element.properties.get('height').get('length');
    var RADIUS = element.properties.get('radius').get('length');
    var newAltitude = element.properties.get('altitude').get('length');

    /**************** LOD max ***********************/

    var columnMaxLOD = new Three.Object3D();
    var objectMaxLOD = makeObjectMaxLOD(RADIUS, HEIGHT);
    columnMaxLOD.add(objectMaxLOD.clone());
    columnMaxLOD.position.y += HEIGHT / 2 + newAltitude;

    /**************** LOD min ***********************/

    var columnMinLOD = new Three.Object3D();
    var objectMinLOD = makeObjectMinLOD(RADIUS, HEIGHT);
    columnMinLOD.add(objectMinLOD.clone());
    columnMinLOD.position.y += HEIGHT / 2 + newAltitude;

    /*** add all Level of Detail ***/

    var lod = new Three.LOD();

    lod.addLevel(columnMaxLOD, 1300);
    lod.addLevel(columnMinLOD, 2000);
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