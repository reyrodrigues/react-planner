import * as Three from 'three';
import React from 'react';

var WIDTH = 50;
var DEPTH = 50;
var HEIGHT = 180;

var blackMaterial = new Three.MeshLambertMaterial({ color: 0x4B4B4B });
var greyMaterial = new Three.MeshLambertMaterial({ color: 0xC0C0C0 });
var blueMaterial = new Three.MeshLambertMaterial({ color: 0x3399FF, transparent: true, opacity: 0.8 });

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var hanger = new Three.Mesh();

  //base
  var base_geom = new Three.CylinderGeometry(0.09, 0.25, 0.08, 20, 2, true);
  blackMaterial.side = Three.DoubleSide;
  var base = new Three.Mesh(base_geom, blackMaterial);
  base.position.set(0, 0.04, 0);

  var base2_geom = new Three.CylinderGeometry(0.09, 0.01, 0.03, 20, 2, true);
  var base2 = new Three.Mesh(base2_geom, blackMaterial);
  base2.position.set(0, 0.015 + 0.05, 0);

  //central body
  var body_geom = new Three.CylinderGeometry(0.03, 0.03, 2, 32, 32);
  var body = new Three.Mesh(body_geom, greyMaterial);
  body.position.set(0, 1, 0);

  //umbrella base
  var g_umbrella_base = new Three.TorusGeometry(0.045, 0.02, 32, 32);

  var umbrella_base = new Three.Mesh(g_umbrella_base, blueMaterial);
  umbrella_base.rotation.x = Math.PI / 2;
  umbrella_base.position.set(0, 0.7, 0);

  var g_umbrella = new Three.TorusGeometry(0.06, 0.015, 32, 32);
  var umbrella = [];

  for (var i = 0; i < 4; i++) {
    umbrella[i] = new Three.Mesh(g_umbrella, blueMaterial);
    umbrella[i].rotation.x = Math.PI / 2;
    umbrella[i].position.y = 0.7;
  }

  umbrella[0].position.x = 0.1;
  umbrella[1].position.z = 0.1;
  umbrella[2].position.x = -0.1;
  umbrella[3].position.z = -0.1;

  //hooks
  var g_hook_body = new Three.CylinderGeometry(0.015, 0.015, 0.17, 32, 32);

  var g_hook = new Three.CylinderGeometry(0.05, 0.05, 0.02, 32, 32);

  var hooks = [];

  for (var _i = 0; _i < 8; _i++) {
    hooks[_i] = new Three.Object3D();
    hooks[_i].rotation.x = Math.PI / 2;
    hooks[_i].position.set(0, 1.7, 0);

    var hook_body = new Three.Mesh(g_hook_body, greyMaterial);
    hooks[_i].add(hook_body);

    var hook = new Three.Mesh(g_hook, blueMaterial);
    hook_body.add(hook);
    hook.position.y = 0.085;

    hooks[_i].rotation.z = 45 * _i * Math.PI / 180;
    hook_body.position.y = 0.115;

    if (_i % 2 === 1) hooks[_i].position.y += 0.2;
  }

  hanger.add(base);
  hanger.add(base2);
  hanger.add(body);
  hanger.add(umbrella_base);

  for (var _i2 = 0; _i2 < 4; _i2++) {
    hanger.add(umbrella[_i2]);
  }

  for (var _i3 = 0; _i3 < 8; _i3++) {
    hanger.add(hooks[_i3]);
  }

  return hanger;
}

