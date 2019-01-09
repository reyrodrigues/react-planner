import React from 'react';
import * as Three from 'three';
import path from 'path';

export default {
  name: 'gate',
  prototype: 'holes',

  info: {
    tag: ['gate'],
    title: 'gate',
    description: 'hole in the wall',
    image: require('./gate.jpg')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 80
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 215
      }
    },
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0
      }
    },
    thickness: {
      label: 'thickness',
      type: 'length-measure',
      defaultValue: {
        length: 30
      }
    }
  },

  render2D: function render2D(element, layer, scene) {
    var STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '3px', fill: '#000' };
    var STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '4px', fill: '#0096fd', cursor: 'move' };
    var STYLE_ARC_BASE = { stroke: '#000', strokeWidth: '3px', strokeDasharray: '5,5', fill: 'none' };
    var STYLE_ARC_SELECTED = {
      stroke: '#0096fd',
      strokeWidth: '4px',
      strokeDasharray: '5,5',
      fill: 'none',
      cursor: 'move'
    };

    var epsilon = 3;

    var holeWidth = element.properties.get('width').get('length');
    var holePath = 'M' + 0 + ' ' + -epsilon + '  L' + holeWidth + ' ' + -epsilon + '  L' + holeWidth + ' ' + epsilon + '  L' + 0 + ' ' + epsilon + '  z';
    var arcPath = 'M' + 0 + ',' + 0 + '  A' + 0 + ',' + 0 + ' 0 0,1 ' + holeWidth + ',' + 0;
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    var arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    var length = element.properties.get('width').get('length');

    return React.createElement(
      'g',
      { transform: 'translate(' + -length / 2 + ', 0)' },
      React.createElement('line', { key: '1', x1: 0, y1: holeWidth / 6 - epsilon, x2: 0, y2: -holeWidth / 6 + epsilon, style: holeStyle,
        transform: 'scale(' + -1 + ',' + 1 + ')' }),
      React.createElement('line', { key: '2', x1: -holeWidth, y1: holeWidth / 6 - epsilon, x2: -holeWidth, y2: -holeWidth / 6 + epsilon, style: holeStyle,
        transform: 'scale(' + -1 + ',' + 1 + ')' }),
      React.createElement('path', { key: '3', d: arcPath, style: arcStyle })
    );
  },

  render3D: function render3D(element, layer, scene) {

    var object = new Three.Object3D();
    return Promise.resolve(object);
  }

};