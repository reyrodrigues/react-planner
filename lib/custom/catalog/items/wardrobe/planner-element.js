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
var HEIGHT = 220;

var blue = new Three.MeshLambertMaterial({ color: 0x0000CC });
var grey = new Three.MeshLambertMaterial({ color: 0xC0C0C0 });
var black = new Three.MeshLambertMaterial({ color: 0x000000 });

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var wardrobe = new Three.Mesh();

  //base
  var bottomSide = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1), grey);
  wardrobe.add(bottomSide);

  //side
  var side1 = new Three.Mesh(new Three.BoxGeometry(1, 2, 0.05), grey);
  side1.position.set(0, 1.025, 0.475);
  wardrobe.add(side1);

  var side2 = new Three.Mesh(new Three.BoxGeometry(1, 2, 0.05), grey);
  side2.position.set(0, 1.025, -0.475);
  wardrobe.add(side2);

  //backside
  var backside = new Three.Mesh(new Three.BoxGeometry(0.05, 2, 1), grey);
  backside.position.set(0.475, 1.025, 0);
  wardrobe.add(backside);

  // top
  var topside = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1), grey);
  topside.position.set(0, 2.05, 0);
  wardrobe.add(topside);

  //central axis
  var centralAxis = new Three.Mesh(new Three.BoxGeometry(0.9, 0.4, 0.05), grey);
  centralAxis.position.set(0, 1.025, 0);
  wardrobe.add(centralAxis);

  //lower shelve
  var lowShelve = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.5), grey);
  lowShelve.position.set(0, 0.8, 0.225);
  wardrobe.add(lowShelve);

  //upper shelve
  var upShelve = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.5), grey);
  upShelve.position.set(0, 1.25, -0.225);
  wardrobe.add(upShelve);

  //up door
  var upDoor_p1 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.77, 0.9), blue);
  upDoor_p1.position.set(-0.475, 1.64, 0);
  wardrobe.add(upDoor_p1);

  var upDoor_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.44, 0.435), blue);
  upDoor_p2.position.set(-0.475, 1.035, 0.23);
  wardrobe.add(upDoor_p2);

  //low door
  var lowDoor_p1 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.77, 0.9), blue);
  lowDoor_p1.position.set(-0.475, 0.41, 0);
  wardrobe.add(lowDoor_p1);

  var lowDoor_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.44, 0.435), blue);
  lowDoor_p2.position.set(-0.475, 1.015, -0.23);
  wardrobe.add(lowDoor_p2);

  var fz = void 0;

  for (var fy = 1.64; fy >= 0.4; fy -= 1.14) {
    fy === 1.64 ? fz = -0.35 : fz = 0.35;

    //lock
    var lock_p1 = new Three.Mesh(new Three.CylinderGeometry(0.025, 0.03, 0.02, 32, 32), black);
    lock_p1.rotation.x = 0.5 * Math.PI;
    lock_p1.rotation.z = 0.5 * Math.PI;
    lock_p1.position.set(-0.5, fy, fz);
    wardrobe.add(lock_p1);

    var lock_p2 = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.022, 0.015, 32, 32), grey);
    lock_p2.rotation.x = 0.5 * Math.PI;
    lock_p2.rotation.z = 0.5 * Math.PI;
    lock_p2.position.set(-0.515, fy, fz);
    wardrobe.add(lock_p2);

    var lock_p3 = new Three.Mesh(new Three.BoxGeometry(0.01, 0.015, 0.005, 32, 32), black);
    lock_p3.position.set(-0.518, fy, fz);
    wardrobe.add(lock_p3);
  }

  for (var fx = -0.47; fx <= 0.47; fx += 0.94) {
    for (var _fz = 0.47; _fz >= -0.47; _fz -= 0.94) {
      //foot
      var foot = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.04, 0.1, 4), grey);
      foot.position.set(fx, -0.05, _fz);
      foot.rotation.y = 0.25 * Math.PI;
      foot.rotation.z = Math.PI;
      wardrobe.add(foot);
    }
  }

  return wardrobe;
}

