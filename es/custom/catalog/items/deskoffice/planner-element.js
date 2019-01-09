import * as Three from 'three';
import React from 'react';

var textureLoader = new Three.TextureLoader();
var white = textureLoader.load(require("./white.jpg"));
var whiteMaterial = new Three.MeshLambertMaterial({ color: 0x000000 });
var wood = textureLoader.load(require("./wood.jpg"));
var glassMaterial = new Three.MeshLambertMaterial({ color: 0xc6c6c6, transparent: true, opacity: .5 });

function makeMonitor(newDepth) {
  var monitor = new Three.Object3D();

  var cubeGeometryBase = new Three.BoxGeometry(0.04, 0.42, 0.06);
  var whiteTexture = new Three.MeshLambertMaterial({ map: white });
  var edge1 = new Three.Mesh(cubeGeometryBase, whiteTexture);
  edge1.position.set(0, 0.79, 0);
  edge1.rotation.x = Math.PI / 2;
  monitor.add(edge1);

  var edge2 = new Three.Mesh(cubeGeometryBase, whiteTexture);
  edge2.position.set(0, 0.43, 0);
  edge2.rotation.x = Math.PI / 2;
  monitor.add(edge2);

  var cubeGeometryBase2 = new Three.BoxGeometry(0.04, 0.42, 0.04);
  var edge3 = new Three.Mesh(cubeGeometryBase2, whiteTexture);
  edge3.position.set(0, 0.61, 0.21);
  monitor.add(edge3);

  var edge4 = new Three.Mesh(cubeGeometryBase2, whiteTexture);
  edge4.position.set(0, 0.61, -0.21);
  monitor.add(edge4);

  var cubeGeometryBase3 = new Three.BoxGeometry(0.4, 0.40, 0.05);
  var screen = new Three.Mesh(cubeGeometryBase3, whiteMaterial);
  screen.position.set(-0.02, 0.61, 0);
  screen.rotation.y = Math.PI / 2;
  monitor.add(screen);

  monitor.rotation.y -= Math.PI / 2;
  monitor.rotation.x -= Math.PI / 3;

  var value = new Three.Box3().setFromObject(monitor);

  var deltaX = Math.abs(value.max.x - value.min.x);
  var deltaY = Math.abs(value.max.y - value.min.y);
  var deltaZ = Math.abs(value.max.z - value.min.z);

  monitor.scale.set(newDepth / 3 / deltaX, newDepth / 4 / deltaY, newDepth / 4 / deltaZ);

  return monitor;
}

