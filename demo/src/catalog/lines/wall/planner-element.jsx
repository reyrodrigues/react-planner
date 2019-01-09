import {ElementsFactories} from 'react-planner';

const info = {
  title: 'wall',
  tag: ['wall'],
  description: 'Wall with bricks or painted',
  image: null,
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {
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
    name:'Painted',
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
  },
};

export default ElementsFactories.WallFactory('wall', info, textures);

