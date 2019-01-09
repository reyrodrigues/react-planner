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

var WIDTH = 150;
var DEPTH = 50;
var HEIGHT = 50;
var RADIUS = 10;

var grey = new Three.MeshLambertMaterial({ color: 0xC0C0C0 });
var black = new Three.MeshLambertMaterial({ color: 0x00000 });
var textureLoader = new Three.TextureLoader();
var woodTexture = textureLoader.load(require('./wood.jpg'));

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var bench = new Three.Mesh();

  // axis
  var axis1 = new Three.Mesh(new Three.BoxGeometry(10, 0.5, 0.5), grey);
  axis1.position.set(0, 0, 0);
  bench.add(axis1);

  var axi2 = new Three.Mesh(new Three.BoxGeometry(10, 0.5, 0.5), grey);
  axi2.position.set(0, 0, 3);
  bench.add(axi2);

  //beams
  for (var lx = -5; lx <= 5; lx += 5) {
    var beam = new Three.Mesh(new Three.BoxGeometry(0.5, 0.5, 3.5), grey);
    beam.position.set(lx, 0, 1.5);
    bench.add(beam);
  }

  //legs
  for (var gx = -5; gx <= 5; gx += 5) {
    for (var gz = 0; gz <= 3; gz += 3) {
      var leg = new Three.Mesh(new Three.BoxGeometry(3, 0.5, 0.5), grey);
      leg.rotation.z = 0.5 * Math.PI;
      leg.position.set(gx, -1.5, gz);
      bench.add(leg);

      // foot
      var foot = new Three.Mesh(new Three.BoxGeometry(0.5, 0.25, 0.5), black);
      foot.rotation.z = 0.5 * Math.PI;
      foot.position.x = -1.625;
      leg.add(foot);
    }
  }

  // wood axis
  for (var z = 0; z <= 3; z += 0.75) {
    var woodAxis = new Three.Mesh(new Three.BoxGeometry(12, 0.25, 0.5), new Three.MeshPhongMaterial({ map: woodTexture }));
    woodAxis.position.set(0, 0.5, z);
    bench.add(woodAxis);
  }

  //nuts
  for (var _z = 0; _z <= 3; _z += 0.75) {
    for (var dy = -5; dy <= 5; dy += 5) {
      var nut = new Three.Mesh(new Three.CylinderGeometry(0.1, 0.1, 0.8, 6), black);
      nut.position.set(dy, 0.3, _z);
      bench.add(nut);
    }
  }

  return bench;
}

function makeObjectMinLOD() {

  var bench = new Three.Mesh();
  // axis
  var axis1 = new Three.Mesh(new Three.BoxGeometry(10, 0.5, 0.5), grey);
  axis1.position.set(0, 0, 0);
  bench.add(axis1);

  var axi2 = new Three.Mesh(new Three.BoxGeometry(10, 0.5, 0.5), grey);
  axi2.position.set(0, 0, 3);
  bench.add(axi2);

  //beams
  for (var lx = -5; lx <= 5; lx += 5) {
    var beam = new Three.Mesh(new Three.BoxGeometry(0.5, 0.5, 3.5), grey);
    beam.position.set(lx, 0, 1.5);
    bench.add(beam);
  }

  //legs
  for (var gx = -5; gx <= 5; gx += 5) {
    for (var gz = 0; gz <= 3; gz += 3) {
      var leg = new Three.Mesh(new Three.BoxGeometry(3, 0.5, 0.5), grey);
      leg.rotation.z = 0.5 * Math.PI;
      leg.position.set(gx, -1.5, gz);
      bench.add(leg);
    }
  }

  // wood axis
  for (var z = 0; z <= 3; z += 0.75) {
    var woodAxis = new Three.Mesh(new Three.BoxGeometry(12, 0.25, 0.5), new Three.MeshPhongMaterial({ map: woodTexture }));
    woodAxis.position.set(0, 0.5, z);
    bench.add(woodAxis);
  }

  return bench;
}

exports.default = {
  name: 'bench',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'wood', 'metal'],
    title: 'bench',
    description: 'bench',
    image: require('./bench.png')
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
    var textRotation = Math.sin(angle * Math.PI / 180) < 0 ? 180 : 0;
    var rect_style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH, style: rect_style }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0', transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: 'middle', fontSize: '11px' } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.getIn(['altitude', 'length']);

    /************ lod max *****************/
    var benchMaxLOD = new Three.Object3D();
    benchMaxLOD.add(objectMaxLOD.clone());

    var value = new Three.Box3().setFromObject(benchMaxLOD);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    benchMaxLOD.position.y += HEIGHT + newAltitude;
    benchMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /************ lod min *****************/

    var benchMinLOD = new Three.Object3D();
    benchMinLOD.add(objectMinLOD.clone());
    benchMinLOD.position.y += HEIGHT + newAltitude;
    benchMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(benchMaxLOD, 200);
    lod.addLevel(benchMinLOD, 900);
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