function makeObjectMinLOD() {

  var hanger = new Three.Mesh();

  //base
  var base_geom = new Three.CylinderGeometry(0.09, 0.25, 0.08, 20, 2, true);
  blackMaterial.side = Three.DoubleSide;
  var base = new Three.Mesh(base_geom, blackMaterial);
  base.position.set(0, 0.04, 0);

  var base2_geom = new Three.CylinderGeometry(0.09, 0.01, 0.03, 20, 2, true);
  var base2 = new Three.Mesh(base2_geom, blackMaterial);
  base2.position.set(0, 0.015 + 0.05, 0);

  //central body
  var body_geom = new Three.CylinderGeometry(0.03, 0.03, 2, 8, 8);
  var body = new Three.Mesh(body_geom, greyMaterial);
  body.position.set(0, 1, 0);

  //umbrella support
  var g_umbrella_base = new Three.TorusGeometry(0.045, 0.02, 8, 8);
  var m_umbrella = new Three.MeshLambertMaterial({
    color: 0x3399FF,
    transparent: true,
    opacity: 0.8
  });
  var umbrella_base = new Three.Mesh(g_umbrella_base, m_umbrella);
  umbrella_base.rotation.x = Math.PI / 2;
  umbrella_base.position.set(0, 0.7, 0);

  var g_umbrella = new Three.TorusGeometry(0.06, 0.015, 8, 8);
  var umbrella = [];

  for (var i = 0; i < 4; i++) {
    umbrella[i] = new Three.Mesh(g_umbrella, m_umbrella);
    umbrella[i].rotation.x = Math.PI / 2;
    umbrella[i].position.y = 0.7;
  }

  umbrella[0].position.x = 0.1;
  umbrella[1].position.z = 0.1;
  umbrella[2].position.x = -0.1;
  umbrella[3].position.z = -0.1;

  //hooks
  var g_hook_body = new Three.CylinderGeometry(0.015, 0.015, 0.17, 8, 8);

  var g_hook = new Three.CylinderGeometry(0.05, 0.05, 0.02, 8, 8);

  var hooks = [];

  for (var _i4 = 0; _i4 < 8; _i4++) {
    hooks[_i4] = new Three.Object3D();
    hooks[_i4].rotation.x = Math.PI / 2;
    hooks[_i4].position.set(0, 1.7, 0);

    var hook_body = new Three.Mesh(g_hook_body, greyMaterial);
    hooks[_i4].add(hook_body);

    var hook = new Three.Mesh(g_hook, m_umbrella);
    hook_body.add(hook);
    hook.position.y = 0.085;

    hooks[_i4].rotation.z = 45 * _i4 * Math.PI / 180;
    hook_body.position.y = 0.115;

    if (_i4 % 2 === 1) hooks[_i4].position.y += 0.2;
  }

  hanger.add(base);
  hanger.add(base2);
  hanger.add(body);
  hanger.add(umbrella_base);

  for (var _i5 = 0; _i5 < 4; _i5++) {
    hanger.add(umbrella[_i5]);
  }

  for (var _i6 = 0; _i6 < 8; _i6++) {
    hanger.add(hooks[_i6]);
  }

  return hanger;
}

export default {
  name: "hanger",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metallo', 'plastic'],
    title: "hanger",
    description: "hanger",
    image: require('./hanger.png')
  },

  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
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

    return React.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" } }),
      React.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /************* lod max ******************/
    var hangerMaxLOD = new Three.Object3D();
    hangerMaxLOD.add(objectMaxLOD.clone());

    var aa = new Three.Box3().setFromObject(hangerMaxLOD);

    var deltaX = Math.abs(aa.max.x - aa.min.x);
    var deltaY = Math.abs(aa.max.y - aa.min.y);
    var deltaZ = Math.abs(aa.max.z - aa.min.z);

    hangerMaxLOD.position.y += newAltitude;
    hangerMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /************* lod min ******************/
    var hangerMinLOD = new Three.Object3D();
    hangerMinLOD.add(objectMinLOD.clone());
    hangerMinLOD.position.y += newAltitude;
    hangerMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(hangerMaxLOD, 200);
    lod.addLevel(hangerMinLOD, 900);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;

    if (element.selected) {
      var bbox = new Three.BoxHelper(lod, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      lod.add(bbox);
    }

    return Promise.resolve(lod);
  }

};