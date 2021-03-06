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

exports.default = {
  name: 'venetian-blind-window',
  prototype: 'holes',

  info: {
    tag: ['Window'],
    title: 'Venetian Blind Window',
    description: 'Venetian Blind Window',
    image: null
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 90
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 100
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 90
      }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: {
        length: 10
      }
    },
    flip: {
      label: 'Flip',
      type: 'checkbox',
      defaultValue: 'false'
    }
  },

  render2D: function render2D(element, layer, scene) {

    var STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '3px', fill: '#000' };
    var STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '3px', fill: '#0096fd', cursor: 'move' };

    var epsilon = 3;

    var holeWidth = element.properties.get('width').get('length');
    var holePath = 'M' + 0 + ' ' + -epsilon + '  L' + holeWidth + ' ' + -epsilon + '  L' + holeWidth + ' ' + epsilon + '  L' + 0 + ' ' + epsilon + '  z';
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    var length = element.properties.get('width').get('length');
    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -length / 2 + ', 0)' },
      _react2.default.createElement('path', { key: '1', d: holePath, style: holeStyle }),
      _react2.default.createElement('line', { key: '2', x1: holeWidth / 2, y1: -10 - epsilon, x2: holeWidth / 2, y2: 10 + epsilon, style: holeStyle })
    );
  },

  render3D: function render3D(element, layer, scene) {

    var width = element.properties.get('width').get('length');
    var height = element.properties.get('height').get('length');
    var thickness = element.properties.get('thickness').get('length');
    var flip = element.properties.get('flip');

    var onLoadItem = function onLoadItem(object) {

      var venetian = new Three.Object3D();

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

      venetian.add(object);
      venetian.add(createTenda());

      if (flip === true) venetian.rotation.y += Math.PI;

      return venetian;
    };

    if (cached3DWindow) {
      return Promise.resolve(onLoadItem(cached3DWindow.clone()));;
    }

    var mtl = null;
    var obj = null;
    var img = null;

    return (0, _loadObj.loadObjWithMaterial)(mtl, obj, _path2.default.dirname(img) + '/').then(function (object) {
      cached3DWindow = object;
      return onLoadItem(cached3DWindow.clone());
    });

    function createTenda() {

      var venetian = new Three.Object3D();

      //colors
      var white = new Three.MeshLambertMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
      var grey = new Three.MeshLambertMaterial({ color: 0xCCCCCC });

      var roundedRectShape = new Three.Shape();

      var x = 0;
      var y = 0;
      var width = 1;
      var height = 18;
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

      var holePath1 = new Three.Path();
      holePath1.moveTo(0.5, 0.6);
      holePath1.arc(0, .7, .15, 0, Math.PI, false);
      holePath1.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath1);

      var holePath2 = new Three.Path();
      holePath2.moveTo(0.5, 4.6);
      holePath2.arc(0, .7, .15, 0, Math.PI, false);
      holePath2.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath2);

      var holePath3 = new Three.Path();
      holePath3.moveTo(0.5, 8.6);
      holePath3.arc(0, .7, .15, 0, Math.PI, false);
      holePath3.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath3);

      var holePath4 = new Three.Path();
      holePath4.moveTo(0.5, 12.6);
      holePath4.arc(0, .7, .15, 0, Math.PI, false);
      holePath4.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath4);

      var holePath5 = new Three.Path();
      holePath5.moveTo(0.5, 16.6);
      holePath5.arc(0, .7, .15, 0, Math.PI, false);
      holePath5.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath5);

      var extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: false,
        bevelThickness: .4,
        bevelSize: .4,
        bevelSegments: 1
      };

      for (var i = 0; i < 25; i += .7) {
        var geometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
        var mesh = new Three.Mesh(geometry, grey);
        mesh.position.set(0, i, 0.86);
        mesh.rotation.z += Math.PI / 2;
        mesh.rotation.x += -Math.PI / 2;
        venetian.add(mesh);
      }

      for (var j = -1.25; j > -19; j += -4) {

        var geometry1 = new Three.CylinderGeometry(0.105, 0.105, 26, 32);
        var tubo = new Three.Mesh(geometry1, white);
        tubo.position.set(j, 12.5, .35);
        venetian.add(tubo);
      }

      var roundedRectShape2 = new Three.Shape();

      var x1 = 0;
      var y1 = 0;
      var width1 = 1;
      var height1 = 18;
      var radius1 = 0.25;

      roundedRectShape2.moveTo(x1, y1 + radius1);
      roundedRectShape2.lineTo(x1, y1 + height1 - radius1);
      roundedRectShape2.quadraticCurveTo(x1, y1 + height1, x1 + radius1, y1 + height1);
      roundedRectShape2.lineTo(x1 + width1 - radius1, y1 + height1);
      roundedRectShape2.quadraticCurveTo(x1 + width1, y1 + height1, x1 + width1, y1 + height1 - radius1);
      roundedRectShape2.lineTo(x1 + width1, y1 + radius1);
      roundedRectShape2.quadraticCurveTo(x1 + width1, y1, x1 + width1 - radius1, y1);
      roundedRectShape2.lineTo(x1 + radius1, y1);
      roundedRectShape2.quadraticCurveTo(x1, y1, x1, y1 + radius1);

      var extrudeSettings2 = {
        steps: 1,
        depth: 0.4,
        bevelEnabled: false,
        bevelThickness: .4,
        bevelSize: .4,
        bevelSegments: 1
      };

      for (var k = -.5; k < 27; k += 26) {
        var geometry2 = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
        var mesh2 = new Three.Mesh(geometry2, grey);
        mesh2.position.set(0, k, 1);
        mesh2.rotation.z += Math.PI / 2;
        mesh2.rotation.x += -Math.PI / 2;
        venetian.add(mesh2);
      }

      var valueObject = new Three.Box3().setFromObject(venetian);

      var deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
      var deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
      var deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);

      venetian.position.x += width1 / .025;
      venetian.position.y += -height1 / .4;
      venetian.scale.set(5.2 * width1 / deltaZ, 5.45 * height1 / deltaY, 2.5 * thickness / deltaX);

      return venetian;
    }
  }

};