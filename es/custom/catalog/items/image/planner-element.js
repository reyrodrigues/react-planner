import * as Three from 'three';
import React from 'react';
import ImageFul from './imageful';

export default {
  name: "image",
  prototype: "items",

  info: {
    title: "image",
    tag: ['image'],
    description: "Image",
    image: null
  },

  properties: {
    imageUri: {
      label: "Image URI",
      type: "string",
      defaultValue: ''
    },
    x1: {
      label: "x1",
      type: "number",
      defaultValue: 0
    },
    y1: {
      label: "y1",
      type: "number",
      defaultValue: 0
    },
    x2: {
      label: "x2",
      type: "number",
      defaultValue: 100
    },
    y2: {
      label: "y2",
      type: "number",
      defaultValue: 0
    },
    distance: {
      label: "Distance",
      type: "length-measure",
      defaultValue: {
        length: 100
      }
    },
    width: {
      label: "Width",
      type: "number",
      defaultValue: 600
    },
    height: {
      label: "Height",
      type: "number",
      defaultValue: 400
    }
  },

  render2D: function render2D(element, layer, scene) {
    var _element$properties$t = element.properties.toJS(),
        x1 = _element$properties$t.x1,
        y1 = _element$properties$t.y1,
        x2 = _element$properties$t.x2,
        y2 = _element$properties$t.y2,
        distance = _element$properties$t.distance,
        width = _element$properties$t.width,
        height = _element$properties$t.height,
        imageUri = _element$properties$t.imageUri;

    return React.createElement(ImageFul, {
      imageUri: imageUri,
      element: element,
      distance: distance,
      x1: x1,
      x2: x2,
      y1: y1,
      y2: y2,
      width: width,
      height: height,
      layer: layer,
      scene: scene
    });
  },

  render3D: function render3D(element, layer, scene) {
    return Promise.resolve(new Three.Object3D());
  }
};