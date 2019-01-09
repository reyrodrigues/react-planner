import React from 'react';
import * as Three from 'three';

var black = new Three.MeshLambertMaterial({ color: 0x000000 });
var metalBlue = new Three.MeshLambertMaterial({ color: 0xB7CEEC });
var grey = new Three.MeshLambertMaterial({ color: 0xD2B06A });
var darkGrey = new Three.MeshLambertMaterial({ color: 0xFFEFCE });

var boxMaterials = [grey, grey, grey, grey, darkGrey, darkGrey];

function makeDoor(width, height, thickness) {

  var door_double = new Three.Mesh();

  var LongDoorGeometry = new Three.BoxGeometry(.75 * width, height, thickness);
  var longDoor = new Three.Mesh(LongDoorGeometry, boxMaterials);
  longDoor.position.x -= width * .25;
  door_double.add(longDoor);

  var ShortDoorGeometry = new Three.BoxGeometry(.25 * width, height, thickness);
  var shortDoor = new Three.Mesh(ShortDoorGeometry, boxMaterials);
  shortDoor.position.x += width * 0.25;
  shortDoor.position.z += thickness / 10;
  door_double.add(shortDoor);

  var handle = makeHandle(width);
  handle.position.set(width / 20, height / 40, thickness / 2 + thickness / 10);
  handle.rotation.z += Math.PI;
  handle.rotation.x += Math.PI / 2;
  door_double.add(handle);

  var handleBase = makeHandleBase();
  handleBase.position.set(width / 20, 0, thickness / 2);
  handleBase.rotation.x = 0;
  door_double.add(handleBase);

  var handle2 = makeHandle(width);
  handle2.position.set(width / 20, height / 40, -thickness / 2 - thickness / 10);
  handle2.rotation.z += Math.PI;
  handle2.rotation.x -= Math.PI / 2;
  door_double.add(handle2);

  var handleBase2 = makeHandleBase();
  handleBase2.position.set(width / 20, 0, -thickness / 2);
  handleBase2.rotation.x = 0;
  door_double.add(handleBase2);

  return door_double;
}

function makeHandle(width) {

  var handle = new Three.Object3D();
  var geometry_p1 = new Three.CylinderGeometry(width / 100, width / 100, width / 32.5, Math.round(32));
  var geometry_p2 = new Three.SphereGeometry(width / 100, Math.round(32), Math.round(32));
  var geometry_p3 = new Three.CylinderGeometry(width / 100, width / 100, width / 14.5, Math.round(32));
  var p1 = new Three.Mesh(geometry_p1, black);
  var p2 = new Three.Mesh(geometry_p2, black);
  var p3 = new Three.Mesh(geometry_p3, black);
  var p4 = new Three.Mesh(geometry_p2, black);
  p3.rotation.z = Math.PI / 2;
  p3.position.x = width / 14.5 / 2;
  p2.position.y = -width / 32.5 / 2;
  p4.position.y = -width / 14.5 / 2;
  p3.add(p4);
  p2.add(p3);
  p1.add(p2);
  handle.add(p1);

  return handle;
}

function makeHandleBase() {

  var handleBase = new Three.Object3D();
  var geometryBase1 = new Three.BoxGeometry(7.6, 28, 2);
  var geometryBase2 = new Three.CylinderGeometry(3.6, 3.6, 2, Math.round(32));
  var lock = makeLock();
  var handleBase1 = new Three.Mesh(geometryBase1, black);
  var handleBase2 = new Three.Mesh(geometryBase2, black);
  lock.rotation.x = Math.PI / 2;
  lock.position.y = -3;
  handleBase2.rotation.x = Math.PI / 2;
  handleBase2.position.y = -3.3;
  handleBase2.scale.z = 1.5;
  handleBase1.add(lock);
  handleBase1.add(handleBase2);
  handleBase.add(handleBase1);

  return handleBase;
}

function makeLock() {

  var lock = new Three.Object3D();
  var LockGeometry1 = new Three.CylinderGeometry(1.5, 1.5, 4, Math.round(32));
  var lockGeometry2 = new Three.BoxGeometry(1.6, 4, 4);
  var lockGeometry3 = new Three.BoxGeometry(1.4, 4.06, 0.36);
  var lock_p1 = new Three.Mesh(LockGeometry1, metalBlue);
  var lock_p2 = new Three.Mesh(lockGeometry2, metalBlue);
  var lock_p3 = new Three.Mesh(lockGeometry3, grey);
  lock_p2.position.z = 1;
  lock_p1.add(lock_p2);
  lock_p1.add(lock_p3);
  lock.add(lock_p1);

  return lock;
}

