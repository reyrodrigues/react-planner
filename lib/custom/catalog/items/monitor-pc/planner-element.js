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

var WIDTH = 50;
var DEPTH = 50;
var HEIGHT = 50;

var textureLoader = new Three.TextureLoader();
var power = textureLoader.load(null);
var black = textureLoader.load(null);
var white = textureLoader.load(null);
var keyboard = textureLoader.load(null);
var blackMaterial = new Three.MeshLambertMaterial({ map: black });

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var monitorPC = new Three.Mesh();

  var cubeGeometryBase = new Three.BoxGeometry(0.04, 0.42, 0.06);
  var whiteMaterial = new Three.MeshLambertMaterial({ map: white });
  var edge_p0 = new Three.Mesh(cubeGeometryBase, whiteMaterial);
  edge_p0.position.set(0, 0.79, 0);
  edge_p0.rotation.x = Math.PI / 2;
  monitorPC.add(edge_p0);

  var cubeGeometryBase2 = new Three.BoxGeometry(0.04, 0.42, 0.06);
  var edge_p1 = new Three.Mesh(cubeGeometryBase2, whiteMaterial);
  edge_p1.position.set(0, 0.43, 0);
  edge_p1.rotation.x = Math.PI / 2;
  monitorPC.add(edge_p1);

  var cubeGeometryBase3 = new Three.BoxGeometry(0.04, 0.42, 0.04);
  var edge_p3 = new Three.Mesh(cubeGeometryBase3, whiteMaterial);
  edge_p3.position.set(0, 0.61, 0.21);
  monitorPC.add(edge_p3);

  var cubeGeometryBase4 = new Three.BoxGeometry(0.04, 0.42, 0.04);
  var edge_p4 = new Three.Mesh(cubeGeometryBase4, whiteMaterial);
  edge_p4.position.set(0, 0.61, -0.21);
  monitorPC.add(edge_p4);

  var cubeGeometryBase5 = new Three.BoxGeometry(0.4, 0.40, 0.05);
  var back = new Three.Mesh(cubeGeometryBase5, blackMaterial);
  back.position.set(-0.02, 0.61, 0);
  back.rotation.y = Math.PI / 2;
  monitorPC.add(back);

  var powerGeometry = new Three.BoxGeometry(0.01, 0.02, 0.02);
  var powerMaterial = new Three.MeshLambertMaterial({ map: power });
  var powerButton = new Three.Mesh(powerGeometry, powerMaterial);
  powerButton.position.set(0.0155, 0.43, 0);
  monitorPC.add(powerButton);

  var cylinderGeometry1 = new Three.CylinderGeometry(0.02, 0.02, 0.06, 32, 32);
  var base_p1 = new Three.Mesh(cylinderGeometry1, blackMaterial);
  base_p1.position.set(0, 0.38, 0);
  monitorPC.add(base_p1);

  var geometry = new Three.CylinderGeometry(0.1, 0.1, 0.02, 32, 32);
  var material = new Three.MeshLambertMaterial({ map: black });
  var base_p2 = new Three.Mesh(geometry, material);
  base_p2.scale.set(0.8, 1, 1);
  base_p2.position.set(0, 0.36, 0);
  monitorPC.add(base_p2);

  //keyboard
  var cubeGeometryBase8 = new Three.BoxGeometry(0.4, 0.02, 0.2);

  var boxMaterials = [new Three.MeshBasicMaterial({ color: 0x000000 }), new Three.MeshBasicMaterial({ color: 0x000000 }), new Three.MeshLambertMaterial({ map: keyboard }), new Three.MeshBasicMaterial({ color: 0x000000 }), new Three.MeshBasicMaterial({ color: 0x000000 }), new Three.MeshBasicMaterial({ color: 0x000000 })];

  var keyboardMesh = new Three.Mesh(cubeGeometryBase8, boxMaterials);
  keyboardMesh.position.set(0.3, 0.36, 0);
  keyboardMesh.rotation.y = Math.PI / 2;
  monitorPC.add(keyboardMesh);

  return monitorPC;
}

