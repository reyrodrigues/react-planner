'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var material = new Three.MeshLambertMaterial({ color: 0xf5f4f4 });

exports.default = {
  name: 'square column',
  prototype: 'items',

  info: {
    tag: ['structure'],
    title: 'square column',
    description: 'column',
    image: null
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
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    depth: {
      label: 'depth',
      type: 'length-measure',
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var width = element.properties.get('width').get('length');
    var depth = element.properties.get('depth').get('length');

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    var circleStyle = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -width / 2 + ',' + -depth / 2 + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: width, height: depth, style: circleStyle }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0', transform: 'translate(' + width / 2 + ', ' + depth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: 'middle', fontSize: '11px' } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var HEIGHT = element.properties.get('height').get('length');
    var width = element.properties.get('width').get('length');
    var depth = element.properties.get('depth').get('length');
    var newAltitude = element.properties.get('altitude').get('length');

    var column = new Three.Object3D();

    var object = new Three.Mesh(new Three.BoxGeometry(width, HEIGHT, depth, 32), material);

    column.add(object);

    if (element.selected) {
      var bbox = new Three.BoxHelper(column, 0x99c3fb);
      bbox.material.linewidth = 10;
      bbox.renderOrder = 5000;
      bbox.material.depthTest = false;
      column.add(bbox);
    }

    column.position.y += HEIGHT / 2 + newAltitude;
    column.position.x += width / 2;

    return Promise.resolve(column);
  }
};