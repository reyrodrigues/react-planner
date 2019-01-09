'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _loadObj = require('../../utils/load-obj');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cached3DWindow = null;

var STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '3px', fill: '#000' };
var STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '3px', fill: '#0096fd', cursor: 'move' };
var EPSILON = 3;

exports.default = {
  name: 'window-curtain',
  prototype: 'holes',

  info: {
    tag: ['Finestre'],
    title: 'Curtain window',
    description: 'Curtain window',
    image: require('./window-curtain.jpg')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 90
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 100
      }
    },
    altitude: {
      label: 'altitudine',
      type: 'length-measure',
      defaultValue: {
        length: 90
      }
    },
    thickness: {
      label: 'spessore',
      type: 'length-measure',
      defaultValue: {
        length: 10
      }
    },
    flip: {
      label: 'flip',
      type: 'checkbox',
      defaultValue: 'none',
      values: {
        'none': 'none',
        'yes': 'yes'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {
    var holeWidth = element.properties.get('width').get('length');
    var holePath = 'M' + 0 + ' ' + -EPSILON + '  L' + holeWidth + ' ' + -EPSILON + '  L' + holeWidth + ' ' + EPSILON + '  L' + 0 + ' ' + EPSILON + '  z';
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    var length = element.properties.get('width').get('length');
    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -length / 2 + ', 0)' },
      _react2.default.createElement('path', { key: '1', d: holePath, style: holeStyle }),
      _react2.default.createElement('line', { key: '2', x1: holeWidth / 2, y1: -10 - EPSILON, x2: holeWidth / 2, y2: 10 + EPSILON, style: holeStyle })
    );
  },

  render3D: function render3D(element, layer, scene) {

    var width = element.properties.get('width').get('length');
    var height = element.properties.get('height').get('length');
    var thickness = element.properties.get('thickness').get('length');
    var flip = element.properties.get('flip');

    var onLoadItem = function onLoadItem(object) {

      var window = new Three.Object3D();

      var boundingBox = new Three.Box3().setFromObject(object);

      var initialWidth = boundingBox.max.x - boundingBox.min.x;
      var initialHeight = boundingBox.max.y - boundingBox.min.y;
      var initialThickness = boundingBox.max.z - boundingBox.min.z;

      if (element.selected) {
        var box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      var width = element.properties.get('width').get('length');
      var height = element.properties.get('height').get('length');
      var thickness = element.properties.get('thickness').get('length');

      object.scale.set(width / initialWidth, height / initialHeight, thickness / 2 / initialThickness);

      window.add(object);
      window.add(createTenda());

      if (flip === true) window.rotation.y += Math.PI;

      return window;
    };

    if (cached3DWindow) {
      return Promise.resolve(onLoadItem(cached3DWindow.clone()));
    }

    var mtl = require('./window.mtl');
    var obj = require('./window.obj');
    var img = require('./texture.png');

    return (0, _loadObj.loadObjWithMaterial)(mtl, obj, _path2.default.dirname(img) + '/').then(function (object) {
      cached3DWindow = object;
      return onLoadItem(cached3DWindow.clone());
    });

    function createTenda() {

      var radialWave = function radialWave(u, v) {
        var r = 10;
        var x = Math.sin(u) * 3 * r;
        var z = Math.sin(v / 2) * 2 * r;
        var y = (Math.sin(u * 2 * Math.PI) + Math.cos(v * 2 * Math.PI)) * .5;

        return new Three.Vector3(x, y, z);
      };

      //color
      var white = new Three.MeshLambertMaterial({ color: 0xeae6ca });

      var Tenda = new Three.Object3D();

      var mesh = createMesh(new Three.ParametricGeometry(radialWave, 20, 20));
      mesh.rotation.x += Math.PI / 2;
      mesh.rotation.y += Math.PI / 2;
      mesh.position.y += 3.1;
      mesh.position.x += .05;
      mesh.scale.set(.125, .125, .125);

      var mesh2 = mesh.clone();
      mesh2.rotation.x += Math.PI;
      mesh2.position.set(1.4, 0, 0.06);

      Tenda.add(mesh);
      Tenda.add(mesh2);

      for (var i = -.7; i > -3.4; i -= .45) {
        var geometry = new Three.TorusGeometry(.08, .016, 32, 32, 2 * Math.PI);
        var torus = new Three.Mesh(geometry, white);

        if (i == -1.15) torus.position.set(i, 3.14, .045);else if (i == -2.5) torus.position.set(i, 3.14, -.01);else torus.position.set(i, 3.14, .04);
        torus.rotation.y += Math.PI / 2;
        Tenda.add(torus);
      }

      var geometryAsta = new Three.CylinderGeometry(0.02, 0.02, 1.25, 32);
      var asta = new Three.Mesh(geometryAsta, white);
      asta.position.set(-1.1, 3.18, 0.02);
      asta.rotation.z += Math.PI / 2;
      Tenda.add(asta);

      var asta2 = asta.clone();
      asta2.position.set(-2.5, 3.18, 0.02);
      Tenda.add(asta2);

      var geometrySphereUp = new Three.SphereGeometry(0.04, 32, 32);
      var sphere = new Three.Mesh(geometrySphereUp, white);
      sphere.position.set(-.5, 3.18, 0.02);
      sphere.rotation.x += Math.PI / 2;
      sphere.scale.set(0.8, 1, 1);
      Tenda.add(sphere);

      var sphere2 = sphere.clone();
      sphere2.position.x += -1.2;
      Tenda.add(sphere2);

      var sphere3 = sphere.clone();
      sphere3.position.x += -1.4;
      Tenda.add(sphere3);

      var sphere4 = sphere.clone();
      sphere4.position.x += -2.6;
      Tenda.add(sphere4);

      var valueObject = new Three.Box3().setFromObject(Tenda);

      var deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
      var deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
      var deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);

      Tenda.position.x += width / 1.48;
      Tenda.position.y += -height / 2.1;
      Tenda.position.z += thickness / 1024;
      Tenda.scale.set(width / deltaX, height / deltaY, thickness / deltaZ);

      return Tenda;
    }

    function createMesh(geom) {
      geom.applyMatrix(new Three.Matrix4().makeTranslation(-25, 0, -25));
      var meshMaterial = new Three.MeshLambertMaterial({ color: 0xffffff, opacity: 0.9, transparent: true });
      meshMaterial.side = Three.DoubleSide;

      var plane = new Three.Mesh(geom, meshMaterial);
      return plane;
    }
  }

};