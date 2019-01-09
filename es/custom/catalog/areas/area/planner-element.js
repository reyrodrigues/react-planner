import * as ElementsFactories from '../../../../catalog/factories/export';

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

export default ElementsFactories.AreaFactory('area', info, textures);