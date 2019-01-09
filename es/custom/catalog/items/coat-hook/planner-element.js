import * as Three from 'three';
import React from 'react';

var WIDTH = 200;
var DEPTH = 20;
var HEIGHT = 40;

export default {
  name: 'coat-hook',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'optional'],
    title: 'Coat hook',
    description: 'Coat hook',
    image: require('./coat-hook.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 120,
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
    var arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: '2px', fill: '#84e1ce' };

    return React.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH, style: rect_style }),
      React.createElement('line', { key: '2', x1: WIDTH / 2, x2: WIDTH / 2, y1: DEPTH, y2: 1.5 * DEPTH, style: arrow_style }),
      React.createElement('line', { key: '3', x1: .45 * WIDTH, x2: WIDTH / 2, y1: 1.2 * DEPTH, y2: 1.5 * DEPTH, style: arrow_style }),
      React.createElement('line', { key: '4', x1: WIDTH / 2, x2: .55 * WIDTH, y1: 1.5 * DEPTH, y2: 1.2 * DEPTH, style: arrow_style }),
      React.createElement(
        'text',
        { key: '5', x: '0', y: '0',
          transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: 'middle', fontSize: '11px' } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    var coatHook = new Three.Object3D();

    var newWidth = 2.15;
    var newDepth = .04;
    var newHeight = .1;
    var radius = .0125;

    var texture = new Three.TextureLoader().load(require('./wood.jpg'));
    var materialTexture = new Three.MeshLambertMaterial({ map: texture });

    var geometry = new Three.BoxGeometry(newWidth, 1.5 * newHeight, newDepth);
    //let material = new Three.MeshLambertMaterial( {color: 0x9b8c75} );
    var plane = new Three.Mesh(geometry, materialTexture);
    plane.position.y = newHeight / 2;
    coatHook.add(plane);

    var geometry_legs = new Three.CylinderGeometry(radius, radius, newHeight / 1.7, 32);
    var material_legs = new Three.MeshLambertMaterial({ color: 0xd9d7d7 });
    var p1 = new Three.Mesh(geometry_legs, material_legs);
    p1.rotation.x += Math.PI / 2;
    p1.position.set(1, 0.05, 0.05);
    coatHook.add(p1);

    var p2 = new Three.Mesh(geometry_legs, material_legs);
    p2.rotation.x += Math.PI / 2;
    p2.position.set(-.95, 0.05, 0.05);
    coatHook.add(p2);

    var geometrySphereUp = new Three.SphereGeometry(0.035, 32, 32);
    var sphere = new Three.Mesh(geometrySphereUp, material_legs);
    sphere.position.set(1, 0.05, 0.08);
    sphere.scale.set(1, 1, .5);
    coatHook.add(sphere);

    var sphere2 = new Three.Mesh(geometrySphereUp, material_legs);
    sphere2.position.set(-.95, 0.05, 0.08);
    sphere2.scale.set(1, 1, .5);
    coatHook.add(sphere2);

    var newHeight2 = .2;

    var curve = new Three.CatmullRomCurve3([new Three.Vector3(.05, 0.125, 0), new Three.Vector3(.125, .025, 0), new Three.Vector3(-.05, -.075, 0)]);

    for (var i = -0.95; i <= 1.05; i += 0.15) {

      var geometry_legs2 = new Three.CylinderGeometry(radius, radius, newHeight2, 32);
      var p3 = new Three.Mesh(geometry_legs2, material_legs);
      p3.position.set(i, -0.05, 0);
      coatHook.add(p3);

      var geometry3 = new Three.TubeGeometry(curve, 32, .015, 16, false);
      var mesh3 = new Three.Mesh(geometry3, material_legs);
      mesh3.position.set(i, -.05, .045);
      mesh3.rotation.y -= Math.PI / 2;
      mesh3.rotation.x += Math.PI + Math.PI / 7.5;
      mesh3.rotation.z += Math.PI / 2;
      coatHook.add(mesh3);

      var geometrySphere = new Three.SphereGeometry(0.035, 32, 32);
      var sphereTop = new Three.Mesh(geometrySphere, material_legs);
      sphereTop.position.set(i, -0.142, 0.15);
      sphereTop.rotation.x += Math.PI / 2 + Math.PI / 3;
      coatHook.add(sphereTop);
    }

    var value = new Three.Box3().setFromObject(coatHook);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    if (element.selected) {
      var bbox = new Three.BoxHelper(coatHook, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      coatHook.add(bbox);
    }

    coatHook.rotation.y += Math.PI;
    coatHook.position.y += HEIGHT / 1.5 + newAltitude;
    coatHook.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    return Promise.resolve(coatHook);
  }

};