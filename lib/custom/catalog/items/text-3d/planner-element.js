'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helvetiker_regularTypeface = require('./helvetiker_regular.typeface.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fontLoader = new _three.FontLoader();
var font = fontLoader.parse(_helvetiker_regularTypeface.HELVETIKER);

var defaultFontSize = 16;
var defaultColor = '#000000';

exports.default = {
  name: 'text',
  prototype: 'items',

  info: {
    tag: ['text'],
    title: 'Text 3D',
    description: 'Text',
    image: require('./img.png')
  },

  properties: {
    text: {
      label: 'text',
      type: 'string',
      defaultValue: 'Custom Text'
    },
    fontSize: {
      label: 'font size',
      type: 'number',
      defaultValue: defaultFontSize
    },
    color: {
      label: 'text color',
      type: 'color',
      defaultValue: defaultColor
    },
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

    var color = element.properties.get('color') || defaultColor;
    var text = element.properties.get('text') || '';
    var fontSize = element.properties.get('fontSize') || defaultFontSize;
    var textHorizontalPadding = defaultFontSize;
    var width = (text.length - text.length / 2) * fontSize + textHorizontalPadding;
    var height = 2 * fontSize;

    return _react2.default.createElement(
      'g',
      null,
      _react2.default.createElement('rect', {
        x: -width / 2,
        y: -height / 2,
        fill: '#FFF',
        width: width,
        height: height,
        stroke: '#000',
        strokeWidth: '2'
      }),
      _react2.default.createElement(
        'text',
        {
          x: '0',
          y: '0',
          fontFamily: 'Arial',
          alignmentBaseline: 'middle',
          textAnchor: 'middle',
          fontSize: fontSize,
          fill: color,
          transform: 'scale(1,-1)'
        },
        text
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var text = element.properties.get('text') || '';
    var size = element.properties.get('fontSize') || defaultFontSize;
    var textHorizontalPadding = defaultFontSize;
    var width = (text.length - text.length / 2) * size + textHorizontalPadding;
    var color = element.properties.get('color') || defaultColor;

    var mesh = new _three.Mesh(new _three.TextGeometry(text, { size: size, height: 1, font: font }), new _three.MeshBasicMaterial({ color: color }));

    if (element.selected) {
      var box = new _three.BoxHelper(mesh, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      mesh.add(box);
    }

    mesh.position.y += element.properties.getIn(['altitude', 'length']);
    mesh.position.x -= width / 2;

    return Promise.resolve(mesh);
  }
};