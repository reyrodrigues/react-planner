import * as Three from 'three';
import { loadObjWithMaterial } from '../../utils/load-obj';

import React from 'react';
import convert from 'convert-units';

var cached3DTV = null;

export default {
  name: "tv",
  prototype: "items",

  info: {
    title: "tv",
    tag: ['furnishing', 'electronics'],
    description: "LCD TV",
    image: require('./tv.png')
  },

  properties: {
    altitude: {
      label: "Altitude",
      type: "length-measure",
      defaultValue: {
        length: 0
      }
    }
  },

  render2D: function render2D(element, layer, scene) {
    var width = { length: 1.60, unit: 'ft' };
    var depth = { length: 0.59, unit: 'ft' };

    var newWidth = convert(width.length).from(width.unit).to(scene.unit);
    var newDepth = convert(depth.length).from(depth.unit).to(scene.unit);

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    var style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" };
    var arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce" };

    return React.createElement(
      'g',
      { transform: 'translate(' + -newWidth / 2 + ',' + -newDepth / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: newWidth, height: newDepth, style: style }),
      React.createElement('line', { key: '2', x1: newWidth / 2, x2: newWidth / 2, y1: newDepth, y2: 1.5 * newDepth, style: arrow_style }),
      React.createElement('line', { key: '3', x1: .35 * newWidth, x2: newWidth / 2, y1: 1.2 * newDepth, y2: 1.5 * newDepth, style: arrow_style }),
      React.createElement('line', { key: '4', x1: newWidth / 2, x2: .65 * newWidth, y1: 1.5 * newDepth, y2: 1.2 * newDepth, style: arrow_style }),
      React.createElement(
        'text',
        { key: '5', x: '0', y: '0', transform: 'translate(' + newWidth / 2 + ', ' + newDepth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {
    var width = { length: 1.60, unit: 'ft' };
    var depth = { length: 0.59, unit: 'ft' };
    var height = { length: 1.05, unit: 'ft' };

    var onLoadItem = function onLoadItem(object) {

      var newWidth = convert(width.length).from(width.unit).to(scene.unit);
      var newHeight = convert(height.length).from(height.unit).to(scene.unit);
      var newDepth = convert(depth.length).from(depth.unit).to(scene.unit);

      var newAltitude = element.properties.get('altitude').get('length');

      if (element.selected) {
        var box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      // Normalize the origin of the object
      var boundingBox = new Three.Box3().setFromObject(object);

      var center = [(boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x, (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y, (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];

      object.position.y += newAltitude;

      object.rotation.y = Math.PI;

      return object;
    };

    if (cached3DTV) {
      return Promise.resolve(onLoadItem(cached3DTV.clone()));
    }

    var mtl = require('./tv.mtl');
    var obj = require('./tv.obj');

    return loadObjWithMaterial(mtl, obj, '').then(function (object) {
      cached3DTV = object;
      return onLoadItem(cached3DTV.clone());
    });
  }

};