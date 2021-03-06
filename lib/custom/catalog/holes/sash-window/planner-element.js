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
  name: "sash window",
  prototype: "holes",

  info: {
    title: "sash window",
    tag: ['window'],
    description: "Sash window",
    image: null
  },

  properties: {
    width: {
      label: "Width",
      type: "length-measure",
      defaultValue: {
        length: 90
      }
    },
    height: {
      label: "Height",
      type: "length-measure",
      defaultValue: {
        length: 100
      }
    },
    altitude: {
      label: "Altitude",
      type: "length-measure",
      defaultValue: {
        length: 90
      }
    },
    thickness: {
      label: "Thickness",
      type: "length-measure",
      defaultValue: {
        length: 10
      }
    }
  },

  render2D: function render2D(element, layer, scene) {
    var STYLE_HOLE_BASE = { stroke: "#000", strokeWidth: "3px", fill: "#000" };
    var STYLE_HOLE_SELECTED = { stroke: "#0096fd", strokeWidth: "3px", fill: "#0096fd", cursor: "move" };
    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

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
    var onLoadItem = function onLoadItem(object) {
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

      object.scale.set(width / initialWidth, height / initialHeight, thickness / initialThickness);

      return object;
    };

    if (cached3DWindow) {
      return Promise.resolve(onLoadItem(cached3DWindow.clone()));
    }

    var mtl = null;
    var obj = null;
    var img = null;

    return (0, _loadObj.loadObjWithMaterial)(mtl, obj, _path2.default.dirname(img) + '/').then(function (object) {
      cached3DWindow = object;
      return onLoadItem(cached3DWindow.clone());
    });
  }
};