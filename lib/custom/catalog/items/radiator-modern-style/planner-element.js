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

var DEPTH = 10;

var grey = new Three.MeshLambertMaterial({ color: 0xeae6ca });

function makeObjectMaxLOD(newWidth, newHeight, newDepth) {

  var ModernRadiator = new Three.Mesh();

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var width = 9.5;
  var height = newHeight - 25;
  var radius = 2.5;

  roundedRectShape.moveTo(x, y + radius);
  roundedRectShape.lineTo(x, y + height - radius);
  roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
  roundedRectShape.lineTo(x + width - radius, y + height);
  roundedRectShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  roundedRectShape.lineTo(x + width, y + radius);
  roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
  roundedRectShape.lineTo(x + radius, y);
  roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

  var extrudeSettings = {
    steps: 1,
    depth: 2.5,
    bevelEnabled: false,
    bevelThickness: .4,
    bevelSize: .4,
    bevelSegments: 1
  };

  for (var i = 5; i <= newWidth - 7.5; i += 10) {
    var geometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
    var mesh = new Three.Mesh(geometry, grey);
    mesh.position.set(i, 0, 2.5);
    ModernRadiator.add(mesh);

    var mesh2 = new Three.Mesh(geometry, grey);
    mesh2.position.set(i, 5, 0);
    mesh2.scale.set(1, 1, 1);
    ModernRadiator.add(mesh2);

    var mesh3 = new Three.Mesh(geometry, grey);
    mesh3.position.set(i, 5, -2.5);
    mesh3.scale.set(1, 1.05, 1);
    ModernRadiator.add(mesh3);

    var mesh4 = new Three.Mesh(geometry, grey);
    mesh4.position.set(i, 6, -4);
    mesh4.scale.set(1, 1.2, 1);
    ModernRadiator.add(mesh4);

    var mesh5 = new Three.Mesh(geometry, grey);
    mesh5.position.set(i + 6, newHeight - 25, -2.5);
    mesh5.rotation.y -= Math.PI / 2;
    mesh5.scale.set(.8, .18, .8);
    ModernRadiator.add(mesh5);

    var mesh6 = new Three.Mesh(geometry, grey);
    mesh6.position.set(i, newHeight - 5, 5.5);
    mesh6.rotation.x -= Math.PI / 2;
    mesh6.scale.set(1, .13, .8);
    ModernRadiator.add(mesh6);

    var mesh7 = new Three.Mesh(geometry, grey);
    mesh7.position.set(i, newHeight - 17.5, -2);
    mesh7.rotation.x += Math.PI / 4;
    mesh7.scale.set(1, .14, .4);
    ModernRadiator.add(mesh7);

    var mesh8 = new Three.Mesh(geometry, grey);
    mesh8.position.set(i, newHeight - 11, 5);
    mesh8.scale.set(1, .1, .4);
    ModernRadiator.add(mesh8);
  }

  for (var _i = 5; _i <= newHeight; _i += newHeight - 12.5) {

    var geometry1 = new Three.CylinderGeometry(newDepth / 6, newDepth / 6, newWidth, 32);
    var tube = new Three.Mesh(geometry1, grey);
    tube.rotation.x += Math.PI / 2;
    tube.rotation.z += Math.PI / 2;
    tube.position.set(newWidth / 2, _i, newDepth / 6);
    ModernRadiator.add(tube);

    var geometry2 = new Three.CylinderGeometry(newDepth / 4, newDepth / 4, newWidth - 2.5, 6);
    var tube2 = new Three.Mesh(geometry2, grey);
    tube2.rotation.x += Math.PI / 2;
    tube2.rotation.z += Math.PI / 2;
    tube2.position.set(newWidth / 2, _i, newDepth / 6);
    ModernRadiator.add(tube2);

    var geometry3 = new Three.CylinderGeometry(newDepth / 3.5, newDepth / 3.5, newWidth - 5, 32);
    var tube3 = new Three.Mesh(geometry3, grey);
    tube3.rotation.x += Math.PI / 2;
    tube3.rotation.z += Math.PI / 2;
    tube3.position.set(newWidth / 2, _i, newDepth / 6);
    ModernRadiator.add(tube3);
  }

  return ModernRadiator;
}

