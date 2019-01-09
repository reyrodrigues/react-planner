import React from 'react';
import * as Three from 'three';

var black = new Three.MeshLambertMaterial({ color: 0x000000 });
var green = new Three.MeshLambertMaterial({ color: 0x348781 });
var red = new Three.MeshLambertMaterial({ color: 0xFF0000 });
var turquoise = new Three.MeshLambertMaterial({ color: 0x43C6DB, opacity: 0.7, transparent: true });
var metalBlue = new Three.MeshLambertMaterial({ color: 0xB7CEEC });
var darkGrey = new Three.MeshLambertMaterial({ color: 0x313131 });
var darkGrey2 = new Three.MeshLambertMaterial({ color: 0x212121 });
var metalBlueGrey = new Three.MeshLambertMaterial({ color: 0x566D7E });

function makePanicDoor() {

  var panicDoorDouble = new Three.Mesh();
  var doorLeft = makeDoorStructure();
  var doorRight = makeDoorStructure();
  var handle = makeHandle();
  var doorLeftPivot = makePivot();
  var doorRightPivot = makePivot();
  var safetyHandleLeft = makeSafetyHandle();
  var safetyHandleRight = makeSafetyHandle();
  var lock = makeLock();
  var doorLockLeft = makeDoorLock();
  var doorLockRight = makeDoorLock();
  lock.position.set(-0.05, -0.02, 0.03);
  handle.position.set(-0.47 / 2, 0.85 / 2, -0.03);
  doorLeftPivot.position.set(0.595 / 2, 0, -0.06 / 2);
  doorRightPivot.position.set(0.6 / 2, 0, 0.077 / 2);
  doorRight.rotation.y = Math.PI;
  doorRight.position.set(-0.35 / 2 - 0.084, 0, 0.0043);
  doorLeft.position.set(0.35 / 2 + 0.084, 0, -0.0043);
  safetyHandleLeft.position.set(0, 0.4, 0.06 / 2);
  safetyHandleRight.position.set(0, 0.4, -0.062 / 2);
  handle.add(lock);
  doorLeft.add(handle);
  doorLeft.add(safetyHandleLeft);
  doorRight.add(safetyHandleRight);
  doorLeft.add(doorLeftPivot);
  panicDoorDouble.add(doorLeft);
  doorRight.add(doorRightPivot);
  doorLeft.add(doorLockLeft);
  doorRight.add(doorLockRight);
  panicDoorDouble.add(doorRight);

  return panicDoorDouble;
}

function makeDoorLock() {

  var block = new Three.Object3D();
  var DoorLockGeometry1 = new Three.CylinderGeometry(0.012, 0.012, 1.905, Math.round(32));
  var DoorLockGeometry2 = new Three.CylinderGeometry(0.007, 0.007, 1.907, Math.round(32));
  var DoorLock1 = new Three.Mesh(DoorLockGeometry1, metalBlue);
  var DoorLock2 = new Three.Mesh(DoorLockGeometry2, metalBlueGrey);
  block.position.set(-0.275, 0.7 / 2, 0);
  block.scale.x = 1 / 1.3;
  DoorLock1.add(DoorLock2);
  block.add(DoorLock1);

  return block;
}

function makeLock() {

  var mechanism = new Three.Object3D();
  var BaseGeometry = new Three.BoxGeometry(0.01, 0.1, 0.02);
  var FirstBlockGeometry = new Three.BoxGeometry(0.01, 0.02, 0.01);
  var SecondBlockGeometry = new Three.BoxGeometry(0.006, 0.04, 0.008);
  var base = new Three.Mesh(BaseGeometry, metalBlue);
  var FirstBlock = new Three.Mesh(FirstBlockGeometry, metalBlueGrey);
  var SecondBlock = new Three.Mesh(SecondBlockGeometry, metalBlueGrey);
  FirstBlock.position.set(-0.008 / 2, 0.03, 0);
  SecondBlock.position.y = -0.05;
  FirstBlock.add(SecondBlock);
  base.add(FirstBlock);
  mechanism.add(base);

  return mechanism;
}

