'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _export = require('../../../../catalog/factories/export');

var ElementsFactories = _interopRequireWildcard(_export);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var info = {
  title: 'wall',
  tag: ['wall'],
  description: 'Wall with bricks or painted',
  image: null,
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

var textures = {
  bricks: {
    name: 'Bricks',
    uri: null,
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: null,
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.8,
      normalScaleY: 0.8
    }
  },
  painted: {
    name: 'Painted',
    uri: null,
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: null,
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  }
};

exports.default = ElementsFactories.WallFactory('wall', info, textures);