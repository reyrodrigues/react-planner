'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var Three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grey = new Three.MeshLambertMaterial({ color: 0x3f3f3f });
var white = new Three.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
var black = new Three.MeshLambertMaterial({ color: 0x000000 });

function makeDoor(handleSide) {

  var slidingDoor = new Three.Mesh();

  var doorShape = new Three.Shape();
  doorShape.moveTo(1, 2);
  doorShape.lineTo(0, 2);
  doorShape.lineTo(0, 0);
  doorShape.lineTo(1, 0);

  var doorHole = new Three.Path();
  doorHole.moveTo(.65, 1.75);
  doorHole.lineTo(.35, 1.75);
  doorHole.lineTo(.35, 1.25);
  doorHole.lineTo(.65, 1.25);
  doorShape.holes.push(doorHole);

  var extrudeSettings = {
    steps: 2,
    depth: 0.05,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometry = new Three.ExtrudeGeometry(doorShape, extrudeSettings);
  var door = new Three.Mesh(geometry, grey);
  if (handleSide === 'right') door.position.set(-1, 0, 0);else door.position.set(0, 0, 0);
  slidingDoor.add(door);

  var doorGeometry = new Three.BoxGeometry(1, 2, 0.05);
  var door2 = new Three.Mesh(doorGeometry, grey);
  if (handleSide === 'right') door2.position.set(1.5, 1, 0.065);else door2.position.set(-.5, 1, 0.065);
  door.add(door2);

  var barGeometry = new Three.BoxGeometry(2, 0.1, 0.1);
  var doorBar = new Three.Mesh(barGeometry, grey);
  doorBar.position.set(-0, 2.07, 0.05);
  slidingDoor.add(doorBar);

  var glassGeometry = new Three.BoxGeometry(0.3, 0.5, 0.05);
  var glass = new Three.Mesh(glassGeometry, white);
  glass.position.set(0.5, 1.5, 0.025);
  door.add(glass);

  var HandleGeometry1 = new Three.CylinderGeometry(0.051, 0.051, 0.0625, 80, 80, true);
  black.side = Three.DoubleSide;
  var handle_p1 = new Three.Mesh(HandleGeometry1, black);
  handle_p1.position.set(0.2, 1, 0.025);
  handle_p1.rotation.x = Math.PI / 2;
  door.add(handle_p1);

  var HandleGeometry2 = new Three.BoxGeometry(0.1, 0.02, 0.0625);
  var handle_p2 = new Three.Mesh(HandleGeometry2, black);
  handle_p2.position.set(0.2, 1, 0.025);
  door.add(handle_p2);

  if (handleSide === 'left') {
    handle_p1.position.x = 0.8;
    handle_p2.position.x = 0.8;
  }

  return slidingDoor;
}

exports.default = {
  name: 'sliding door',
  prototype: 'holes',

  info: {
    tag: ['door'],
    title: 'sliding door',
    description: 'iron door',
    image: require('./slidingDoor.png')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 200,
        unit: 'cm'
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 215,
        unit: 'cm'
      }
    },
    thickness: {
      label: 'thickness',
      type: 'length-measure',
      defaultValue: {
        length: 30,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    flip_horizontal: {
      label: 'horizontal flip',
      type: 'checkbox',
      defaultValue: 'none',
      values: {
        'none': 'none',
        'yes': 'yes'
      }
    },
    flip_vertical: {
      label: 'vertical flip',
      type: 'checkbox',
      defaultValue: 'right',
      values: {
        'right': 'right',
        'left': 'left'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '14px', fill: '#000' };
    var STYLE_HOLE_BASE2 = { stroke: '#000', strokeWidth: '16px', fill: '#000' };
    var STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '14px', fill: '#0096fd', cursor: 'move' };

    var epsilon = 3;
    var flip = element.properties.get('flip_horizontal');
    var handleSide = element.properties.get('flip_vertical');
    var holeWidth = element.properties.get('width').get('length');
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    var holeStyle2 = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE2;
    var length = element.properties.get('width').get('length');

    var scaleX = void 0,
        scaleY = void 0;
    var scaleX2 = void 0,
        scaleY2 = void 0;
    var pX1 = void 0,
        pX2 = void 0;

    flip ? flip = 'yes' : flip = 'none';
    handleSide ? handleSide = 'right' : handleSide = 'left';

    if (flip === 'yes') {
      scaleX = 1;
      if (handleSide === 'right') {
        pX1 = 0;
        pX2 = holeWidth / 2;
        scaleY = -1;
      } else {
        pX1 = holeWidth / 2;
        pX2 = holeWidth;
        scaleY = -1;
      }
    } else {
      scaleX = 1;
      if (handleSide === 'right') {
        pX1 = holeWidth / 2;
        pX2 = holeWidth;
        scaleY = 1;
      } else {
        pX1 = 0;
        pX2 = holeWidth / 2;
        scaleY = 1;
      }
    }
    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -element.properties.get('width').get('length') / 2 + ', 0)' },
      _react2.default.createElement('line', { key: '1', x1: '0', y1: 0 - epsilon, x2: holeWidth, y2: 0 - epsilon, style: holeStyle,
        transform: 'scale(' + scaleX + ',' + scaleY + ')' }),
      _react2.default.createElement('line', { key: '2', x1: pX1, y1: 5 - epsilon, x2: pX2, y2: 5 - epsilon, style: holeStyle2,
        transform: 'scale(' + scaleX + ',' + scaleY + ')' }),
      _react2.default.createElement('line', { key: '3', x1: holeWidth, y1: 0 - epsilon, x2: holeWidth, y2: 15 + epsilon, style: holeStyle2,
        transform: 'scale(' + scaleX + ',' + scaleY + ')' }),
      _react2.default.createElement('line', { key: '4', x1: '0', y1: 0 - epsilon, x2: '0', y2: 15 + epsilon, style: holeStyle2,
        transform: 'scale(' + scaleX + ',' + scaleY + ')' })
    );
  },

  render3D: function render3D(element, layer, scene) {

    var flip = element.properties.get('flip_horizontal');
    var handleSide = element.properties.get('flip_vertical');
    var width = element.properties.get('width').get('length');
    var height = element.properties.get('height').get('length');
    var thickness = element.properties.get('thickness').get('length');
    var newAltitude = element.properties.get('altitude').get('length');

    flip ? flip = 'yes' : flip = 'none';
    handleSide ? handleSide = 'right' : handleSide = 'left';

    var slidingDoor = new Three.Object3D();
    slidingDoor.add(makeDoor(handleSide).clone());

    var valuePosition = new Three.Box3().setFromObject(slidingDoor);

    var deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    var deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    var deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    if (element.selected) {
      var boundingBox = new Three.BoxHelper(slidingDoor, 0x99c3fb);
      boundingBox.material.linewidth = 5;
      boundingBox.renderOrder = 1000;
      boundingBox.material.depthTest = false;
      slidingDoor.add(boundingBox);
    }

    if (flip === 'yes') slidingDoor.rotation.y += Math.PI;

    slidingDoor.position.y += newAltitude;
    slidingDoor.scale.set(width / deltaX, height / deltaY, thickness / deltaZ);

    return Promise.resolve(slidingDoor);
  }
};