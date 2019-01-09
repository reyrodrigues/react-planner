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

var WIDTH = 120;
var DEPTH = 50;
var HEIGHT = 90;

var brown = new Three.MeshLambertMaterial({ color: 0x9b8c75 });
var grey = new Three.MeshLambertMaterial({ color: 0xd9d7d7 });
var green = new Three.MeshBasicMaterial({ color: 0x669966 });

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var deskdouble = new Three.Mesh();

  var newDepth = .5;
  var newWidth = .9;
  var newHeight = 1;
  var radius = .03;

  var geometry = new Three.BoxGeometry(newWidth + newWidth / 6, newHeight / 20, newDepth + newDepth / 4);

  var boxMaterials = [brown, brown, green, brown, brown, brown];

  var plane = new Three.Mesh(geometry, boxMaterials);
  plane.position.y = newHeight;
  deskdouble.add(plane);

  var geometry_legs = new Three.CylinderGeometry(radius, radius, newHeight, 32, 32);

  var geometry2 = new Three.BoxGeometry(newWidth, newHeight / 20, newDepth);
  var plane2 = new Three.Mesh(geometry2, brown);
  plane2.position.y = newHeight / 2 + newHeight / 4;
  deskdouble.add(plane2);

  var geometry3 = new Three.BoxGeometry(newWidth, newHeight / 10, newDepth / 20);
  var plane3 = new Three.Mesh(geometry3, brown);
  plane3.position.y = newHeight / 2 + newHeight / 4 + newHeight / 16;
  plane3.position.z = newDepth / 3 + newDepth / 5;
  deskdouble.add(plane3);

  var leg1 = new Three.Mesh(geometry_legs, grey);
  leg1.position.x = newWidth / 2;
  leg1.position.z = newDepth / 2;
  leg1.position.y = newHeight / 2;
  deskdouble.add(leg1);

  var leg2 = new Three.Mesh(geometry_legs, grey);
  leg2.position.x = newWidth / 2;
  leg2.position.z = -newDepth / 2;
  leg2.position.y = newHeight / 2;
  deskdouble.add(leg2);

  var leg3 = new Three.Mesh(geometry_legs, grey);
  leg3.position.x = -newWidth / 2;
  leg3.position.z = newDepth / 2;
  leg3.position.y = newHeight / 2;
  deskdouble.add(leg3);

  var leg4 = new Three.Mesh(geometry_legs, grey);
  leg4.position.x = -newWidth / 2;
  leg4.position.z = -newDepth / 2;
  leg4.position.y = newHeight / 2;
  deskdouble.add(leg4);

  return deskdouble;
}

function makeObjectMinLOD() {

  var deskdouble = new Three.Mesh();

  var newDepth = .5;
  var newWidth = .9;
  var newHeight = 1;
  var radius = .03;

  var geometry = new Three.BoxGeometry(newWidth + newWidth / 6, newHeight / 20, newDepth + newDepth / 4);

  var boxMaterials = [brown, brown, green, brown, brown, brown];

  var plane = new Three.Mesh(geometry, boxMaterials);
  plane.position.y = newHeight;
  deskdouble.add(plane);

  var geometry_legs = new Three.CylinderGeometry(radius, radius, newHeight, 8, 8);

  var geometry2 = new Three.BoxGeometry(newWidth, newHeight / 20, newDepth);
  var plane2 = new Three.Mesh(geometry2, brown);
  plane2.position.y = newHeight / 2 + newHeight / 4;
  deskdouble.add(plane2);

  var geometry3 = new Three.BoxGeometry(newWidth, newHeight / 10, newDepth / 20);
  var plane3 = new Three.Mesh(geometry3, brown);
  plane3.position.y = newHeight / 2 + newHeight / 4 + newHeight / 16;
  plane3.position.z = newDepth / 3 + newDepth / 5;
  deskdouble.add(plane3);

  var leg1 = new Three.Mesh(geometry_legs, grey);
  leg1.position.x = newWidth / 2;
  leg1.position.z = newDepth / 2;
  leg1.position.y = newHeight / 2;
  deskdouble.add(leg1);

  var leg2 = new Three.Mesh(geometry_legs, grey);
  leg2.position.x = newWidth / 2;
  leg2.position.z = -newDepth / 2;
  leg2.position.y = newHeight / 2;
  deskdouble.add(leg2);

  var leg3 = new Three.Mesh(geometry_legs, grey);
  leg3.position.x = -newWidth / 2;
  leg3.position.z = newDepth / 2;
  leg3.position.y = newHeight / 2;
  deskdouble.add(leg3);

  var leg4 = new Three.Mesh(geometry_legs, grey);
  leg4.position.x = -newWidth / 2;
  leg4.position.z = -newDepth / 2;
  leg4.position.y = newHeight / 2;
  deskdouble.add(leg4);

  return deskdouble;
}

exports.default = {
  name: 'double school desk',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'wood'],
    title: 'double school desk',
    description: 'double school desk',
    image: require('./deskdouble.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
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

    var deskdoubleMaxLOD = new Three.Object3D();
    deskdoubleMaxLOD.add(objectMaxLOD.clone());

    var valueObject = new Three.Box3().setFromObject(deskdoubleMaxLOD);

    var deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
    var deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
    var deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);

    deskdoubleMaxLOD.rotation.y += Math.PI;
    deskdoubleMaxLOD.position.y += newAltitude;
    deskdoubleMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /*************** lod min *******************/

    var deskdoubleMinLOD = new Three.Object3D();
    deskdoubleMinLOD.add(objectMinLOD.clone());
    deskdoubleMinLOD.rotation.y += Math.PI;
    deskdoubleMinLOD.position.y += newAltitude;
    deskdoubleMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(deskdoubleMaxLOD, 200);
    lod.addLevel(deskdoubleMinLOD, 900);
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