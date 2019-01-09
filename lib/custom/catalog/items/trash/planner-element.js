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

var RADIUS = 20;
var HEIGHT = 40;

exports.default = {
  name: "trash",
  prototype: "items",

  info: {
    tag: ['furnishings'],
    title: "Trash",
    description: "Trash",
    image: require('./trash.png')
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

    var circleStyle = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" };
    var arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce" };

    return _react2.default.createElement(
      'g',
      null,
      _react2.default.createElement('circle', { key: '1', cx: '0', cy: '0', r: RADIUS, style: circleStyle }),
      _react2.default.createElement('line', { key: '2', x1: 0, x2: 0, y1: RADIUS, y2: 1.5 * RADIUS, style: arrow_style }),
      _react2.default.createElement('line', { key: '3', x1: -RADIUS / 2 + .25 * RADIUS, x2: -RADIUS / 2 + RADIUS / 2, y1: 1.2 * RADIUS, y2: 1.5 * RADIUS, style: arrow_style }),
      _react2.default.createElement('line', { key: '4', x1: 0, x2: -RADIUS / 2 + .75 * RADIUS, y1: 1.5 * RADIUS, y2: 1.2 * RADIUS, style: arrow_style }),
      _react2.default.createElement(
        'text',
        { key: '5', cx: '0', cy: '0',
          transform: 'scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    var grey = new Three.MeshLambertMaterial({ color: 0xdddddd });
    grey.side = Three.DoubleSide;

    var cestino = new Three.Object3D();

    var cylinderGeometry1 = new Three.CylinderGeometry(0.25, 0.25, 0.0001, 80);
    var p1 = new Three.Mesh(cylinderGeometry1, grey);
    cestino.add(p1);

    var cylinderGeometry2 = new Three.CylinderGeometry(0.30, 0.25, 0.002, 80, 80, true);
    var p2 = new Three.Mesh(cylinderGeometry2, grey);
    p2.position.set(0, 0.001, 0);
    p1.add(p2);

    var value = new Three.Box3().setFromObject(cestino);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    if (element.selected) {
      var bbox = new Three.BoxHelper(cestino, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      cestino.add(bbox);
    }

    cestino.position.y += HEIGHT / 16 + newAltitude;
    cestino.scale.set(1.5 * RADIUS / deltaX, HEIGHT / deltaY, 1.5 * RADIUS / deltaZ);

    return Promise.resolve(cestino);
  }
};