function makeObjectMaxLOD(newWidthA, newWidthB, newHeight, newDepth) {

  var desk = new Three.Mesh();

  var rectShape = new Three.Shape();
  if (newWidthA < newWidthB) {
    rectShape.moveTo(0, 0);
    rectShape.lineTo(newWidthA / 2 - newWidthB / 2, newDepth);
    rectShape.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2), newDepth);
    rectShape.lineTo(newWidthA, 0);
  } else if (newWidthA > newWidthB) {
    rectShape.moveTo(0, 0);
    rectShape.lineTo(newWidthA, 0);
    rectShape.lineTo(newWidthA + (newWidthB / 2 - newWidthA / 2), newDepth);
    rectShape.lineTo(-(newWidthB / 2 - newWidthA / 2), newDepth);
  } else if (newWidthA === newWidthB) {
    rectShape.moveTo(0, 0);
    rectShape.lineTo(0, newDepth);
    rectShape.lineTo(newWidthA, newDepth);
    rectShape.lineTo(newWidthA, 0);
  }

  var extrudeSettings = {
    steps: 2,
    depth: newHeight / 40,
    bevelEnabled: false,
    bevelThickness: newHeight,
    bevelSize: newHeight,
    bevelSegments: 2
  };

  var geometry = new Three.ExtrudeGeometry(rectShape, extrudeSettings);
  var woodTexture = new Three.MeshLambertMaterial({ map: wood });
  var mesh = new Three.Mesh(geometry, woodTexture);

  mesh.rotation.x += Math.PI / 2;
  mesh.position.y = newHeight / 1.8;

  var rectShape2 = new Three.Shape();
  var hole = new Three.Path();
  if (newWidthA < newWidthB) {
    rectShape2.moveTo(0, 0);
    rectShape2.lineTo(newWidthA, 0);
    rectShape2.lineTo(newWidthA + (newWidthB / 2 - newWidthA / 2), newDepth);
    rectShape2.lineTo(-(newWidthB / 2 - newWidthA / 2), newDepth);

    hole.moveTo(newWidthB / 20, newDepth / 20);
    hole.lineTo(newWidthA / 2 - newWidthB / 2 + newWidthB / 20, newDepth - newDepth / 20);
    hole.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2) - newWidthB / 20, newDepth - newDepth / 20);
    hole.lineTo(newWidthA - newWidthB / 20, newDepth / 20);
    rectShape2.holes.push(hole);
  } else if (newWidthA > newWidthB) {

    rectShape2.moveTo(0, 0);
    rectShape2.lineTo(newWidthA, 0);
    rectShape2.lineTo(newWidthA + (newWidthB / 2 - newWidthA / 2), newDepth);
    rectShape2.lineTo(-(newWidthB / 2 - newWidthA / 2), newDepth);

    hole.moveTo(newWidthA / 2 - newWidthB / 2 - newWidthA / 20, newDepth / 20);
    hole.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2) + newWidthA / 20, newDepth / 20);
    hole.lineTo(newWidthB + newWidthA / 20, newDepth - newDepth / 20);
    hole.lineTo(newWidthA - newWidthB - newWidthA / 20, newDepth - newDepth / 20);
    rectShape2.holes.push(hole);
  } else if (newWidthA === newWidthB) {

    rectShape2.moveTo(0, 0);
    rectShape2.lineTo(newWidthA, 0);
    rectShape2.lineTo(newWidthA, newDepth);
    rectShape2.lineTo(0, newDepth);

    hole.moveTo(newWidthA / 20, newDepth / 20);
    hole.lineTo(newWidthA - newWidthA / 20, newDepth / 20);
    hole.lineTo(newWidthA - newWidthA / 20, newDepth - newDepth / 20);
    hole.lineTo(newWidthA / 20, newDepth - newDepth / 20);
    rectShape2.holes.push(hole);
  }

  var geometry2 = new Three.ExtrudeGeometry(rectShape2, extrudeSettings);
  var mesh2 = new Three.Mesh(geometry2, woodTexture);
  mesh2.position.y += newHeight;
  mesh2.position.z += newDepth / 40;
  mesh2.rotation.x += Math.PI / 2;

  var mesh3 = new Three.Mesh(geometry, woodTexture);
  mesh3.position.y += newHeight;
  mesh3.rotation.x += Math.PI / 1.5;

  if (newWidthA < newWidthB) {
    mesh3.scale.set(.98, 1, 1);
    mesh3.position.x += 3;
  }
  if (newWidthA > newWidthB || newWidthA === newWidthB) mesh3.scale.set(1, 1, 1);

  var glass = new Three.Shape();
  if (newWidthA < newWidthB) {
    glass.moveTo(newWidthB / 20, newDepth / 20);
    glass.lineTo(newWidthA / 2 - newWidthB / 2 + newWidthB / 20, newDepth - newDepth / 20);
    glass.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2) - newWidthB / 20, newDepth - newDepth / 20);
    glass.lineTo(newWidthA - newWidthB / 20, newDepth / 20);
  } else if (newWidthA > newWidthB) {
    glass.moveTo(newWidthA / 2 - newWidthB / 2 - newWidthA / 20, newDepth / 20);
    glass.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2) + newWidthA / 20, newDepth / 20);
    glass.lineTo(newWidthB + newWidthA / 20, newDepth - newDepth / 20);
    glass.lineTo(newWidthA - newWidthB - newWidthA / 20, newDepth - newDepth / 20);
  } else if (newWidthA === newWidthB) {
    glass.moveTo(newWidthA / 20, newDepth / 20);
    glass.lineTo(newWidthA - newWidthA / 20, newDepth / 20);
    glass.lineTo(newWidthA - newWidthA / 20, newDepth - newDepth / 20);
    glass.lineTo(newWidthA / 20, newDepth - newDepth / 20);
  }

  var geometry4 = new Three.ExtrudeGeometry(glass, extrudeSettings);
  var mesh4 = new Three.Mesh(geometry4, glassMaterial);
  mesh4.position.y += newHeight;
  mesh4.rotation.x += Math.PI / 2;

  var geometry5 = new Three.BoxGeometry(newWidthA, newDepth / 20, 1.6 * newHeight);
  var mesh5 = new Three.Mesh(geometry5, woodTexture);
  mesh5.rotation.x += Math.PI / 2;
  mesh5.position.set(newWidthA / 2, newHeight / 5, 0);

  var c = void 0;

  if (newWidthA < newWidthB) c = newWidthB / 2 - newWidthA / 2;else if (newWidthA > newWidthB) c = newWidthA / 2 - newWidthB / 2;

  var value = newDepth / c;
  var angle = Math.atan(value);
  var edge = void 0;

  edge = Math.sqrt(Math.pow(c, 2) + Math.pow(newDepth, 2));

  if (newWidthA === newWidthB) edge = newDepth;

  var geometry6 = new Three.BoxGeometry(edge, newDepth / 20, 1.6 * newHeight);
  var mesh6 = new Three.Mesh(geometry6, woodTexture);
  mesh6.rotation.x += Math.PI / 2;

  if (newWidthA < newWidthB) {
    mesh6.position.set(-(newWidthB / 2 - newWidthA / 2) / 2, newHeight / 5, newDepth / 2);
    mesh6.rotation.z -= angle;
  } else if (newWidthA > newWidthB) {
    mesh6.position.set((newWidthA - (newWidthA / 2 + newWidthB / 2)) / 2, newHeight / 5, newDepth / 2);
    mesh6.rotation.z += angle;
  } else if (newWidthA === newWidthB) {
    mesh6.position.set(0, newHeight / 5, newDepth / 2);
    mesh6.rotation.z += Math.PI / 2;
  }

  var mesh7 = mesh6.clone();
  if (newWidthA < newWidthB) {
    mesh7.position.set(newWidthB - 1.5 * (newWidthB / 2 - newWidthA / 2), newHeight / 5, newDepth / 2);
    mesh7.rotation.z = -Math.PI + angle;
  } else if (newWidthA > newWidthB) {
    mesh7.position.set(newWidthA - (newWidthA / 2 - newWidthB / 2) / 2, newHeight / 5, newDepth / 2);
    mesh7.rotation.z = -Math.PI - angle;
  } else if (newWidthA === newWidthB) {
    mesh7.position.set(newWidthB, newHeight / 5, newDepth / 2);
  }

  var index = void 0;
  var indexMonitor = void 0;
  var lastPosition = void 0;
  var lastPositionMonitor = void 0;
  var incrPosition = void 0;

  if (newWidthA < newWidthB) {
    index = 0;
    indexMonitor = newWidthB / 2 - newWidthA / 2;
    lastPosition = newWidthB - 2 * (newWidthB / 2 - newWidthA / 2);
    lastPositionMonitor = newWidthB - 2 * (newWidthB / 2 - newWidthA / 2) - (newWidthB / 2 - newWidthA / 2);
    incrPosition = newWidthB / 2 - newWidthA / 2;
  } else if (newWidthA > newWidthB) {
    index = newWidthA / 2 - newWidthB / 2;
    indexMonitor = 2 * (newWidthA / 2 - newWidthB / 2);
    lastPosition = newWidthA - (newWidthA / 2 - newWidthB / 2);
    lastPositionMonitor = newWidthA - 2 * (newWidthA / 2 - newWidthB / 2);
    incrPosition = newWidthA / 2 - newWidthB / 2;
  } else if (newWidthA === newWidthB) {
    index = 0;
    indexMonitor = newWidthA / 8;
    lastPosition = newWidthA;
    lastPositionMonitor = newWidthA - newWidthA / 8;
    incrPosition = newWidthA / 8;
  }

  for (var i = index + incrPosition; i < lastPosition; i += incrPosition) {

    var geometry8 = new Three.BoxGeometry(newDepth, newDepth / 20, 1.55 * newHeight);
    var mesh8 = new Three.Mesh(geometry8, woodTexture);
    mesh8.rotation.x = Math.PI / 2;
    mesh8.rotation.z = Math.PI / 2;
    mesh8.position.x += i;
    mesh8.position.y += newHeight / 5;
    mesh8.position.z += newDepth / 2;
    desk.add(mesh8);
  }

  desk.add(mesh);
  desk.add(mesh2);
  desk.add(mesh3);
  desk.add(mesh4);
  desk.add(mesh5);
  desk.add(mesh6);
  desk.add(mesh7);

  for (var _i = indexMonitor + incrPosition / 2; _i < lastPositionMonitor; _i += incrPosition) {
    var monitor2 = makeMonitor(newDepth);
    monitor2.position.x = _i;
    monitor2.position.z += 1.15 * newDepth;
    monitor2.position.y += mesh3.position.y / 2.2;
    desk.add(monitor2);
  }

  return desk;
}

