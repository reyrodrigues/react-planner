import * as Three from 'three';
import React from 'react';

var WIDTH = 80;
var DEPTH = 100;
var HEIGHT = 80;

var textureLoader = new Three.TextureLoader();
var steel = textureLoader.load(null);
var darkSteel = textureLoader.load(null);
var logo = textureLoader.load(null);
var steelTexture = new Three.MeshLambertMaterial({ map: steel });
var darkSteelTexture = new Three.MeshLambertMaterial({ map: darkSteel });
var logoTexture = new Three.MeshLambertMaterial({ map: logo });

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var kitchen = new Three.Mesh();

  //base
  var body = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1.5), steelTexture);
  body.position.set(0, 0.15, 0);
  kitchen.add(body);

  //foot
  for (var gx = -0.45; gx <= 0.45; gx += 0.9) {
    for (var gz = -0.7125; gz <= 0.7125; gz += 1.425) {
      var foot = new Three.Mesh(new Three.CylinderGeometry(0.05, 0.05, 0.05, 4), steelTexture);
      foot.position.set(gx, -0.05, gz);
      foot.rotation.y = 0.25 * Math.PI;
      body.add(foot);
    }
  }

  //back
  var back = new Three.Mesh(new Three.BoxGeometry(0.05, 1, 1.5), steelTexture);
  back.position.set(0.475, 0.525, 0);
  body.add(back);

  //side
  var side1 = new Three.Mesh(new Three.BoxGeometry(1, 1, 0.05), steelTexture);
  side1.position.set(0, 0.525, 0.725);
  body.add(side1);

  var side2 = new Three.Mesh(new Three.BoxGeometry(1, 1, 0.05), steelTexture);
  side2.position.set(0, 0.525, -0.725);
  body.add(side2);

  //top
  var top = new Three.Mesh(new Three.BoxGeometry(1, 0.20, 1.5), steelTexture);
  top.position.set(0, 1.1, 0);
  body.add(top);

  //logo
  var logo = new Three.Mesh(new Three.PlaneGeometry(0.1, 0.05), logoTexture);
  logo.position.set(-0.51, 1.13, 0);
  logo.rotation.y = -0.5 * Math.PI;
  body.add(logo);

  //front
  var front = new Three.Mesh(new Three.BoxGeometry(0.05, 0.99, 1.4), steelTexture);
  front.position.set(-0.47, 0.525, 0);
  body.add(front);

  //oven
  var oven = new Three.Mesh(new Three.BoxGeometry(0.05, 0.9, 1.3), steelTexture);
  oven.position.set(-0.53, 0.525, 0);
  body.add(oven);

  //handle
  var handle1 = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.02, 1), darkSteelTexture);
  handle1.position.set(-0.6, 0.85, 0);
  handle1.rotation.x = 0.5 * Math.PI;
  body.add(handle1);

  var handle2 = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.02, 0.06), darkSteelTexture);
  handle2.position.set(-0.56, 0.85, -0.4);
  handle2.rotation.z = 0.5 * Math.PI;
  body.add(handle2);

  var handle3 = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.02, 0.06), darkSteelTexture);
  handle3.position.set(-0.56, 0.85, 0.4);
  handle3.rotation.z = 0.5 * Math.PI;
  body.add(handle3);

  //knob
  for (var _gz = -0.6; _gz <= 0.65; _gz += 0.3) {
    var knob = new Three.Mesh(new Three.CylinderGeometry(0.03, 0.03, 0.02, 32), darkSteelTexture);
    knob.position.set(-0.51, 1.05, _gz);
    knob.rotation.z = 0.5 * Math.PI;
    body.add(knob);

    var knob_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.03, 0.01), darkSteelTexture);
    knob_p2.position.set(0, 0.02, 0);
    knob.add(knob_p2);
  }

  //fire
  for (var _gx = -0.22; _gx <= 0.22; _gx += 0.44) {
    for (var _gz2 = -0.45; _gz2 <= 0.45; _gz2 += 0.9) {
      var fire = new Three.Mesh(new Three.CylinderGeometry(0.08, 0.1, 0.02, 32), darkSteelTexture);
      fire.position.set(_gx, 1.21, _gz2);
      body.add(fire);
    }
  }

  //central fire
  var centralFire = new Three.Mesh(new Three.CylinderGeometry(0.1, 0.12, 0.02, 32), darkSteelTexture);
  centralFire.position.set(0, 1.21, 0);
  body.add(centralFire);

  //long side grid
  for (var _gx2 = -0.45; _gx2 <= 0.45; _gx2 += 0.45) {
    if (_gx2 !== 0) {
      var longSideGrid = new Three.Mesh(new Three.BoxGeometry(0.03, 0.05, 1.38), darkSteelTexture);
      longSideGrid.position.set(_gx2, 1.21, 0);
      body.add(longSideGrid);
    } else {
      for (var _gz3 = -0.46; _gz3 <= 0.68; _gz3 += 0.90) {
        var longSideGrid2 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.05, 0.46), darkSteelTexture);
        longSideGrid2.position.set(_gx2, 1.21, _gz3);
        body.add(longSideGrid2);
      }
    }
  }

  //short side grid
  for (var _gz4 = -0.675; _gz4 <= 0.675; _gz4 += 0.45) {

    var shortSideGrid = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.03), darkSteelTexture);
    shortSideGrid.position.set(0, 1.21, _gz4);
    body.add(shortSideGrid);
  }

  //long side grid central
  for (var _gx3 = -0.22; _gx3 <= 0.22; _gx3 += 0.44) {
    for (var _gz5 = -0.59; _gz5 <= 0.68; _gz5 += 0.90) {
      var lsgc1 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.01, 0.2), darkSteelTexture);
      lsgc1.position.set(_gx3, 1.24, _gz5);
      body.add(lsgc1);
    }
    for (var _gz6 = 0.59; _gz6 >= -0.68; _gz6 -= 0.90) {
      var lsgc2 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.01, 0.2), darkSteelTexture);
      lsgc2.position.set(_gx3, 1.24, _gz6);
      body.add(lsgc2);
    }
  }

  //short side grid central
  for (var _gx4 = -0.365; _gx4 <= 0.345; _gx4 += 0.7) {
    for (var _gz7 = -0.45; _gz7 <= 0.45; _gz7 += 0.45) {
      if (_gz7 !== 0) {
        var ssgc1 = new Three.Mesh(new Three.BoxGeometry(0.2, 0.02, 0.03), darkSteelTexture);
        if (_gx4 < 0) ssgc1.position.set(_gx4, 1.24, _gz7);else ssgc1.position.set(_gx4 + 0.03, 1.24, _gz7);
        body.add(ssgc1);
      } else {
        var ssgc2 = new Three.Mesh(new Three.BoxGeometry(0.4, 0.02, 0.03), darkSteelTexture);
        if (_gx4 < 0) ssgc2.position.set(_gx4 + 0.1, 1.24, _gz7);else ssgc2.position.set(_gx4 - 0.07, 1.24, _gz7);
        body.add(ssgc2);
      }
    }
  }

  //long side grid inside
  for (var _gz8 = -0.45; _gz8 <= 0.45; _gz8 += 0.9) {
    var lsgi = new Three.Mesh(new Three.BoxGeometry(0.35, 0.02, 0.03), darkSteelTexture);
    lsgi.position.set(0, 1.24, _gz8);
    body.add(lsgi);
  }

  //central peace
  for (var _gz9 = -0.14; _gz9 <= 0.14; _gz9 += 0.28) {
    var cp = new Three.Mesh(new Three.BoxGeometry(0.03, 0.02, 0.2), darkSteelTexture);
    cp.position.set(0, 1.25, _gz9);
    body.add(cp);
  }

  return kitchen;
}

