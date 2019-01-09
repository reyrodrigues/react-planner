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

var WIDTH = 90;
var DEPTH = 40;
var HEIGHT = 30;

var grey = new Three.MeshLambertMaterial({ color: 0xd9d7d7 });
grey.side = Three.DoubleSide;
var darkGrey = new Three.MeshLambertMaterial({ color: 0x808287 });
darkGrey.side = Three.DoubleSide;
var black = new Three.MeshLambertMaterial({ color: 0x000000 });
black.side = Three.DoubleSide;

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var air_conditioner = new Three.Mesh();

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var width = .15;
  var height = .6;
  var radius = 0.15;

  roundedRectShape.moveTo(x, y);
  roundedRectShape.lineTo(x + width, y);
  roundedRectShape.lineTo(x + width + radius, y + radius);
  roundedRectShape.quadraticCurveTo(x + width + radius, y + height, x + width / 2, y + height);
  roundedRectShape.lineTo(x + width / 2, y + height);
  roundedRectShape.lineTo(x, y + height);

  var extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var bodyGeometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
  var body = new Three.Mesh(bodyGeometry, grey);

  body.position.set(-.11, 1.2, 0);
  body.rotation.z += Math.PI;
  air_conditioner.add(body);

  var j = 1.18;

  for (var i = -.30; i > -.36; i -= .005) {

    var gridHorizontalGeometry = new Three.BoxGeometry(.001, .025, .705);
    var gridHorizontal = new Three.Mesh(gridHorizontalGeometry, darkGrey);
    gridHorizontal.position.set(i, j, .5);
    gridHorizontal.rotation.z += Math.PI / 4;
    air_conditioner.add(gridHorizontal);
    j -= .005;
  }

  for (var k = .15; k < .87; k += .05) {
    var gridVerticalGeometry = new Three.BoxGeometry(.079, .025, .005);
    var gridVertical = new Three.Mesh(gridVerticalGeometry, darkGrey);
    gridVertical.position.set(-.324, 1.148, k);
    gridVertical.rotation.z += Math.PI / 4;
    air_conditioner.add(gridVertical);
  }

  var roundedRectShape2 = new Three.Shape();

  var x2 = 0;
  var y2 = 0;
  var width2 = .2;
  var height2 = .4;
  var radius2 = 0.15;

  roundedRectShape2.moveTo(x2, y2);
  roundedRectShape2.lineTo(x2 + width2, y2);
  roundedRectShape2.quadraticCurveTo(x2 + width2 + radius2, y2 + height2, x2 + width2 / 2, y2 + height2);
  roundedRectShape2.lineTo(x2 + width2 / 2, y2 + height2);
  roundedRectShape2.quadraticCurveTo(x2 + width2 + radius2, y2 + height2 / 4, x2, y2);

  var extrudeSettings2 = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var frontCoverGeometry = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
  var frontCover = new Three.Mesh(frontCoverGeometry, grey);

  frontCover.position.set(-.2, 1.1, 0);
  frontCover.rotation.z += Math.PI;
  air_conditioner.add(frontCover);

  var roundedRectShape3 = new Three.Shape();

  var x3 = 0;
  var y3 = 0;
  var width3 = .1;
  var height3 = .1;
  var radius3 = 0.15;

  roundedRectShape3.moveTo(x3, y3);
  roundedRectShape3.quadraticCurveTo(x3 - width3 / 2 + radius3 / 2, y3 - height3, x3 + width3, y3);
  roundedRectShape3.lineTo(x3 + width3, y3);
  roundedRectShape3.quadraticCurveTo(x3 + width3 / 2 + radius3 / 2, y3 + 2 * height3, x3 + width3 / 2, y3 + height3);
  roundedRectShape3.lineTo(x3 + width3 / 2, y3 + height3);
  roundedRectShape3.quadraticCurveTo(x3 + width3 / 4, y3 + height3 / 6, x3, y3);

  var extrudeSettings3 = {
    steps: 2,
    depth: .1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var flapSupportGeometry = new Three.ExtrudeGeometry(roundedRectShape3, extrudeSettings3);
  var flapLeft = new Three.Mesh(flapSupportGeometry, darkGrey);

  flapLeft.position.set(-.27, .62, 0.1);
  flapLeft.rotation.y += Math.PI;
  flapLeft.rotation.z -= Math.PI / 9;
  air_conditioner.add(flapLeft);

  var flapRight = new Three.Mesh(flapSupportGeometry, darkGrey);

  flapRight.position.set(-.27, .62, 1);
  flapRight.rotation.y += Math.PI;
  flapRight.rotation.z -= Math.PI / 9;
  air_conditioner.add(flapRight);

  var points2 = [];

  points2.push(new Three.Vector3(.5, 0));
  points2.push(new Three.Vector3(.5, 0));
  points2.push(new Three.Vector3(.5, .8));
  points2.push(new Three.Vector3(.5, .8));

  var flapGeometry = new Three.LatheGeometry(points2, 200, Math.PI / 2, Math.PI / 16);
  var flap1 = new Three.Mesh(flapGeometry, darkGrey);

  flap1.position.set(-.4, .18, .9);
  flap1.rotation.z += Math.PI / 2;
  flap1.rotation.y += -Math.PI / 2;

  air_conditioner.add(flap1);

  var flap2 = new Three.Mesh(flapGeometry, darkGrey);

  flap2.position.set(-.4, .15, .9);
  flap2.rotation.z += Math.PI / 2;
  flap2.rotation.y += -Math.PI / 2;

  air_conditioner.add(flap2);

  return air_conditioner;
}