function makeSafetyHandle() {

  var handle = new Three.Object3D();
  var handleSupportGeometry = new Three.BoxGeometry(0.5, 0.1, 0.005);
  var PushButtonGeometry = new Three.CylinderGeometry(0.04, 0.04, 0.48, Math.round(32));
  var PushButtonCoverGeometry = new Three.CylinderGeometry(0.042, 0.042, 0.01, Math.round(32));
  var handleSupport = new Three.Mesh(handleSupportGeometry, black);
  var pushButton = new Three.Mesh(PushButtonGeometry, red);
  var pushButtonCover1 = new Three.Mesh(PushButtonCoverGeometry, black);
  var pushButtonCover2 = new Three.Mesh(PushButtonCoverGeometry, black);
  handleSupport.position.z = 0.005 / 2;
  pushButton.rotation.z = Math.PI / 2;
  pushButtonCover1.position.y = 0.48 / 2 + 0.01 / 2;
  pushButtonCover2.position.y = -0.48 / 2 - 0.01 / 2;
  pushButton.add(pushButtonCover1);
  pushButton.add(pushButtonCover2);
  handleSupport.add(pushButton);
  handle.add(handleSupport);

  return handle;
}

function makePivot() {

  var DoorPivot = new Three.Object3D();
  var DownPivotGeometry = new Three.CylinderGeometry(0.009, 0.009, 0.04, Math.round(32));
  var UpPivotGeometry = new Three.CylinderGeometry(0.01, 0.01, 0.04, Math.round(32));
  var downPivot1 = new Three.Mesh(DownPivotGeometry, green);
  var upPivot1 = new Three.Mesh(UpPivotGeometry, green);
  var downPivot2 = new Three.Mesh(DownPivotGeometry, green);
  var upPivot2 = new Three.Mesh(UpPivotGeometry, green);
  downPivot1.position.y = -0.4;
  upPivot1.position.y = 0.04;
  downPivot2.position.y = 1;
  upPivot2.position.y = 0.04;
  downPivot2.add(upPivot2);
  downPivot1.add(upPivot1);
  DoorPivot.add(downPivot2);
  DoorPivot.add(downPivot1);

  return DoorPivot;
}

function makeHandle() {

  var handle = new Three.Object3D();
  var handleBase = makeHandleBase();
  var hilt = makeHilt();
  hilt.rotation.x = Math.PI / 2;
  hilt.position.set(0, 0.04, -0.03 / 2 - 0.01 / 2);
  handle.add(handleBase);
  handle.add(hilt);
  handle.scale.set(1.1, 1.1, 1.1);

  return handle;
}

function makeHilt() {

  var hilt = new Three.Object3D();
  var GeometryPiece1 = new Three.CylinderGeometry(0.01, 0.01, 0.03, Math.round(32));
  var GeometryPiece2 = new Three.SphereGeometry(0.01, Math.round(32), Math.round(32));
  var GeometryPiece3 = new Three.CylinderGeometry(0.01, 0.01, 0.07, Math.round(32));
  var piece1 = new Three.Mesh(GeometryPiece1, black);
  var piece2 = new Three.Mesh(GeometryPiece2, black);
  var piece3 = new Three.Mesh(GeometryPiece3, black);
  var piece4 = new Three.Mesh(GeometryPiece2, black);
  piece3.rotation.z = Math.PI / 2;
  piece3.position.x = 0.07 / 2;
  piece2.position.y = -0.03 / 2;
  piece4.position.y = -0.07 / 2;
  piece3.add(piece4);
  piece2.add(piece3);
  piece1.add(piece2);
  hilt.add(piece1);

  return hilt;
}

function makeHandleBase() {

  var base = new Three.Object3D();
  var BaseGeometry1 = new Three.BoxGeometry(0.038, 0.14, 0.01);
  var BaseGeometry2 = new Three.CylinderGeometry(0.023, 0.023, 0.01, Math.round(32));
  var lock = makeLockKey();
  var base1 = new Three.Mesh(BaseGeometry1, black);
  var base2 = new Three.Mesh(BaseGeometry2, black);
  lock.rotation.x = Math.PI / 2;
  lock.position.y = -0.03;
  base2.rotation.x = Math.PI / 2;
  base2.position.y = -0.033;
  base2.scale.z = 1.5;
  base1.add(lock);
  base1.add(base2);
  base.add(base1);

  return base;
}

