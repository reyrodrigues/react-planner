import * as Three from 'three';
import React from 'react';

var WIDTH = 200;
var DEPTH = 60;
var HEIGHT = 150;

//colors
var white = new Three.MeshLambertMaterial({ color: 0xffffff });
var grey = new Three.MeshLambertMaterial({ color: 0xdddddd });
var grey2 = new Three.MeshLambertMaterial({ color: 0x414449 });

export default {
  name: 'multimedia chalkboard',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'wood', 'metal'],
    title: 'multimedia chalkboard',
    description: 'multimedia chalkboard',
    image: null
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    var rect_style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };

    return React.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH, style: rect_style }),
      React.createElement(
        'text',
        { key: '2', x: '0', y: '0', transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: 'middle', fontSize: '11px' } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    var lim = new Three.Object3D();

    var roundedRectShape = new Three.Shape();

    var x = 0;
    var y = 0;
    var width = 5;
    var height = 4;
    var radius = 0.25;

    roundedRectShape.moveTo(x, y + radius);
    roundedRectShape.lineTo(x, y + height - radius);
    roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
    roundedRectShape.lineTo(x + width - radius, y + height);
    roundedRectShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    roundedRectShape.lineTo(x + width, y + radius);
    roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
    roundedRectShape.lineTo(x + radius, y);
    roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

    var extrudeSettings = {
      steps: 1,
      depth: 0.003125,
      bevelEnabled: false,
      bevelThickness: .4,
      bevelSize: .4,
      bevelSegments: 1
    };

    var geometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
    var mesh = new Three.Mesh(geometry, grey);
    mesh.position.set(0, 1.2, 0);
    lim.add(mesh);

    var geometry2 = new Three.BoxGeometry(width - width / 11, height - height / 8, .003125);
    var mesh2 = new Three.Mesh(geometry2, white);
    mesh2.position.set(2.5, 3.2, 0.00125);
    lim.add(mesh2);

    var roundedRectShape2 = new Three.Shape();

    var x2 = 0;
    var y2 = 0;
    var width2 = 1;
    var height2 = .6;
    var radius2 = 0.125;

    roundedRectShape2.moveTo(x2, y2 + radius2);
    roundedRectShape2.lineTo(x2, y2 + height2 - radius2);
    roundedRectShape2.quadraticCurveTo(x2, y2 + height2, x2 + radius2, y2 + height2);
    roundedRectShape2.lineTo(x2 + width2 - radius2, y2 + height2);
    roundedRectShape2.quadraticCurveTo(x2 + width2, y2 + height2, x2 + width2, y2 + height2 - radius2);
    roundedRectShape2.lineTo(x2 + width2, y2 + radius2);
    roundedRectShape2.quadraticCurveTo(x2 + width2, y2, x2 + width2 - radius2, y2);
    roundedRectShape2.lineTo(x2 + radius2, y2);
    roundedRectShape2.quadraticCurveTo(x2, y2, x2, y2 + radius2);

    var extrudeSettings2 = {
      steps: 1,
      depth: 0.003125,
      bevelEnabled: false,
      bevelThickness: .4,
      bevelSize: .4,
      bevelSegments: 1
    };

    var textureLoader = new Three.TextureLoader();
    var etichettaImage = textureLoader.load(null);

    var geometryPlane = new Three.PlaneGeometry(4, 3);
    var material = new Three.MeshLambertMaterial({ map: etichettaImage, transparent: true });
    var plane = new Three.Mesh(geometryPlane, material);
    plane.position.set(2.5, 3.1, -.0005);
    plane.rotation.y += Math.PI;
    lim.add(plane);

    var geometry3 = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
    var mesh3 = new Three.Mesh(geometry3, grey);
    mesh3.position.set(width / 2 - width / 10, 5.35, 0);
    lim.add(mesh3);

    var roundedRectShape3 = new Three.Shape();

    var x3 = 0;
    var y3 = 0;
    var width3 = .45;
    var height3 = .25;
    var radius3 = 0.125;

    roundedRectShape3.moveTo(x3, y3 + radius3);
    roundedRectShape3.lineTo(x3, y3 + height3 - radius3);
    roundedRectShape3.quadraticCurveTo(x3, y3 + height3, x3 + radius3, y3 + height3);
    roundedRectShape3.lineTo(x3 + width3 - radius3, y3 + height3);
    roundedRectShape3.quadraticCurveTo(x3 + width3, y3 + height3, x3 + width3, y3 + height3 - radius3);
    roundedRectShape3.lineTo(x3 + width3, y3 + radius3);
    roundedRectShape3.quadraticCurveTo(x3 + width3, y3, x3 + width3 - radius3, y3);
    roundedRectShape3.lineTo(x3 + radius3, y3);
    roundedRectShape3.quadraticCurveTo(x3, y3, x3, y3 + radius3);

    var extrudeSettings3 = {
      steps: 1,
      depth: 0.0125,
      bevelEnabled: false,
      bevelThickness: .4,
      bevelSize: .4,
      bevelSegments: 1
    };

    var geometry4 = new Three.ExtrudeGeometry(roundedRectShape3, extrudeSettings3);
    var mesh4 = new Three.Mesh(geometry4, grey2);
    mesh4.position.set(width / 2 - width / 24, 5.45, -0.0125);
    lim.add(mesh4);

    var roundedRectShape4 = new Three.Shape();

    var x4 = 0;
    var y4 = 0;
    var width4 = .4;
    var height4 = .2;
    var radius4 = 0.10;

    roundedRectShape4.moveTo(x4, y4 + radius4);
    roundedRectShape4.lineTo(x4, y4 + height4 - radius4);
    roundedRectShape4.quadraticCurveTo(x4, y4 + height4, x4 + radius4, y4 + height4);
    roundedRectShape4.lineTo(x4 + width4 - radius4, y4 + height4);
    roundedRectShape4.quadraticCurveTo(x4 + width4, y4 + height4, x4 + width4, y4 + height4 - radius4);
    roundedRectShape4.lineTo(x4 + width4, y4 + radius4);
    roundedRectShape4.quadraticCurveTo(x4 + width4, y4, x4 + width4 - radius4, y4);
    roundedRectShape4.lineTo(x4 + radius4, y4);
    roundedRectShape4.quadraticCurveTo(x4, y4, x4, y4 + radius4);

    var extrudeSettings4 = {
      steps: 1,
      depth: 0.0125,
      bevelEnabled: false,
      bevelThickness: .4,
      bevelSize: .4,
      bevelSegments: 1
    };

    var geometry5 = new Three.ExtrudeGeometry(roundedRectShape4, extrudeSettings4);
    var mesh5 = new Three.Mesh(geometry5, grey2);
    mesh5.position.set(width / 2 - width / 27, 5.5, -0.02);
    lim.add(mesh5);

    var supportGeometry = new Three.CylinderGeometry(0.025, 0.035, 0.1, 32, 32, false, 0, 2 * Math.PI);
    var support = new Three.Mesh(supportGeometry, grey2);
    support.position.set(width / 2 - width / 1024, 5.45, -0.018);
    support.rotation.y += Math.PI / 2;
    support.scale.set(.05, 1, 4);
    lim.add(support);

    var roundedRectShape5 = new Three.Shape();

    var x5 = 0;
    var y5 = 0;
    var width5 = .4;
    var height5 = .2;
    var radius5 = 0.10;

    roundedRectShape5.moveTo(x5, y5);
    roundedRectShape5.lineTo(width5, y5);
    roundedRectShape5.lineTo(width5, height5);
    roundedRectShape5.lineTo(x5, height5);

    var extrudeSettings5 = {
      steps: 1,
      depth: 0.01,
      bevelEnabled: false,
      bevelThickness: .4,
      bevelSize: .4,
      bevelSegments: 1
    };

    var geometry6 = new Three.ExtrudeGeometry(roundedRectShape5, extrudeSettings5);
    var mesh6 = new Three.Mesh(geometry6, grey2);
    mesh6.position.set(width / 2 - width / 24.45, 5.2, -0.0225);
    lim.add(mesh6);

    var supportGeometry2 = new Three.CylinderGeometry(0.029, 0.029, 0.4, 32, 32, false, 0, 2 * Math.PI);
    var support2 = new Three.Mesh(supportGeometry2, grey2);
    support2.position.set(width / 2 - width / 1024, 5.2, -0.021);
    support2.rotation.y += Math.PI;
    support2.rotation.x += Math.PI / 2;
    support2.rotation.z += Math.PI / 2;
    support2.scale.set(.05, 1, 4);
    lim.add(support2);

    var value = new Three.Box3().setFromObject(lim);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    if (element.selected) {
      var bbox = new Three.BoxHelper(lim, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      lim.add(bbox);
    }

    lim.rotation.y += Math.PI;
    lim.position.y += -HEIGHT / 3.2 + newAltitude;
    lim.position.x += WIDTH / 2;
    lim.position.z += -DEPTH / 3.5;

    lim.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    return Promise.resolve(lim);
  }

};