function makeObjectMinLOD() {

  var wardrobe = new Three.Mesh();

  //base
  var bottomSide = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1), grey);
  wardrobe.add(bottomSide);

  //side
  var side1 = new Three.Mesh(new Three.BoxGeometry(1, 2, 0.05), grey);
  side1.position.set(0, 1.025, 0.475);
  wardrobe.add(side1);

  var side2 = new Three.Mesh(new Three.BoxGeometry(1, 2, 0.05), grey);
  side2.position.set(0, 1.025, -0.475);
  wardrobe.add(side2);

  //backside
  var backside = new Three.Mesh(new Three.BoxGeometry(0.05, 2, 1), grey);
  backside.position.set(0.475, 1.025, 0);
  wardrobe.add(backside);

  // top
  var topside = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1), grey);
  topside.position.set(0, 2.05, 0);
  wardrobe.add(topside);

  //central axis
  var centralAxis = new Three.Mesh(new Three.BoxGeometry(0.9, 0.4, 0.05), grey);
  centralAxis.position.set(0, 1.025, 0);
  wardrobe.add(centralAxis);

  //lower shelve
  var lowShelve = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.5), grey);
  lowShelve.position.set(0, 0.8, 0.225);
  wardrobe.add(lowShelve);

  //upper shelve
  var upShelve = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.5), grey);
  upShelve.position.set(0, 1.25, -0.225);
  wardrobe.add(upShelve);

  //up door
  var upDoor_p1 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.77, 0.9), blue);
  upDoor_p1.position.set(-0.475, 1.64, 0);
  wardrobe.add(upDoor_p1);

  var upDoor_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.44, 0.435), blue);
  upDoor_p2.position.set(-0.475, 1.035, 0.23);
  wardrobe.add(upDoor_p2);

  //low door
  var lowDoor_p1 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.77, 0.9), blue);
  lowDoor_p1.position.set(-0.475, 0.41, 0);
  wardrobe.add(lowDoor_p1);

  var lowDoor_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.44, 0.435), blue);
  lowDoor_p2.position.set(-0.475, 1.015, -0.23);
  wardrobe.add(lowDoor_p2);

  for (var fx = -0.47; fx <= 0.47; fx += 0.94) {
    for (var fz = 0.47; fz >= -0.47; fz -= 0.94) {
      //foot
      var foot = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.04, 0.1, 4), grey);
      foot.position.set(fx, -0.05, fz);
      foot.rotation.y = 0.25 * Math.PI;
      foot.rotation.z = Math.PI;
      wardrobe.add(foot);
    }
  }

  return wardrobe;
}

exports.default = {
  name: "wardrobe",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "wardrobe",
    description: "wardrobe",
    image: null
  },
  properties: {
    altitude: {
      label: "altitudine",
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

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" } }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /*************** lod max *******************/

    var wardrobeMaxLOD = new Three.Object3D();
    wardrobeMaxLOD.add(objectMaxLOD.clone());

    var value = new Three.Box3().setFromObject(wardrobeMaxLOD);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    wardrobeMaxLOD.position.z += -DEPTH / 6;
    wardrobeMaxLOD.position.y += HEIGHT / 24 + newAltitude;
    wardrobeMaxLOD.rotation.y += -Math.PI / 2;
    wardrobeMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /************** lod min ********************/

    var wardrobeMinLOD = new Three.Object3D();
    wardrobeMinLOD.add(objectMinLOD.clone());
    wardrobeMinLOD.position.z += -DEPTH / 6;
    wardrobeMinLOD.position.y += HEIGHT / 24 + newAltitude;
    wardrobeMinLOD.rotation.y += -Math.PI / 2;
    wardrobeMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(wardrobeMaxLOD, 200);
    lod.addLevel(wardrobeMinLOD, 900);
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