function makeObjectMinLOD() {

  var kitchen = new Three.Mesh();

  //base
  var body = new Three.Mesh(new Three.BoxGeometry(1, 0.05, 1.5), steelTexture);
  body.position.set(0, 0.15, 0);
  kitchen.add(body);

  //foot
  for (var gx = -0.45; gx <= 0.45; gx += 0.9) {
    for (var gz = -0.7125; gz <= 0.7125; gz += 1.425) {
      var foot = new Three.Mesh(new Three.CylinderGeometry(0.05, 0.05, 0.05, 4), steelTexture);
      foot.position.set(gx, -0.05, gz);
      foot.rotation.y = 0.25 * Math.PI;
      body.add(foot);
    }
  }

  //back
  var back = new Three.Mesh(new Three.BoxGeometry(0.05, 1, 1.5), steelTexture);
  back.position.set(0.475, 0.525, 0);
  body.add(back);

  //side
  var side1 = new Three.Mesh(new Three.BoxGeometry(1, 1, 0.05), steelTexture);
  side1.position.set(0, 0.525, 0.725);
  body.add(side1);

  var side2 = new Three.Mesh(new Three.BoxGeometry(1, 1, 0.05), steelTexture);
  side2.position.set(0, 0.525, -0.725);
  body.add(side2);

  //top
  var top = new Three.Mesh(new Three.BoxGeometry(1, 0.20, 1.5), steelTexture);
  top.position.set(0, 1.1, 0);
  body.add(top);

  //logo
  var logo = new Three.Mesh(new Three.PlaneGeometry(0.1, 0.05), logoTexture);
  logo.position.set(-0.51, 1.13, 0);
  logo.rotation.y = -0.5 * Math.PI;
  body.add(logo);

  //front
  var front = new Three.Mesh(new Three.BoxGeometry(0.05, 0.99, 1.4), steelTexture);
  front.position.set(-0.47, 0.525, 0);
  body.add(front);

  //oven
  var oven = new Three.Mesh(new Three.BoxGeometry(0.05, 0.9, 1.3), steelTexture);
  oven.position.set(-0.53, 0.525, 0);
  body.add(oven);

  //handle
  var handle1 = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.02, 1), darkSteelTexture);
  handle1.position.set(-0.6, 0.85, 0);
  handle1.rotation.x = 0.5 * Math.PI;
  body.add(handle1);

  var handle2 = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.02, 0.06), darkSteelTexture);
  handle2.position.set(-0.56, 0.85, -0.4);
  handle2.rotation.z = 0.5 * Math.PI;
  body.add(handle2);

  var handle3 = new Three.Mesh(new Three.CylinderGeometry(0.02, 0.02, 0.06), darkSteelTexture);
  handle3.position.set(-0.56, 0.85, 0.4);
  handle3.rotation.z = 0.5 * Math.PI;
  body.add(handle3);

  //knob
  for (var _gz10 = -0.6; _gz10 <= 0.65; _gz10 += 0.3) {
    var knob = new Three.Mesh(new Three.CylinderGeometry(0.03, 0.03, 0.02, 32), darkSteelTexture);
    knob.position.set(-0.51, 1.05, _gz10);
    knob.rotation.z = 0.5 * Math.PI;
    body.add(knob);

    var knob_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.03, 0.01), darkSteelTexture);
    knob_p2.position.set(0, 0.02, 0);
    knob.add(knob_p2);
  }

  //fire
  for (var _gx5 = -0.22; _gx5 <= 0.22; _gx5 += 0.44) {
    for (var _gz11 = -0.45; _gz11 <= 0.45; _gz11 += 0.9) {
      var fire = new Three.Mesh(new Three.CylinderGeometry(0.08, 0.1, 0.02, 32), darkSteelTexture);
      fire.position.set(_gx5, 1.21, _gz11);
      body.add(fire);
    }
  }

  //central fire
  var centralFire = new Three.Mesh(new Three.CylinderGeometry(0.1, 0.12, 0.02, 32), darkSteelTexture);
  centralFire.position.set(0, 1.21, 0);
  body.add(centralFire);

  //long side grid
  for (var _gx6 = -0.45; _gx6 <= 0.45; _gx6 += 0.45) {
    if (_gx6 !== 0) {
      var longSideGrid = new Three.Mesh(new Three.BoxGeometry(0.03, 0.05, 1.38), darkSteelTexture);
      longSideGrid.position.set(_gx6, 1.21, 0);
      body.add(longSideGrid);
    } else {
      for (var _gz12 = -0.46; _gz12 <= 0.68; _gz12 += 0.90) {
        var longSideGrid2 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.05, 0.46), darkSteelTexture);
        longSideGrid2.position.set(_gx6, 1.21, _gz12);
        body.add(longSideGrid2);
      }
    }
  }

  //short side grid
  for (var _gz13 = -0.675; _gz13 <= 0.675; _gz13 += 0.45) {

    var shortSideGrid = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.03), darkSteelTexture);
    shortSideGrid.position.set(0, 1.21, _gz13);
    body.add(shortSideGrid);
  }

  //long side grid central
  for (var _gx7 = -0.22; _gx7 <= 0.22; _gx7 += 0.44) {
    for (var _gz14 = -0.59; _gz14 <= 0.68; _gz14 += 0.90) {
      var lsgc1 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.01, 0.2), darkSteelTexture);
      lsgc1.position.set(_gx7, 1.24, _gz14);
      body.add(lsgc1);
    }
    for (var _gz15 = 0.59; _gz15 >= -0.68; _gz15 -= 0.90) {
      var lsgc2 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.01, 0.2), darkSteelTexture);
      lsgc2.position.set(_gx7, 1.24, _gz15);
      body.add(lsgc2);
    }
  }

  //short side grid central
  for (var _gx8 = -0.365; _gx8 <= 0.345; _gx8 += 0.7) {
    for (var _gz16 = -0.45; _gz16 <= 0.45; _gz16 += 0.45) {
      if (_gz16 !== 0) {
        var ssgc1 = new Three.Mesh(new Three.BoxGeometry(0.2, 0.02, 0.03), darkSteelTexture);
        if (_gx8 < 0) ssgc1.position.set(_gx8, 1.24, _gz16);else ssgc1.position.set(_gx8 + 0.03, 1.24, _gz16);
        body.add(ssgc1);
      } else {
        var ssgc2 = new Three.Mesh(new Three.BoxGeometry(0.4, 0.02, 0.03), darkSteelTexture);
        if (_gx8 < 0) ssgc2.position.set(_gx8 + 0.1, 1.24, _gz16);else ssgc2.position.set(_gx8 - 0.07, 1.24, _gz16);
        body.add(ssgc2);
      }
    }
  }

  //long side grid inside
  for (var _gz17 = -0.45; _gz17 <= 0.45; _gz17 += 0.9) {
    var lsgi = new Three.Mesh(new Three.BoxGeometry(0.35, 0.02, 0.03), darkSteelTexture);
    lsgi.position.set(0, 1.24, _gz17);
    body.add(lsgi);
  }

  //central peace
  for (var _gz18 = -0.14; _gz18 <= 0.14; _gz18 += 0.28) {
    var cp = new Three.Mesh(new Three.BoxGeometry(0.03, 0.02, 0.2), darkSteelTexture);
    cp.position.set(0, 1.25, _gz18);
    body.add(cp);
  }

  return kitchen;
}

export default {
  name: "kitchen",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "kitchen",
    description: "kitchen",
    image: null
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

    /************ lod max ****************/

    var kitchenMaxLOD = new Three.Object3D();
    kitchenMaxLOD.add(objectMaxLOD.clone());

    var valuePosition = new Three.Box3().setFromObject(kitchenMaxLOD);

    var deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    var deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    var deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    kitchenMaxLOD.position.y += newAltitude;
    kitchenMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /************ lod min ****************/

    var kitchenMinLOD = new Three.Object3D();
    kitchenMinLOD.add(objectMinLOD.clone());
    kitchenMinLOD.position.y += newAltitude;
    kitchenMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(kitchenMaxLOD, 200);
    lod.addLevel(kitchenMinLOD, 900);
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