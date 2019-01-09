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

var WIDTH = 10;
var DEPTH = 10;
var HEIGHT = 5;

var red = new Three.MeshLambertMaterial({ color: 0xff0000 });
var grey = new Three.MeshLambertMaterial({ color: 0xd9d7d7 });
var black = new Three.MeshLambertMaterial({ color: 0x000000 });

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var detector = new Three.Mesh();

  var BaseGeometry1 = new Three.CylinderGeometry(.55, .55, .25, 32, 32);
  var base_p1 = new Three.Mesh(BaseGeometry1, grey);
  detector.add(base_p1);

  var BaseGeometry2 = new Three.CylinderGeometry(.65, .65, .1, 32, 32);
  var base_p2 = new Three.Mesh(BaseGeometry2, grey);
  base_p2.position.y += .125;
  base_p1.add(base_p2);

  var BaseGeometry3 = new Three.CylinderGeometry(.55, .65, .1, 32, 32);
  var base_p3 = new Three.Mesh(BaseGeometry3, grey);
  base_p3.position.y += .22;
  base_p1.add(base_p3);

  var BaseGeometry4 = new Three.CylinderGeometry(.65, .65, .1, 32, 32);
  var base_p4 = new Three.Mesh(BaseGeometry4, grey);
  base_p4.position.y += -.125;
  base_p1.add(base_p4);

  var geometrySphereUp = new Three.SphereGeometry(0.025, 32, 32, 32);
  var led = new Three.Mesh(geometrySphereUp, red);
  led.position.y += .28;
  led.position.x += .4;
  led.position.z += -.25;
  led.scale.set(1, 1.3, 1);
  base_p1.add(led);

  for (var i = 0; i < Math.PI * 4; i += 4 * Math.PI / 3) {

    var geometry = new Three.TorusGeometry(.45, .025, 32, 100, Math.PI / 3);
    var torus = new Three.Mesh(geometry, black);
    torus.position.y += .028;
    torus.position.x += .01;
    torus.rotation.z += i;
    torus.rotation.x += Math.PI / 2;
    base_p3.add(torus);

    var geometry2 = new Three.TorusGeometry(.35, .025, 32, 100, Math.PI / 3);
    var torus2 = new Three.Mesh(geometry2, black);
    torus2.position.y += .028;
    torus2.position.x += .01;
    torus2.rotation.x += Math.PI / 2;
    torus2.rotation.z += i;
    base_p3.add(torus2);

    var geometry3 = new Three.TorusGeometry(.25, .025, 32, 100, Math.PI / 3);
    var torus3 = new Three.Mesh(geometry3, black);
    torus3.position.y += .028;
    torus3.position.x += .01;
    torus3.rotation.x += Math.PI / 2;
    torus3.rotation.z += i;
    base_p3.add(torus3);
  }

  return detector;
}

function makeObjectMinLOD() {

  var detector = new Three.Mesh();

  var BaseGeometry1 = new Three.CylinderGeometry(.55, .55, .25, 8, 8);
  var base_p1 = new Three.Mesh(BaseGeometry1, grey);
  detector.add(base_p1);

  var BaseGeometry2 = new Three.CylinderGeometry(.65, .65, .1, 8, 8);
  var base_p2 = new Three.Mesh(BaseGeometry2, grey);
  base_p2.position.y += .125;
  base_p1.add(base_p2);

  var BaseGeometry3 = new Three.CylinderGeometry(.55, .65, .1, 8, 8);
  var base_p3 = new Three.Mesh(BaseGeometry3, grey);
  base_p3.position.y += .22;
  base_p1.add(base_p3);

  var BaseGeometry4 = new Three.CylinderGeometry(.65, .65, .1, 8, 8);
  var base_p4 = new Three.Mesh(BaseGeometry4, grey);
  base_p4.position.y += -.125;
  base_p1.add(base_p4);

  return detector;
}

exports.default = {
  name: "smoke-detector",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "smoke detector",
    description: "smoke detector",
    image: null
  },
  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 250,
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
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#ff0000" } }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + WIDTH / 2 + ', ' + 1.5 * DEPTH + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /************* lod max ****************/

    var detectorMaxLOD = new Three.Object3D();
    detectorMaxLOD.add(objectMaxLOD.clone());

    var valuePosition = new Three.Box3().setFromObject(detectorMaxLOD);

    var deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    var deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    var deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    detectorMaxLOD.position.z += -DEPTH / 3;
    detectorMaxLOD.position.y += -HEIGHT / 1.3 + newAltitude;
    detectorMaxLOD.rotation.x += -Math.PI / 2;
    detectorMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /************* lod min ****************/

    var detectorMinLOD = new Three.Object3D();
    detectorMinLOD.add(objectMinLOD.clone());
    detectorMinLOD.position.z += -DEPTH / 3;
    detectorMinLOD.position.y += -HEIGHT / 1.3 + newAltitude;
    detectorMinLOD.rotation.x += -Math.PI / 2;
    detectorMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(detectorMaxLOD, 200);
    lod.addLevel(detectorMinLOD, 900);
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