function makeObjectMinLOD() {

  var air_conditioner = new Three.Mesh();

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var width = .15;
  var height = .6;
  var radius = 0.15;

  roundedRectShape.moveTo(x, y);
  roundedRectShape.lineTo(x + width, y);
  roundedRectShape.lineTo(x + width + radius, y + radius);
  roundedRectShape.quadraticCurveTo(x + width + radius, y + height, x + width / 2, y + height);
  roundedRectShape.lineTo(x + width / 2, y + height);
  roundedRectShape.lineTo(x, y + height);

  var extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var bodyGeometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
  var body = new Three.Mesh(bodyGeometry, grey);

  body.position.set(-.11, 1.2, 0);
  body.rotation.z += Math.PI;
  air_conditioner.add(body);

  var roundedRectShape2 = new Three.Shape();

  var x2 = 0;
  var y2 = 0;
  var width2 = .2;
  var height2 = .4;
  var radius2 = 0.15;

  roundedRectShape2.moveTo(x2, y2);
  roundedRectShape2.lineTo(x2 + width2, y2);
  roundedRectShape2.quadraticCurveTo(x2 + width2 + radius2, y2 + height2, x2 + width2 / 2, y2 + height2);
  roundedRectShape2.lineTo(x2 + width2 / 2, y2 + height2);
  roundedRectShape2.quadraticCurveTo(x2 + width2 + radius2, y2 + height2 / 4, x2, y2);

  var extrudeSettings2 = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var frontCoverGeometry = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
  var frontCover = new Three.Mesh(frontCoverGeometry, grey);

  frontCover.position.set(-.2, 1.1, 0);
  frontCover.rotation.z += Math.PI;
  air_conditioner.add(frontCover);

  return air_conditioner;
}

exports.default = {
  name: 'conditioner',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'metal'],
    title: 'air conditioner',
    description: 'air conditioner',
    image: null
  },
  properties: {
    altitude: {
      label: 'quota',
      type: 'length-measure',
      defaultValue: {
        length: 220,
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

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' } }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: 'middle', fontSize: '11px' } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /*************** lod max *******************/

    var air_conditionerMaxLOD = new Three.Object3D();
    air_conditionerMaxLOD.add(objectMaxLOD.clone());

    var value = new Three.Box3().setFromObject(air_conditionerMaxLOD);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    air_conditionerMaxLOD.position.x += WIDTH / 2.2;
    air_conditionerMaxLOD.position.z += DEPTH / 1.2;
    air_conditionerMaxLOD.position.y += newAltitude;
    air_conditionerMaxLOD.rotation.y += -Math.PI / 2;
    air_conditionerMaxLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX / 1.4);

    /*************** lod min *******************/

    var air_conditionerMinLOD = new Three.Object3D();
    air_conditionerMinLOD.add(objectMinLOD.clone());
    air_conditionerMinLOD.position.x += WIDTH / 2.2;
    air_conditionerMinLOD.position.z += DEPTH / 1.2;
    air_conditionerMinLOD.position.y += newAltitude;
    air_conditionerMinLOD.rotation.y += -Math.PI / 2;
    air_conditionerMinLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX / 1.4);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(air_conditionerMaxLOD, 200);
    lod.addLevel(air_conditionerMinLOD, 900);
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