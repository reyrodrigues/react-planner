import React from 'react';
import { BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper } from 'three';
import { ReactPlannerSharedStyle } from 'react-planner';

export default {
  name: 'cube',
  prototype: 'items',

  info: {
    title: 'cube',
    tag: ['demo'],
    description: 'Demo item',
    image: null
  },

  properties: {
    color: {
      label: 'Color',
      type: 'color',
      defaultValue: ReactPlannerSharedStyle.AREA_MESH_COLOR.unselected
    },
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {
    var style = {
      stroke: !element.selected ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected : ReactPlannerSharedStyle.MESH_SELECTED,
      strokeWidth: 2,
      fill: element.properties.get('color')
    };

    var w = element.properties.getIn(['width', 'length']);
    var d = element.properties.getIn(['depth', 'length']);
    var w2 = w / 2;
    var d2 = d / 2;

    return React.createElement(
      'g',
      { transform: 'translate(-' + w2 + ', -' + d2 + ')' },
      React.createElement('rect', { x: '0', y: '0', width: w, height: d, style: style })
    );
  },

  render3D: function render3D(element, layer, scene) {
    var w = element.properties.getIn(['width', 'length']);
    var h = element.properties.getIn(['height', 'length']);
    var d = element.properties.getIn(['depth', 'length']);
    var geometry = new BoxGeometry(w, h, d);
    var material = new MeshBasicMaterial({
      color: element.properties.get('color')
    });

    var mesh = new Mesh(geometry, material);

    var box = new BoxHelper(mesh, !element.selected ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected : ReactPlannerSharedStyle.MESH_SELECTED);
    box.material.linewidth = 2;
    box.renderOrder = 1000;
    mesh.add(box);

    mesh.position.y = h / 2;

    return Promise.resolve(mesh);
  }
};