export default {
  name: 'double door',
  prototype: 'holes',

  info: {
    tag: ['door'],
    title: 'double door',
    description: 'iron door',
    image: require('./door_double.png')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 200,
        unit: 'cm'
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 215,
        unit: 'cm'
      }
    },
    thickness: {
      label: 'thickness',
      type: 'length-measure',
      defaultValue: {
        length: 30,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    flip_horizontal: {
      label: 'flip',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes': true
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var STYLE_HOLE_BASE = { stroke: '#ff0000', strokeWidth: '3px', fill: '#ff0000' };
    var STYLE_HOLE_SELECTED = { stroke: '#ff0000', strokeWidth: '4px', fill: '#ff0000', cursor: 'move' };
    var STYLE_ARC_BASE = { stroke: '#ff0000', strokeWidth: '3px', strokeDasharray: '5,5', fill: 'none' };
    var STYLE_ARC_SELECTED = { stroke: '#ff0000', strokeWidth: '4px', strokeDasharray: '5,5', fill: 'none', cursor: 'move' };

    var epsilon = 3;
    var flip = element.properties.get('flip_horizontal');
    var holeWidth = element.properties.get('width').get('length');
    var holePath = 'M' + 0 + ' ' + -epsilon + '  L' + holeWidth + ' ' + -epsilon + '  L' + holeWidth + ' ' + epsilon + '  L' + 0 + ' ' + epsilon + '  z';
    var arcPath = 'M' + 0 + ',' + 0 + '  A' + holeWidth / 4 + ',' + holeWidth / 4 + ' 0 0,1 ' + holeWidth / 4 + ',' + holeWidth / 4;
    var arcPath2 = 'M' + 0 + ',' + 0 + '  A' + (holeWidth / 2 + holeWidth / 4) + ',' + (holeWidth / 2 + holeWidth / 4) + ' 0 0,0 ' + (holeWidth / 2 + holeWidth / 4) + ',' + (holeWidth / 2 + holeWidth / 4);
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    var arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    var length = element.properties.get('width').get('length');

    if (flip) {
      return React.createElement(
        'g',
        { transform: 'translate(' + -element.properties.get('width').get('length') / 2 + ', 0)' },
        React.createElement('path', { key: '1', d: arcPath, style: arcStyle, transform: 'translate(' + 0 + ',' + -holeWidth / 4 + ')' }),
        React.createElement('line', { key: '2', x1: 0, y1: 0 - epsilon, x2: 0, y2: -holeWidth / 4 - epsilon, style: holeStyle }),
        React.createElement('path', { key: '3', d: arcPath2, style: arcStyle, transform: 'translate(' + holeWidth + ',' + (-holeWidth / 2 - holeWidth / 4) + ') rotate(90)' }),
        React.createElement('line', { key: '4', x1: holeWidth, y1: 0 - epsilon, x2: holeWidth, y2: -holeWidth / 2 - holeWidth / 4 - epsilon, style: holeStyle }),
        React.createElement('path', { key: '5', d: holePath, style: holeStyle })
      );
    } else {
      return React.createElement(
        'g',
        { transform: 'translate(' + -element.properties.get('width').get('length') / 2 + ', 0)' },
        React.createElement('path', { key: '1', d: arcPath, style: arcStyle, transform: 'translate(' + holeWidth + ',' + holeWidth / 4 + ') rotate(180)' }),
        React.createElement('line', { key: '2', x1: 0, y1: 0 - epsilon, x2: 0, y2: holeWidth / 2 + holeWidth / 4 - epsilon, style: holeStyle }),
        React.createElement('path', { key: '3', d: arcPath2, style: arcStyle, transform: 'translate(' + 0 + ',' + (holeWidth / 2 + holeWidth / 4) + ') rotate(270)' }),
        React.createElement('line', { key: '4', x1: holeWidth, y1: 0 - epsilon, x2: holeWidth, y2: holeWidth / 4 - epsilon, style: holeStyle }),
        React.createElement('path', { key: '5', d: holePath, style: holeStyle })
      );
    }
  },

  render3D: function render3D(element, layer, scene) {

    var flip = element.properties.get('flip_horizontal');
    var width = element.properties.get('width').get('length');
    var height = element.properties.get('height').get('length');
    var thickness = element.properties.get('thickness').get('length');
    var newAltitude = element.properties.get('altitude').get('length');

    var door_double = new Three.Object3D();
    door_double.add(makeDoor(width, height, thickness).clone(width, height, thickness));

    var valuePosition = new Three.Box3().setFromObject(door_double);

    var deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    var deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    var deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    if (element.selected) {
      var bbox = new Three.BoxHelper(door_double, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      door_double.add(bbox);
    }

    if (flip) {
      door_double.rotation.y += Math.PI;
      door_double.position.x -= width / 4;
    }

    door_double.position.y += newAltitude;
    door_double.position.x += width / 8;
    door_double.scale.set(width / deltaX, height / deltaY, thickness / deltaZ);

    return Promise.resolve(door_double);
  }
};