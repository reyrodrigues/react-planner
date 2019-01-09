import React from 'react';
import * as Three from 'three';
import { loadObjWithMaterial } from '../../utils/load-obj';
import path from 'path';

var cached3DDoor = null;

var STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '3px', fill: '#000' };
var STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '4px', fill: '#0096fd', cursor: 'move' };
var STYLE_ARC_BASE = { stroke: '#000', strokeWidth: '3px', strokeDasharray: '5,5', fill: 'none' };
var STYLE_ARC_SELECTED = { stroke: '#0096fd', strokeWidth: '4px', strokeDasharray: '5,5', fill: 'none', cursor: 'move' };
var EPSILON = 3;

export default {
  name: 'door',
  prototype: 'holes',

  info: {
    title: 'door',
    tag: ['door'],
    description: 'Wooden door',
    image: require('./door.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 80
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 215
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0
      }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: {
        length: 30
      }
    },
    flip_orizzontal: {
      label: 'flip orizzontale',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes': true
      }
    }
  },

  render2D: function render2D(element, layer, scene) {
    var flip = element.properties.get('flip_orizzontal');
    var holeWidth = element.properties.get('width').get('length');
    var holePath = 'M' + 0 + ' ' + -EPSILON + '  L' + holeWidth + ' ' + -EPSILON + '  L' + holeWidth + ' ' + EPSILON + '  L' + 0 + ' ' + EPSILON + '  z';
    var arcPath = 'M' + 0 + ',' + 0 + '  A' + holeWidth + ',' + holeWidth + ' 0 0,1 ' + holeWidth + ',' + holeWidth;
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    var arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    var length = element.properties.get('width').get('length');

    if (flip == false) {
      return React.createElement(
        'g',
        { transform: 'translate(' + -length / 2 + ', 0)' },
        React.createElement('path', { d: arcPath, style: arcStyle, transform: 'translate(' + 0 + ',' + holeWidth + ') scale(' + 1 + ',' + -1 + ') rotate(' + 0 + ')' }),
        React.createElement('line', { x1: 0, y1: holeWidth - EPSILON, x2: 0, y2: 0 - EPSILON, style: holeStyle, transform: 'scale(' + -1 + ',' + 1 + ')' }),
        React.createElement('path', { d: holePath, style: holeStyle })
      );
    } else {
      return React.createElement(
        'g',
        { transform: 'translate(' + -length / 2 + ', 0)' },
        React.createElement('path', { d: arcPath, style: arcStyle, transform: 'translate(' + 0 + ',' + -holeWidth + ') scale(' + 1 + ',' + 1 + ') rotate(' + 0 + ')' }),
        React.createElement('line', { x1: 0, y1: -holeWidth - EPSILON, x2: 0, y2: 0 - EPSILON, style: holeStyle, transform: 'scale(' + -1 + ',' + 1 + ')' }),
        React.createElement('path', { d: holePath, style: holeStyle })
      );
    }
  },

  render3D: function render3D(element, layer, scene) {
    var onLoadItem = function onLoadItem(object) {
      var boundingBox = new Three.Box3().setFromObject(object);

      var initialWidth = boundingBox.max.x - boundingBox.min.x;
      var initialHeight = boundingBox.max.y - boundingBox.min.y;
      var initialThickness = boundingBox.max.z - boundingBox.min.z;

      if (element.selected) {
        var box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      var width = element.properties.get('width').get('length');
      var height = element.properties.get('height').get('length');
      var thickness = element.properties.get('thickness').get('length');

      object.scale.set(width / initialWidth, height / initialHeight, thickness / initialThickness);

      return object;
    };

    if (cached3DDoor) {
      return Promise.resolve(onLoadItem(cached3DDoor.clone()));
    }

    var mtl = require('./door.mtl');
    var obj = require('./door.obj');
    var img = require('./texture.jpg');

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/').then(function (object) {
      cached3DDoor = object;
      return onLoadItem(cached3DDoor.clone());
    });
  }
};