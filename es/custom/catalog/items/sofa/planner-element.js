import { BoxHelper, Box3, ObjectLoader } from 'three';
import { loadObjWithMaterial } from '../../utils/load-obj';
import path from 'path';
import convert from 'convert-units';

import React from 'react';

var mtl = null;
var obj = null;
var img = null;

var width = { length: 180, unit: 'cm' };
var depth = { length: 60, unit: 'cm' };
var height = { length: 70, unit: 'cm' };

var cachedJSONSofa = null;

export default {
  name: 'sofa',
  prototype: 'items',

  info: {
    title: 'sofa',
    tag: ['furnishings', 'leather'],
    description: 'Leather sofa',
    image: null
  },

  properties: {},

  render2D: function render2D(element, layer, scene) {
    var angle = element.rotation + 90;
    var textRotation = Math.sin(angle * Math.PI / 180) < 0 ? 180 : 0;

    var style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };
    var arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: '2px', fill: '#84e1ce' };

    return React.createElement(
      'g',
      { transform: 'translate(' + -width.length / 2 + ',' + -depth.length / 2 + ')' },
      React.createElement('rect', { x: '0', y: '0', width: width.length, height: depth.length, style: style }),
      React.createElement('line', { x1: width.length / 2, x2: width.length / 2, y1: depth.length, y2: 1.5 * depth.length,
        style: arrow_style }),
      React.createElement('line', {
        x1: .35 * width.length,
        x2: width.length / 2,
        y1: 1.2 * depth.length,
        y2: 1.5 * depth.length,
        style: arrow_style
      }),
      React.createElement('line', {
        x1: width.length / 2,
        x2: .65 * width.length,
        y1: 1.5 * depth.length,
        y2: 1.2 * depth.length,
        style: arrow_style
      }),
      React.createElement(
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
      var newWidth = convert(width.length).from(width.unit).to(scene.unit);
      var newHeight = convert(height.length).from(height.unit).to(scene.unit);
      var newDepth = convert(depth.length).from(depth.unit).to(scene.unit);

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      var box = new BoxHelper(object, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      box.visible = element.selected;
      object.add(box);

      // Normalize the origin of this item
      var boundingBox = new Box3().setFromObject(object);

      var center = [(boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x, (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y, (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];

      return object;
    };

    if (cachedJSONSofa) {
      var loader = new ObjectLoader();
      var object = loader.parse(cachedJSONSofa);
      return Promise.resolve(onLoadItem(object));
    }

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/').then(function (object) {
      cachedJSONSofa = object.toJSON();
      var loader = new ObjectLoader();
      return onLoadItem(loader.parse(cachedJSONSofa));
    });
  },

  updateRender3D: function updateRender3D(element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) {

    var noPerf = function noPerf() {
      selfDestroy();return selfBuild();
    };

    if (differences.indexOf('selected') !== -1) {
      mesh.traverse(function (child) {
        if (child instanceof BoxHelper) {
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