function makeObjectMinLOD() {

  var monitorPC = new Three.Mesh();

  var cubeGeometryBase = new Three.BoxGeometry(0.04, 0.42, 0.06);
  var whiteMaterial = new Three.MeshLambertMaterial({ map: white });
  var edge_p0 = new Three.Mesh(cubeGeometryBase, whiteMaterial);
  edge_p0.position.set(0, 0.79, 0);
  edge_p0.rotation.x = Math.PI / 2;
  monitorPC.add(edge_p0);

  var cubeGeometryBase2 = new Three.BoxGeometry(0.04, 0.42, 0.06);
  var edge_p1 = new Three.Mesh(cubeGeometryBase2, whiteMaterial);
  edge_p1.position.set(0, 0.43, 0);
  edge_p1.rotation.x = Math.PI / 2;
  monitorPC.add(edge_p1);

  var cubeGeometryBase3 = new Three.BoxGeometry(0.04, 0.42, 0.04);
  var edge_p3 = new Three.Mesh(cubeGeometryBase3, whiteMaterial);
  edge_p3.position.set(0, 0.61, 0.21);
  monitorPC.add(edge_p3);

  var cubeGeometryBase4 = new Three.BoxGeometry(0.04, 0.42, 0.04);
  var edge_p4 = new Three.Mesh(cubeGeometryBase4, whiteMaterial);
  edge_p4.position.set(0, 0.61, -0.21);
  monitorPC.add(edge_p4);

  var cubeGeometryBase5 = new Three.BoxGeometry(0.4, 0.40, 0.05);
  var blackMaterial = new Three.MeshLambertMaterial({ map: black });
  var back = new Three.Mesh(cubeGeometryBase5, blackMaterial);
  back.position.set(-0.02, 0.61, 0);
  back.rotation.y = Math.PI / 2;
  monitorPC.add(back);

  var cylinderGeometry1 = new Three.CylinderGeometry(0.02, 0.02, 0.06, 8, 8);
  var base_p1 = new Three.Mesh(cylinderGeometry1, blackMaterial);
  base_p1.position.set(0, 0.38, 0);
  monitorPC.add(base_p1);

  var geometry = new Three.CylinderGeometry(0.1, 0.1, 0.02, 8, 8);
  var base_p2 = new Three.Mesh(geometry, blackMaterial);
  base_p2.scale.set(0.8, 1, 1);
  base_p2.position.set(0, 0.36, 0);
  monitorPC.add(base_p2);

  //keyboard
  var cubeGeometryBase8 = new Three.BoxGeometry(0.4, 0.02, 0.2);
  var keyboardMesh = new Three.Mesh(cubeGeometryBase8, blackMaterial);
  keyboardMesh.position.set(0.3, 0.36, 0);
  keyboardMesh.rotation.y = Math.PI / 2;
  monitorPC.add(keyboardMesh);

  return monitorPC;
}

exports.default = {
  name: "monitor_pc",
  prototype: "items",

  info: {
    tag: ['furnishings'],
    title: "pc monitor",
    description: "pc monitor",
    image: null
  },

  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 100,
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
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" } }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "10px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /**************** LOD max ***********************/

    var monitorPC_MaxLOD = new Three.Object3D();
    monitorPC_MaxLOD.add(objectMaxLOD.clone());

    var aa = new Three.Box3().setFromObject(monitorPC_MaxLOD);

    var deltaX = Math.abs(aa.max.x - aa.min.x);
    var deltaY = Math.abs(aa.max.y - aa.min.y);
    var deltaZ = Math.abs(aa.max.z - aa.min.z);

    monitorPC_MaxLOD.rotation.y += -Math.PI / 2;
    monitorPC_MaxLOD.position.y += -HEIGHT * .75 + newAltitude;
    monitorPC_MaxLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX);

    /**************** LOD min ***********************/

    var monitorPC_MinLOD = new Three.Object3D();

    monitorPC_MinLOD.add(objectMinLOD.clone());

    monitorPC_MinLOD.rotation.y += -Math.PI / 2;
    monitorPC_MinLOD.position.y += -HEIGHT * .75 + newAltitude;
    monitorPC_MinLOD.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, DEPTH / deltaX);

    /*** add all Level of Detail ***/

    var lod = new Three.LOD();

    lod.addLevel(monitorPC_MaxLOD, 300);
    lod.addLevel(monitorPC_MinLOD, 700);
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