function makeLockKey() {

  var lock = new Three.Object3D();
  var geometryLock1 = new Three.CylinderGeometry(0.005, 0.005, 0.02, Math.round(32));
  var geometryLock2 = new Three.BoxGeometry(0.008, 0.02, 0.02);
  var geometryLock3 = new Three.BoxGeometry(0.007, 0.0203, 0.0018);
  var lockPiece1 = new Three.Mesh(geometryLock1, metalBlue);
  var lockPiece2 = new Three.Mesh(geometryLock2, metalBlue);
  var lockPiece3 = new Three.Mesh(geometryLock3, metalBlueGrey);
  lockPiece2.position.z = 0.01;
  lockPiece1.add(lockPiece2);
  lockPiece1.add(lockPiece3);
  lock.add(lockPiece1);

  return lock;
}

function makeDoorStructure() {

  var door = new Three.Object3D();
  var lowBaseDoorGeometry = new Three.BoxGeometry(0.6, 1.2, 0.01);
  var middleBaseDoorGeometry = new Three.BoxGeometry(0.2, 0.7, 0.01);
  var highBaseDoorGeometry = new Three.BoxGeometry(0.2, 0.2, 0.01);
  var BorderCoverDoorGeometry1 = new Three.CylinderGeometry(0.005, 0.005, 1.9, Math.round(32));
  var BorderCoverDoorGeometry2 = new Three.BoxGeometry(0.03, 1.9, 0.01);
  var MiddleDoorGeometry2 = new Three.BoxGeometry(0.2, 0.7, 0.06);
  var MiddleDoorGeometry1 = new Three.BoxGeometry(0.19, 0.7, 0.06);
  var HighDoorGeometry = new Three.BoxGeometry(0.2, 0.2, 0.06);
  var glassGeometry = new Three.BoxGeometry(0.2, 0.5, 0.05);
  var LowDoorGeometry = new Three.BoxGeometry(0.59, 1.2, 0.06);
  var glassCoverVertical = new Three.BoxGeometry(0.01, 0.52, 0.064);
  var glassCoverHorizontal = new Three.BoxGeometry(0.224, 0.01, 0.064);
  var lowCoverDoor = new Three.Mesh(lowBaseDoorGeometry, green);
  var middleDoor1 = new Three.Mesh(MiddleDoorGeometry1, green);
  var middleDoor2 = new Three.Mesh(MiddleDoorGeometry2, green);
  var baseDoor = new Three.Mesh(LowDoorGeometry, green);
  var middleCoverDoor1 = new Three.Mesh(middleBaseDoorGeometry, green);
  var middleCoverDoor2 = new Three.Mesh(middleBaseDoorGeometry, green);
  var highCoverDoor = new Three.Mesh(highBaseDoorGeometry, green);
  var highDoor = new Three.Mesh(HighDoorGeometry, green);
  var borderCoverDoor1 = new Three.Mesh(BorderCoverDoorGeometry1, green);
  var borderCoverDoor2 = new Three.Mesh(BorderCoverDoorGeometry2, green);
  var glass = new Three.Mesh(glassGeometry, turquoise);
  var glassVerticalCover1 = new Three.Mesh(glassCoverVertical, green);
  var glassVerticalCover2 = new Three.Mesh(glassCoverVertical, green);
  var glassHorizontalCover1 = new Three.Mesh(glassCoverHorizontal, green);
  var glassHorizontalCover2 = new Three.Mesh(glassCoverHorizontal, green);
  lowCoverDoor.position.set(-(0.6 - 0.59) / 2, 0, -0.05 / 2);
  middleCoverDoor1.position.set(-0.2, 1.2 / 2 + 0.7 / 2, 0);
  middleCoverDoor2.position.set(0.2, 1.2 / 2 + 0.7 / 2, 0);
  highCoverDoor.position.set(0, (0.5 + 0.2) / 2, -0.05 / 2);
  highDoor.position.set(0, (0.5 + 0.2) / 2, -0.05 / 2 + 0.05 / 2);
  glass.position.set(-0.01 / 2, 1.2 / 2 + 0.5 / 2, 0);
  middleDoor2.position.z = 0.05 / 2;
  middleDoor1.position.set(0.005, 0, 0.05 / 2);
  borderCoverDoor1.position.set(-0.6 / 2, 0.7 / 2, 0);
  glassVerticalCover1.position.x = 0.2 / 2 + 0.014 / 2;
  glassVerticalCover2.position.x = -0.2 / 2 - 0.014 / 2;
  glassHorizontalCover1.position.y = 0.5 / 2 + 0.014 / 2;
  glassHorizontalCover2.position.y = -0.5 / 2 - 0.014 / 2;
  borderCoverDoor2.position.set(0.02 / 2, 0, -0.01 / 2);
  borderCoverDoor1.add(borderCoverDoor2);
  glass.add(highCoverDoor);
  glass.add(glassVerticalCover1);
  glass.add(glassVerticalCover2);
  glass.add(glassHorizontalCover1);
  glass.add(glassHorizontalCover2);
  glass.add(highCoverDoor);
  glass.add(highDoor);
  baseDoor.add(glass);
  middleCoverDoor1.add(middleDoor1);
  middleCoverDoor2.add(middleDoor2);
  lowCoverDoor.add(borderCoverDoor1);
  lowCoverDoor.add(middleCoverDoor1);
  lowCoverDoor.add(middleCoverDoor2);
  baseDoor.add(lowCoverDoor);
  door.add(baseDoor);
  door.scale.x = 0.9;

  return door;
}

