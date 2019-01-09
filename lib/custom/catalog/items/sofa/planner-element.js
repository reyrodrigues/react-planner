'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var _loadObj = require('../../utils/load-obj');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mtl = require('./sofa.mtl');
var obj = require('./sofa.obj');
var img = require('./texture.jpg');

var width = { length: 180, unit: 'cm' };
var depth = { length: 60, unit: 'cm' };
var height = { length: 70, unit: 'cm' };

var cachedJSONSofa = null;

exports.default = {
  name: 'sofa',
  prototype: 'items',

  info: {
    title: 'sofa',
    tag: ['furnishings', 'leather'],
    description: 'Leather sofa',
    image: require('./sofa.png')
  },

  properties: {},

  render2D: function render2D(element, layer, scene) {
    var angle = element.rotation + 90;
    var textRotation = Math.sin(angle * Math.PI / 180) < 0 ? 180 : 0;

    var style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };
    var arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: '2px', fill: '#84e1ce' };

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -width.length / 2 + ',' + -depth.length / 2 + ')' },
      _react2.default.createElement('rect', { x: '0', y: '0', width: width.length, height: depth.length, style: style }),
      _react2.default.createElement('line', { x1: width.length / 2, x2: width.length / 2, y1: depth.length, y2: 1.5 * depth.length,
        style: arrow_style }),
      _react2.default.createElement('line', {
        x1: .35 * width.length,
        x2: width.length / 2,
        y1: 1.2 * depth.length,
        y2: 1.5 * depth.length,
        style: arrow_style
      }),
      _react2.default.createElement('line', {
        x1: width.length / 2,
        x2: .65 * width.length,
        y1: 1.5 * depth.length,
        y2: 1.2 * depth.length,
        style: arrow_style
      }),
      _react2.default.createElement(
        'text',
        {
          x: '0',
          y: '0',
          transform: 'translate(' + width.length / 2 + ', ' + depth.length / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: 'middle', fontSize: '11px' }
        },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var onLoadItem = function onLoadItem(object) {
      var newWidth = (0, _convertUnits2.default)(width.length).from(width.unit).to(scene.unit);
      var newHeight = (0, _convertUnits2.default)(height.length).from(height.unit).to(scene.unit);
      var newDepth = (0, _convertUnits2.default)(depth.length).from(depth.unit).to(scene.unit);

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      var box = new _three.BoxHelper(object, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      box.visible = element.selected;
      object.add(box);

      // Normalize the origin of this item
      var boundingBox = new _three.Box3().setFromObject(object);

      var center = [(boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x, (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y, (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];

      return object;
    };

    if (cachedJSONSofa) {
      var loader = new _three.ObjectLoader();
      var object = loader.parse(cachedJSONSofa);
      return Promise.resolve(onLoadItem(object));
    }

    return (0, _loadObj.loadObjWithMaterial)(mtl, obj, _path2.default.dirname(img) + '/').then(function (object) {
      cachedJSONSofa = object.toJSON();
      var loader = new _three.ObjectLoader();
      return onLoadItem(loader.parse(cachedJSONSofa));
    });
  },

  updateRender3D: function updateRender3D(element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) {

    var noPerf = function noPerf() {
      selfDestroy();return selfBuild();
    };

    if (differences.indexOf('selected') !== -1) {
      mesh.traverse(function (child) {
        if (child instanceof _three.BoxHelper) {
          child.visible = element.selected;
        }
      });

      return Promise.resolve(mesh);
    }

    if (differences.indexOf('rotation') !== -1) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve(mesh);
    }

    return noPerf();
  }
};