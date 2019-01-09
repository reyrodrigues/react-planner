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

var WIDTH = 60;
var DEPTH = 60;
var HEIGHT = 100;

var greyMaterial = new Three.MeshLambertMaterial({ color: 0xC0C0C0 });
greyMaterial.side = Three.DoubleSide;
var greenMaterial = new Three.MeshLambertMaterial({ color: 0x008250 });

function makeArmchairMaxLOD() {
  var armchair = new Three.Object3D();
  var foot = new Three.Mesh();

  //armchair base
  var g_base_foot = new Three.BoxGeometry(0.3, 0.05, 0.4);
  var m_base_foot1 = new Three.Mesh(g_base_foot, greyMaterial);
  m_base_foot1.position.set(0, 0.1, 0.1);
  foot.add(m_base_foot1);

  var g_base_foot2 = new Three.CylinderGeometry(0.055, 0.055, 0.35, 20);
  var m_base_foot2 = new Three.Mesh(g_base_foot2, greyMaterial);
  m_base_foot2.position.set(0, 0.25, 0.15);
  foot.add(m_base_foot2);

  armchair.add(foot);

  //seat
  var seat = new Three.Mesh();

  var extrusionSettings = {
    depth: 0.65,
    bevelEnabled: false,
    bevelSegments: 2,
    steps: 10,
    bevelSize: 1,
    bevelThickness: 1
  };

  var shape_sed = new Three.Shape();
  shape_sed.moveTo(0, 0);
  shape_sed.lineTo(0, 0.05);
  shape_sed.quadraticCurveTo(0, 0.1, -0.02, 0.1);
  shape_sed.lineTo(-0.6, 0.1);
  shape_sed.quadraticCurveTo(-0.6, 0.1, -0.6, 0.07);
  shape_sed.lineTo(-0.6, 0);

  var g_sitting = new Three.ExtrudeGeometry(shape_sed, extrusionSettings);
  var sitting = new Three.Mesh(g_sitting, greenMaterial);

  sitting.rotation.y = Math.PI / 2;
  sitting.rotation.z = Math.PI / 3.5;
  sitting.position.set(-0.325, .905, -0.3);
  seat.add(sitting);

  //back armchair
  var shape_sc = new Three.Shape();
  shape_sc.moveTo(0, 0);
  shape_sc.lineTo(0, 0.1);
  shape_sc.quadraticCurveTo(-0.5, 0.07, -0.97, 0.1);
  shape_sc.quadraticCurveTo(-1, 0.1, -1, 0.07);
  shape_sc.lineTo(-1, 0);
  shape_sc.quadraticCurveTo(-0.5, -0.03, 0, 0);

  var g_back = new Three.ExtrudeGeometry(shape_sc, extrusionSettings);
  var back = new Three.Mesh(g_back, greenMaterial);

  back.rotation.z = -105 * Math.PI / 180;
  back.rotation.y = -Math.PI / 2;
  back.position.set(0.325, 0.52, 0.125);
  seat.add(back);

  var g_asse_rotaz2 = new Three.CylinderGeometry(0.06, 0.06, 0.8, 32, 32, true);
  var asse_rotaz2 = new Three.Mesh(g_asse_rotaz2, greyMaterial);

  asse_rotaz2.rotation.z = -Math.PI / 2;
  asse_rotaz2.position.set(0, 0.45, 0.15);
  seat.add(asse_rotaz2);

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var width = .7;
  var height = .75;
  var radius = 0.25;

  roundedRectShape.moveTo(x, y + radius);
  roundedRectShape.lineTo(x, y + height - radius);
  roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
  roundedRectShape.lineTo(x + width - radius, y + height);
  roundedRectShape.lineTo(x + width, y + radius);
  roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
  roundedRectShape.lineTo(x + radius, y);
  roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

  var extrudeSettings = {
    steps: 2,
    depth: .07,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometry2 = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
  var armrest_1 = new Three.Mesh(geometry2, greyMaterial);
  armrest_1.rotation.y = Math.PI / 2;
  armrest_1.rotation.z = .9 * Math.PI;
  armrest_1.position.set(-0.4, 1, -0.4);
  seat.add(armrest_1);

  var armrest_2 = armrest_1.clone();
  armrest_2.position.x += .73;
  seat.add(armrest_2);
  armchair.add(seat);

  return armchair;
}

function makeArmchairMinLOD() {
  var armchair = new Three.Object3D();
  var foot = new Three.Mesh();

  //armchair base
  var g_base_foot = new Three.BoxGeometry(0.3, 0.05, 0.4);
  var base_foot1 = new Three.Mesh(g_base_foot, greyMaterial);
  base_foot1.position.set(0, 0.1, 0.1);
  foot.add(base_foot1);

  var g_base_foot2 = new Three.CylinderGeometry(0.055, 0.055, 0.35, 8, 8);
  var base_foot2 = new Three.Mesh(g_base_foot2, greyMaterial);
  base_foot2.position.set(0, 0.25, 0.15);
  foot.add(base_foot2);

  armchair.add(foot);

  //seat
  var seat = new Three.Mesh();

  var extrusionSettings = {
    depth: 0.65,
    bevelEnabled: false,
    bevelSegments: 2,
    steps: 10,
    bevelSize: 1,
    bevelThickness: 1
  };

  var shape_sed = new Three.Shape();
  shape_sed.moveTo(0, 0);
  shape_sed.lineTo(0, 0.05);
  shape_sed.quadraticCurveTo(0, 0.1, -0.02, 0.1);
  shape_sed.lineTo(-0.6, 0.1);
  shape_sed.quadraticCurveTo(-0.6, 0.1, -0.6, 0.07);
  shape_sed.lineTo(-0.6, 0);

  var g_sitting = new Three.ExtrudeGeometry(shape_sed, extrusionSettings);
  var sitting = new Three.Mesh(g_sitting, greenMaterial);

  sitting.rotation.y = Math.PI / 2;
  sitting.rotation.z = Math.PI / 3.5;
  sitting.position.set(-0.325, .905, -0.3);
  seat.add(sitting);

  //back armchair
  var shape_sc = new Three.Shape();
  shape_sc.moveTo(0, 0);
  shape_sc.lineTo(0, 0.1);
  shape_sc.quadraticCurveTo(-0.5, 0.07, -0.97, 0.1);
  shape_sc.quadraticCurveTo(-1, 0.1, -1, 0.07);
  shape_sc.lineTo(-1, 0);
  shape_sc.quadraticCurveTo(-0.5, -0.03, 0, 0);

  var g_back = new Three.ExtrudeGeometry(shape_sc, extrusionSettings);
  var back = new Three.Mesh(g_back, greenMaterial);

  back.rotation.z = -105 * Math.PI / 180;
  back.rotation.y = -Math.PI / 2;
  back.position.set(0.325, 0.52, 0.125);
  seat.add(back);

  var g_asse_rotaz2 = new Three.CylinderGeometry(0.06, 0.06, 0.8, 8, 8, true);
  var asse_rotaz2 = new Three.Mesh(g_asse_rotaz2, greyMaterial);

  asse_rotaz2.rotation.z = -Math.PI / 2;
  asse_rotaz2.position.set(0, 0.45, 0.15);
  seat.add(asse_rotaz2);

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var width = .7;
  var height = .75;
  var radius = 0.25;

  roundedRectShape.moveTo(x, y + radius);
  roundedRectShape.lineTo(x, y + height - radius);
  roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
  roundedRectShape.lineTo(x + width - radius, y + height);
  roundedRectShape.lineTo(x + width, y + radius);
  roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
  roundedRectShape.lineTo(x + radius, y);
  roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

  var extrudeSettings = {
    steps: 2,
    depth: .07,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  var geometry2 = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
  var armrest_1 = new Three.Mesh(geometry2, greyMaterial);
  armrest_1.rotation.y = Math.PI / 2;
  armrest_1.rotation.z = .9 * Math.PI;
  armrest_1.position.set(-0.4, 1, -0.4);
  seat.add(armrest_1);

  var armrest_2 = armrest_1.clone();
  armrest_2.position.x += .73;
  seat.add(armrest_2);
  armchair.add(seat);

  return armchair;
}

exports.default = {
  name: 'armchairs',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'wood'],
    title: 'armchairs',
    description: 'armchairs',
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
    seat: {
      label: 'seats',
      type: 'number',
      defaultValue: 1
    },
    flip: {
      label: 'flip',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes': true
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var rect_style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };
    var text_style = { textAnchor: 'middle', fontSize: '11px', fill: '#FF0000' };

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    var seats = element.properties.get('seat');
    var flip = element.properties.get('flip');

    var seatsArray = new Array(seats);

    var eps = -1.7;

    for (var ind = 0; ind < seats; ind++) {
      seatsArray[ind] = _react2.default.createElement('rect', { key: ind, x: WIDTH * ind, y: eps * ind,
        width: WIDTH, height: DEPTH, style: rect_style });
    }return _react2.default.createElement(
      'g',
      { transform: 'translate(' + (flip ? -1 : 1) * WIDTH * seats / 2 + ',' + -DEPTH / 2 + ') scale(' + (flip ? 1 : -1) + ',1)' },
      seatsArray,
      _react2.default.createElement(
        'text',
        { x: '0', y: '0',
          transform: 'translate(' + WIDTH * seats / 2 + ', ' + (DEPTH / 2 + eps * seats / 2) + ') scale(' + (flip ? 1 : -1) + ',-1) rotate(' + textRotation + ')',
          style: text_style },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');
    var seats = element.properties.get('seat');
    var flip = element.properties.get('flip');
    var newWidth = WIDTH;
    var newDepth = DEPTH;

    var armchairsMaxLOD = new Three.Object3D();
    var seatArray = new Array(seats);

    function setArmchairsPos(listObject, seats) {

      newWidth = WIDTH * seats;
      newDepth = DEPTH + DEPTH / 8 * seats / 2;
      seatArray = listObject;

      for (var ind = 0; ind < seats; ind++) {

        seatArray[ind].position.x = (ind - Math.floor(seats / 2)) * -.8;

        if (flip) seatArray[ind].position.z = (ind - Math.floor(seats / 2)) * -.085;else seatArray[ind].position.z = (ind - Math.floor(seats / 2)) * +.085;
      }
    }

    function makeSeriesArmchair2(seats) {

      var chair = makeArmchairMaxLOD().clone();
      for (var ind = 0; ind < seats; ind++) {
        seatArray[ind] = chair.clone();
      }return seatArray;
    }

    var armchairsObject2 = makeSeriesArmchair2(seats);
    setArmchairsPos(armchairsObject2, seats);

    for (var i = 0; i < armchairsObject2.length; i++) {
      armchairsMaxLOD.add(armchairsObject2[i]);
    }var valueObject = new Three.Box3().setFromObject(armchairsMaxLOD);

    var deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
    var deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
    var deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);

    armchairsMaxLOD.position.y += -HEIGHT / 20 + newAltitude;
    seats % 2 ? armchairsMaxLOD.position.x += newWidth / seats - WIDTH : armchairsMaxLOD.position.x += newWidth / seats - 1.5 * WIDTH;
    armchairsMaxLOD.position.z -= DEPTH / 8;
    armchairsMaxLOD.scale.set(newWidth / deltaX, HEIGHT / deltaY, newDepth / deltaZ);

    /********************** lod min ************************************/

    var armchairsMinLOD = new Three.Object3D();

    function makeSeriesArmchair1(seats) {

      var chair = makeArmchairMinLOD().clone();

      for (var ind = 0; ind < seats; ind++) {
        seatArray[ind] = chair.clone();
      }return seatArray;
    }

    var armchairsObject1 = makeSeriesArmchair1(seats);
    setArmchairsPos(armchairsObject1, seats);

    for (var j = 0; j < armchairsObject1.length; j++) {
      armchairsMinLOD.add(armchairsObject1[j]);
    }armchairsMinLOD.position.y += -HEIGHT / 20 + newAltitude;
    seats % 2 ? armchairsMinLOD.position.x += newWidth / seats - WIDTH : armchairsMinLOD.position.x += newWidth / seats - 1.5 * WIDTH;
    armchairsMinLOD.position.z -= DEPTH / 8;
    armchairsMinLOD.scale.set(newWidth / deltaX, HEIGHT / deltaY, newDepth / deltaZ);

    /********* all level of detail ************/

    var lod = new Three.LOD();

    lod.addLevel(armchairsMaxLOD, 200);
    lod.addLevel(armchairsMinLOD, 700);
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