function makeObjectMinLOD(newWidthA, newWidthB, newHeight, newDepth) {

  var desk = new Three.Mesh();

  var rectShape = new Three.Shape();
  if (newWidthA < newWidthB) {
    rectShape.moveTo(0, 0);
    rectShape.lineTo(newWidthA / 2 - newWidthB / 2, newDepth);
    rectShape.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2), newDepth);
    rectShape.lineTo(newWidthA, 0);
  } else if (newWidthA > newWidthB) {
    rectShape.moveTo(0, 0);
    rectShape.lineTo(newWidthA, 0);
    rectShape.lineTo(newWidthA + (newWidthB / 2 - newWidthA / 2), newDepth);
    rectShape.lineTo(-(newWidthB / 2 - newWidthA / 2), newDepth);
  } else if (newWidthA === newWidthB) {
    rectShape.moveTo(0, 0);
    rectShape.lineTo(0, newDepth);
    rectShape.lineTo(newWidthA, newDepth);
    rectShape.lineTo(newWidthA, 0);
  }

  var extrudeSettings = {
    steps: 2,
    depth: newHeight / 40,
    bevelEnabled: false,
    bevelThickness: newHeight,
    bevelSize: newHeight,
    bevelSegments: 2
  };

  var geometry = new Three.ExtrudeGeometry(rectShape, extrudeSettings);
  var woodTexture = new Three.MeshLambertMaterial({ map: wood });
  var mesh = new Three.Mesh(geometry, woodTexture);

  mesh.rotation.x += Math.PI / 2;
  mesh.position.y = newHeight / 1.8;

  var rectShape2 = new Three.Shape();
  var hole = new Three.Path();
  if (newWidthA < newWidthB) {
    rectShape2.moveTo(0, 0);
    rectShape2.lineTo(newWidthA, 0);
    rectShape2.lineTo(newWidthA + (newWidthB / 2 - newWidthA / 2), newDepth);
    rectShape2.lineTo(-(newWidthB / 2 - newWidthA / 2), newDepth);

    hole.moveTo(newWidthB / 20, newDepth / 20);
    hole.lineTo(newWidthA / 2 - newWidthB / 2 + newWidthB / 20, newDepth - newDepth / 20);
    hole.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2) - newWidthB / 20, newDepth - newDepth / 20);
    hole.lineTo(newWidthA - newWidthB / 20, newDepth / 20);
    rectShape2.holes.push(hole);
  } else if (newWidthA > newWidthB) {

    rectShape2.moveTo(0, 0);
    rectShape2.lineTo(newWidthA, 0);
    rectShape2.lineTo(newWidthA + (newWidthB / 2 - newWidthA / 2), newDepth);
    rectShape2.lineTo(-(newWidthB / 2 - newWidthA / 2), newDepth);

    hole.moveTo(newWidthA / 2 - newWidthB / 2 - newWidthA / 20, newDepth / 20);
    hole.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2) + newWidthA / 20, newDepth / 20);
    hole.lineTo(newWidthB + newWidthA / 20, newDepth - newDepth / 20);
    hole.lineTo(newWidthA - newWidthB - newWidthA / 20, newDepth - newDepth / 20);
    rectShape2.holes.push(hole);
  } else if (newWidthA === newWidthB) {

    rectShape2.moveTo(0, 0);
    rectShape2.lineTo(newWidthA, 0);
    rectShape2.lineTo(newWidthA, newDepth);
    rectShape2.lineTo(0, newDepth);

    hole.moveTo(newWidthA / 20, newDepth / 20);
    hole.lineTo(newWidthA - newWidthA / 20, newDepth / 20);
    hole.lineTo(newWidthA - newWidthA / 20, newDepth - newDepth / 20);
    hole.lineTo(newWidthA / 20, newDepth - newDepth / 20);
    rectShape2.holes.push(hole);
  }

  var geometry2 = new Three.ExtrudeGeometry(rectShape2, extrudeSettings);
  var mesh2 = new Three.Mesh(geometry2, woodTexture);
  mesh2.position.y += newHeight;
  mesh2.position.z += newDepth / 40;
  mesh2.rotation.x += Math.PI / 2;

  var mesh3 = new Three.Mesh(geometry, woodTexture);
  mesh3.position.y += newHeight;
  mesh3.rotation.x += Math.PI / 1.5;

  if (newWidthA < newWidthB) {
    mesh3.scale.set(.98, 1, 1);
    mesh3.position.x += 3;
  }
  if (newWidthA > newWidthB || newWidthA === newWidthB) mesh3.scale.set(1, 1, 1);

  var glass = new Three.Shape();
  if (newWidthA < newWidthB) {
    glass.moveTo(newWidthB / 20, newDepth / 20);
    glass.lineTo(newWidthA / 2 - newWidthB / 2 + newWidthB / 20, newDepth - newDepth / 20);
    glass.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2) - newWidthB / 20, newDepth - newDepth / 20);
    glass.lineTo(newWidthA - newWidthB / 20, newDepth / 20);
  } else if (newWidthA > newWidthB) {
    glass.moveTo(newWidthA / 2 - newWidthB / 2 - newWidthA / 20, newDepth / 20);
    glass.lineTo(newWidthA - (newWidthA / 2 - newWidthB / 2) + newWidthA / 20, newDepth / 20);
    glass.lineTo(newWidthB + newWidthA / 20, newDepth - newDepth / 20);
    glass.lineTo(newWidthA - newWidthB - newWidthA / 20, newDepth - newDepth / 20);
  } else if (newWidthA === newWidthB) {
    glass.moveTo(newWidthA / 20, newDepth / 20);
    glass.lineTo(newWidthA - newWidthA / 20, newDepth / 20);
    glass.lineTo(newWidthA - newWidthA / 20, newDepth - newDepth / 20);
    glass.lineTo(newWidthA / 20, newDepth - newDepth / 20);
  }

  var geometry4 = new Three.ExtrudeGeometry(glass, extrudeSettings);
  var glassMaterial = new Three.MeshLambertMaterial({ color: 0xc6c6c6, transparent: true, opacity: .5 });
  var mesh4 = new Three.Mesh(geometry4, glassMaterial);
  mesh4.position.y += newHeight;
  mesh4.rotation.x += Math.PI / 2;

  var geometry5 = new Three.BoxGeometry(newWidthA, newDepth / 20, 1.6 * newHeight);
  var mesh5 = new Three.Mesh(geometry5, woodTexture);
  mesh5.rotation.x += Math.PI / 2;
  mesh5.position.set(newWidthA / 2, newHeight / 5, 0);

  var c = void 0;

  if (newWidthA < newWidthB) c = newWidthB / 2 - newWidthA / 2;else if (newWidthA > newWidthB) c = newWidthA / 2 - newWidthB / 2;

  var value = newDepth / c;
  var angle = Math.atan(value);
  var edge = void 0;

  edge = Math.sqrt(Math.pow(c, 2) + Math.pow(newDepth, 2));

  if (newWidthA === newWidthB) edge = newDepth;

  var geometry6 = new Three.BoxGeometry(edge, newDepth / 20, 1.6 * newHeight);
  var mesh6 = new Three.Mesh(geometry6, woodTexture);
  mesh6.rotation.x += Math.PI / 2;

  if (newWidthA < newWidthB) {
    mesh6.position.set(-(newWidthB / 2 - newWidthA / 2) / 2, newHeight / 5, newDepth / 2);
    mesh6.rotation.z -= angle;
  } else if (newWidthA > newWidthB) {
    mesh6.position.set((newWidthA - (newWidthA / 2 + newWidthB / 2)) / 2, newHeight / 5, newDepth / 2);
    mesh6.rotation.z += angle;
  } else if (newWidthA === newWidthB) {
    mesh6.position.set(0, newHeight / 5, newDepth / 2);
    mesh6.rotation.z += Math.PI / 2;
  }

  var mesh7 = mesh6.clone();
  if (newWidthA < newWidthB) {
    mesh7.position.set(newWidthB - 1.5 * (newWidthB / 2 - newWidthA / 2), newHeight / 5, newDepth / 2);
    mesh7.rotation.z = -Math.PI + angle;
  } else if (newWidthA > newWidthB) {
    mesh7.position.set(newWidthA - (newWidthA / 2 - newWidthB / 2) / 2, newHeight / 5, newDepth / 2);
    mesh7.rotation.z = -Math.PI - angle;
  } else if (newWidthA === newWidthB) {
    mesh7.position.set(newWidthB, newHeight / 5, newDepth / 2);
  }

  desk.add(mesh);
  desk.add(mesh2);
  desk.add(mesh3);
  desk.add(mesh4);
  desk.add(mesh5);
  desk.add(mesh6);
  desk.add(mesh7);

  return desk;
}