export default {
  name: 'double panic door',
  prototype: 'holes',

  info: {
    tag: ['door'],
    title: 'double panic door',
    description: 'iron door',
    image: require('./panicDoorDouble.png')
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
    var arcPath = 'M' + 0 + ',' + 0 + '  A' + holeWidth / 2 + ',' + holeWidth / 2 + ' 0 0,1 ' + holeWidth / 2 + ',' + holeWidth / 2;
    var arcPath2 = 'M' + 0 + ',' + 0 + '  A' + holeWidth / 2 + ',' + holeWidth / 2 + ' 0 0,0 ' + holeWidth / 2 + ',' + holeWidth / 2;
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    var arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    var length = element.properties.get('width').get('length');

    if (flip) {
      return React.createElement(
        'g',
        { transform: 'translate(' + -element.properties.get('width').get('length') / 2 + ', 0)' },
        React.createElement('path', { key: '1', d: arcPath, style: arcStyle, transform: 'translate(' + 0 + ',' + -holeWidth / 2 + ')' }),
        React.createElement('line', { key: '2', x1: 0, y1: 0 - epsilon, x2: 0, y2: -holeWidth / 2 - epsilon, style: holeStyle }),
        React.createElement('path', { key: '3', d: arcPath2, style: arcStyle, transform: 'translate(' + holeWidth + ',' + -holeWidth / 2 + ') rotate(90)' }),
        React.createElement('line', { key: '4', x1: holeWidth, y1: 0 - epsilon, x2: holeWidth, y2: -holeWidth / 2 - epsilon, style: holeStyle }),
        React.createElement('path', { key: '5', d: holePath, style: holeStyle })
      );
    } else {
      return React.createElement(
        'g',
        { transform: 'translate(' + -element.properties.get('width').get('length') / 2 + ', 0)' },
        React.createElement('path', { key: '1', d: arcPath, style: arcStyle, transform: 'translate(' + holeWidth + ',' + holeWidth / 2 + ') rotate(180)' }),
        React.createElement('line', { key: '2', x1: 0, y1: 0 - epsilon, x2: 0, y2: holeWidth / 2 - epsilon, style: holeStyle }),
        React.createElement('path', { key: '3', d: arcPath2, style: arcStyle, transform: 'translate(' + 0 + ',' + holeWidth / 2 + ') rotate(270)' }),
        React.createElement('line', { key: '4', x1: holeWidth, y1: 0 - epsilon, x2: holeWidth, y2: holeWidth / 2 - epsilon, style: holeStyle }),
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

    var panicDoorDouble = new Three.Object3D();
    panicDoorDouble.add(makePanicDoor().clone());

    var valuePosition = new Three.Box3().setFromObject(panicDoorDouble);

    var deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    var deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    var deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    if (element.selected) {
      var boundingBox = new Three.BoxHelper(panicDoorDouble, 0x99c3fb);
      boundingBox.material.linewidth = 5;
      boundingBox.renderOrder = 1000;
      boundingBox.material.depthTest = false;
      panicDoorDouble.add(boundingBox);
    }

    if (flip) panicDoorDouble.rotation.y += Math.PI;

    panicDoorDouble.position.y += newAltitude;
    panicDoorDouble.scale.set(width / deltaX, height / deltaY, thickness / deltaZ);

    return Promise.resolve(panicDoorDouble);
  }
};