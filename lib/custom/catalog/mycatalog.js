'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _catalog = require('../../catalog/catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _areas = require('./areas');

var _areas2 = _interopRequireDefault(_areas);

var _lines = require('./lines');

var _lines2 = _interopRequireDefault(_lines);

var _holes = require('./holes');

var _holes2 = _interopRequireDefault(_holes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var catalog = new _catalog2.default();

// import * as Items from './items/**/planner-element.jsx';

Object.values(_areas2.default).forEach(function (element) {
  return catalog.registerElement(element);
});
Object.values(_lines2.default).forEach(function (element) {
  return catalog.registerElement(element);
});
Object.values(_holes2.default).forEach(function (element) {
  return catalog.registerElement(element);
});
// for( let x in Items ) catalog.registerElement( Items[x] );

catalog.registerCategory('windows', 'Windows', [_holes2.default.window]);
catalog.registerCategory('doors', 'Doors', [_holes2.default.door]);

exports.default = catalog;