export default {
  name: "desk",
  prototype: "items",

  info: {
    tag: ['furnishings', 'wood'],
    title: "desk",
    description: "desk",
    image: require('./desk.png')
  },

  properties: {
    widthA: {
      label: "larghezza lato A",
      type: "length-measure",
      defaultValue: {
        length: 400,
        unit: 'cm'
      }
    },
    widthB: {
      label: "larghezza lato B",
      type: "length-measure",
      defaultValue: {
        length: 400,
        unit: 'cm'
      }
    },
    depth: {
      label: "depth",
      type: "length-measure",
      defaultValue: {
        length: 90,
        unit: 'cm'
      }
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
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

    var newWidthA = element.properties.get('widthA').get('length');
    var newWidthB = element.properties.get('widthB').get('length');
    var newDepth = element.properties.get('depth').get('length');
    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return React.createElement(
      'g',
      { transform: 'translate(' + -newWidthA / 2 + ',' + -newDepth / 2 + ')' },
      React.createElement('path', { key: '1', d: 'M ' + (newWidthA / 2 - newWidthB / 2) + ' 0 l ' + (-newWidthA / 2 + newWidthB / 2) + ' ' + newDepth + ' l ' + newWidthA + ' 0 l ' + (-newWidthA / 2 + newWidthB / 2) + -newDepth + ' l ' + -newWidthB + ' 0', stroke: 'red',
        transform: 'translate(0, ' + newDepth + ') scale(1,-1)',
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" } }),
      React.createElement(
        'text',
        { key: '5', x: '0', y: '0',
          transform: 'translate(' + newWidthA / 2 + ', ' + newDepth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newWidthA = element.properties.get('widthA').get('length');
    var newWidthB = element.properties.get('widthB').get('length');
    var newDepth = element.properties.get('depth').get('length');
    var newHeight = element.properties.get('height').get('length');
    var newAltitude = element.properties.get('altitude').get('length');

    /********** lod max **********/

    var scrivaniaMaxLOD = new Three.Object3D();
    scrivaniaMaxLOD.add(makeObjectMaxLOD(newWidthA, newWidthB, newHeight, newDepth).clone());

    var aa = new Three.Box3().setFromObject(scrivaniaMaxLOD);

    var deltaX = Math.abs(aa.max.x - aa.min.x);
    var deltaY = Math.abs(aa.max.y - aa.min.y);
    var deltaZ = Math.abs(aa.max.z - aa.min.z);

    scrivaniaMaxLOD.position.y += newHeight / 2 + newAltitude;
    scrivaniaMaxLOD.position.z += newDepth / 2;
    if (newWidthA < newWidthB) scrivaniaMaxLOD.position.x += newWidthB / 2 - (newWidthB / 2 - newWidthA / 2);
    if (newWidthA > newWidthB) scrivaniaMaxLOD.position.x += newWidthA / 2;
    if (newWidthA === newWidthB) scrivaniaMaxLOD.position.x += newWidthB / 2;

    scrivaniaMaxLOD.rotation.y += Math.PI;
    if (newWidthA < newWidthB) scrivaniaMaxLOD.scale.set(newWidthB / deltaX, newDepth / deltaY, newHeight / deltaZ);
    if (newWidthA > newWidthB) scrivaniaMaxLOD.scale.set(newWidthA / deltaX, newDepth / deltaY, newHeight / deltaZ);
    if (newWidthA === newWidthB) scrivaniaMaxLOD.scale.set(newWidthA / deltaX, newDepth / deltaY, newHeight / deltaZ);

    /********** lod min **********/

    var scrivaniaMinLOD = new Three.Object3D();
    scrivaniaMinLOD.add(makeObjectMinLOD(newWidthA, newWidthB, newHeight, newDepth).clone());

    scrivaniaMinLOD.position.y += newHeight / 2 + newAltitude;
    scrivaniaMinLOD.position.z += newDepth / 2;
    if (newWidthA < newWidthB) scrivaniaMinLOD.position.x += newWidthB / 2 - (newWidthB / 2 - newWidthA / 2);
    if (newWidthA > newWidthB) scrivaniaMinLOD.position.x += newWidthA / 2;
    if (newWidthA === newWidthB) scrivaniaMinLOD.position.x += newWidthB / 2;

    scrivaniaMinLOD.rotation.y += Math.PI;
    if (newWidthA < newWidthB) scrivaniaMinLOD.scale.set(newWidthB / deltaX, newDepth / deltaY, newHeight / deltaZ);
    if (newWidthA > newWidthB) scrivaniaMinLOD.scale.set(newWidthA / deltaX, newDepth / deltaY, newHeight / deltaZ);
    if (newWidthA === newWidthB) scrivaniaMinLOD.scale.set(newWidthA / deltaX, newDepth / deltaY, newHeight / deltaZ);

    /*** add all Level of Detail ***/

    var lod = new Three.LOD();

    lod.addLevel(scrivaniaMaxLOD, 700);
    lod.addLevel(scrivaniaMinLOD, 1000);
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