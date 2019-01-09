'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _export = require('../../../../catalog/factories/export');

var ElementsFactories = _interopRequireWildcard(_export);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var info = {
  title: 'area',
  tag: ['area'],
  description: 'Generic Room',
  image: ''
};

var textures = {
  parquet: {
    name: 'Parquet',
    uri: null,
    lengthRepeatScale: 0.004,
    heightRepeatScale: 0.004
  },
  tile1: {
    name: 'Tile1',
    uri: null,
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01
  },
  ceramic: {
    name: 'Ceramic Tile',
    uri: null,
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02
  },
  strand_porcelain: {
    name: 'Strand Porcelain Tile',
    uri: null,
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02
  },
  grass: {
    name: 'Grass',
    uri: null,
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01
  }
};

exports.default = ElementsFactories.AreaFactory('area', info, textures);