function makeObjectMinLOD(newWidth, newHeight, newDepth) {

  var ModernRadiator = new Three.Mesh();

  var roundedRectShape = new Three.Shape();

  var x = 0;
  var y = 0;
  var width = 9.5;
  var height = newHeight - 25;
  var radius = 0.25;

  roundedRectShape.moveTo(x, y + radius);
  roundedRectShape.lineTo(x, y + height - radius);
  roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
  roundedRectShape.lineTo(x + width - radius, y + height);
  roundedRectShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  roundedRectShape.lineTo(x + width, y + radius);
  roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
  roundedRectShape.lineTo(x + radius, y);
  roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

  var extrudeSettings = {
    steps: 1,
    depth: 2.5,
    bevelEnabled: false,
    bevelThickness: .4,
    bevelSize: .4,
    bevelSegments: 1
  };

  for (var i = 5; i <= newWidth - 7.5; i += 10) {

    var geometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
    var mesh = new Three.Mesh(geometry, grey);
    mesh.position.set(i, 0, 2.5);
    ModernRadiator.add(mesh);

    var mesh3 = new Three.Mesh(geometry, grey);
    mesh3.position.set(i, 5, -2.5);
    mesh3.scale.set(1, 1.05, 1);
    ModernRadiator.add(mesh3);

    var mesh4 = new Three.Mesh(geometry, grey);
    mesh4.position.set(i, 6, -4);
    mesh4.scale.set(1, 1.2, 1);
    ModernRadiator.add(mesh4);

    var mesh6 = new Three.Mesh(geometry, grey);
    mesh6.position.set(i, newHeight - 5, 5.5);
    mesh6.rotation.x -= Math.PI / 2;
    mesh6.scale.set(1, .13, .8);
    ModernRadiator.add(mesh6);

    var mesh7 = new Three.Mesh(geometry, grey);
    mesh7.position.set(i, newHeight - 17.5, -2);
    mesh7.rotation.x += Math.PI / 4;
    mesh7.scale.set(1, .14, .4);
    ModernRadiator.add(mesh7);

    var mesh8 = new Three.Mesh(geometry, grey);
    mesh8.position.set(i, newHeight - 11, 5);
    mesh8.scale.set(1, .1, .4);
    ModernRadiator.add(mesh8);
  }

  for (var _i2 = newDepth / 6; _i2 <= newHeight; _i2 += newHeight - 10) {

    var geometry1 = new Three.CylinderGeometry(newDepth / 6, newDepth / 6, newWidth, 8);
    var tube = new Three.Mesh(geometry1, grey);
    tube.rotation.x += Math.PI / 2;
    tube.rotation.z += Math.PI / 2;
    tube.position.set(newWidth / 2, _i2, newDepth / 6);
    ModernRadiator.add(tube);
  }

  return ModernRadiator;
}

exports.default = {
  name: "termosifone_alluminio",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "aluminum radiator",
    description: "aluminum radiator",
    image: require('./ModernStyleRadiator.png')
  },

  properties: {
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 20,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var WIDTH = element.properties.get('width').get('length');
    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    var rect_style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" };

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH, style: rect_style }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0', transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newWidth = element.properties.get('width').get('length');
    var newDepth = DEPTH;
    var newHeight = element.properties.get('height').get('length');
    var newAltitude = element.properties.get('altitude').get('length');

    /************ lod max **************/

    var ModernRadiatorMaxLOD = new Three.Object3D();
    ModernRadiatorMaxLOD.add(makeObjectMaxLOD(newWidth, newHeight, newDepth).clone());

    var value = new Three.Box3().setFromObject(ModernRadiatorMaxLOD);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    ModernRadiatorMaxLOD.position.x -= newWidth / 2;
    ModernRadiatorMaxLOD.position.y += 5 + newAltitude;
    ModernRadiatorMaxLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    // let bigger = new Three.Object3D();
    //
    // bigger.add(ModernRadiator);
    //
    // let pivot = new Three.Mesh(new Three.SphereGeometry(10), new Three.MeshBasicMaterial({color:0xff0000}));
    // bigger.add(pivot);

    /************ lod min **************/

    var ModernRadiatorMinLOD = new Three.Object3D();
    ModernRadiatorMinLOD.add(makeObjectMinLOD(newWidth, newHeight, newDepth).clone());
    ModernRadiatorMinLOD.position.x -= newWidth / 2;
    ModernRadiatorMinLOD.position.y += 5 + newAltitude;
    ModernRadiatorMinLOD.scale.set(newWidth / deltaX, newHeight / deltaY, newDepth / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(ModernRadiatorMaxLOD, 200);
    lod.addLevel(ModernRadiatorMinLOD, 900);
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