'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var Three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var black = new Three.MeshLambertMaterial({ color: 0x000000 });
var green = new Three.MeshLambertMaterial({ color: 0x348781 });
var red = new Three.MeshLambertMaterial({ color: 0xFF0000 });
var turquoise = new Three.MeshLambertMaterial({ color: 0x43C6DB, opacity: 0.7, transparent: true });
var metalBlue = new Three.MeshLambertMaterial({ color: 0xB7CEEC });
var darkGrey = new Three.MeshLambertMaterial({ color: 0x313131 });
var darkGrey2 = new Three.MeshLambertMaterial({ color: 0x212121 });
var metalBlueGrey = new Three.MeshLambertMaterial({ color: 0x566D7E });

var flip_value = void 0;
var handleSide_value = void 0;

function makePanicDoor(handleSide) {

  var panicDoor = new Three.Mesh();
  var leftDoor = makeDoorStructure();
  var handle = makeHandle(handleSide);
  var leftDoorPivot = makePivot();
  var rightDoorPivot = makePivot();
  var safetyHandleLeft = makeSafetyHandle();
  var safetyHandleRight = makeSafetyHandle();
  var hilt = makeLock();
  var doorLock = makeDoorLock();
  hilt.position.set(-0.05, -0.02, 0.03);
  handle.position.set(-0.47 / 2, 0.85 / 2, -0.03);

  if (handleSide) {
    leftDoorPivot.position.set(0.595 / 2, 0, -0.06 / 2);
  } else {
    leftDoorPivot.position.set(-0.595 / 2, 0, -0.06 / 2);
  }
  rightDoorPivot.position.set(0.6 / 2, 0, 0.077 / 2);
  safetyHandleLeft.position.set(0, 0.4, 0.06 / 2);
  safetyHandleRight.position.set(0, 0.4, -0.062 / 2);
  handle.add(hilt);
  leftDoor.add(handle);
  leftDoor.add(safetyHandleLeft);
  leftDoor.add(leftDoorPivot);
  panicDoor.add(leftDoor);
  leftDoor.add(doorLock);

  return panicDoor;
}

function makeDoorLock() {

  var DoorLock = new Three.Object3D();
  var doorLockGeometry1 = new Three.CylinderGeometry(0.012, 0.012, 1.905, Math.round(32));
  var doorLockGeometry2 = new Three.CylinderGeometry(0.007, 0.007, 1.907, Math.round(32));
  var doorLock1 = new Three.Mesh(doorLockGeometry1, metalBlue);
  var doorLock2 = new Three.Mesh(doorLockGeometry2, metalBlueGrey);
  DoorLock.position.set(-0.275, 0.7 / 2, 0);
  DoorLock.scale.x = 1 / 1.3;
  doorLock1.add(doorLock2);
  DoorLock.add(doorLock1);
  return DoorLock;
}

function makeLock() {

  var mechanism = new Three.Object3D();
  var BaseGeometry = new Three.BoxGeometry(0.01, 0.1, 0.02);
  var PieceGeometry1 = new Three.BoxGeometry(0.01, 0.02, 0.01);
  var PieceGeometry2 = new Three.BoxGeometry(0.006, 0.04, 0.008);
  var base = new Three.Mesh(BaseGeometry, metalBlue);
  var piece1 = new Three.Mesh(PieceGeometry1, metalBlueGrey);
  var piece2 = new Three.Mesh(PieceGeometry2, metalBlueGrey);
  piece1.position.set(-0.008 / 2, 0.03, 0);
  piece2.position.y = -0.05;
  piece1.add(piece2);
  base.add(piece1);
  mechanism.add(base);

  return mechanism;
}

function makeSafetyHandle() {

  var handle = new Three.Object3D();
  var HandleSupportGeometry = new Three.BoxGeometry(0.5, 0.1, 0.005);
  var PushGeometry = new Three.CylinderGeometry(0.04, 0.04, 0.48, Math.round(32));
  var CoverPushGeometry = new Three.CylinderGeometry(0.042, 0.042, 0.01, Math.round(32));
  var handleSupport = new Three.Mesh(HandleSupportGeometry, black);
  var PushButton = new Three.Mesh(PushGeometry, red);
  var CoverPush1 = new Three.Mesh(CoverPushGeometry, black);
  var CoverPush2 = new Three.Mesh(CoverPushGeometry, black);
  handleSupport.position.z = 0.005 / 2;
  PushButton.rotation.z = Math.PI / 2;
  CoverPush1.position.y = 0.48 / 2 + 0.01 / 2;
  CoverPush2.position.y = -0.48 / 2 - 0.01 / 2;
  PushButton.add(CoverPush1);
  PushButton.add(CoverPush2);
  handleSupport.add(PushButton);
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

function makeHandle(handleSide_value) {

  var handle = new Three.Object3D();
  var handleBase = makeHandleBase(handleSide_value);
  var hilt = makeHilt();
  hilt.rotation.x = Math.PI / 2;

  if (handleSide_value) {
    hilt.position.set(0, 0.04, -0.03 / 2 - 0.01 / 2);
  } else {
    hilt.position.set(0.4, 0.04, -0.03 / 2 - 0.01 / 2);
    hilt.rotation.y = Math.PI;
  }
  handle.add(handleBase);
  handle.add(hilt);
  handle.scale.set(1.1, 1.1, 1.1);
  return handle;
}

function makeHilt() {

  var hilt = new Three.Object3D();
  var Geometry_p1 = new Three.CylinderGeometry(0.01, 0.01, 0.03, Math.round(32));
  var Geometry_p2 = new Three.SphereGeometry(0.01, Math.round(32), Math.round(32));
  var Geometry_p3 = new Three.CylinderGeometry(0.01, 0.01, 0.07, Math.round(32));
  var piece1 = new Three.Mesh(Geometry_p1, black);
  var piece2 = new Three.Mesh(Geometry_p2, black);
  var piece3 = new Three.Mesh(Geometry_p3, black);
  var piece4 = new Three.Mesh(Geometry_p2, black);
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

function makeHandleBase(handleSide_value) {
  var base = new Three.Object3D();
  var BaseGeometry1 = new Three.BoxGeometry(0.038, 0.14, 0.01);
  var BaseGeometry2 = new Three.CylinderGeometry(0.023, 0.023, 0.01, Math.round(32));
  var lock = makeLockKey();
  var base1 = new Three.Mesh(BaseGeometry1, black);
  var base2 = new Three.Mesh(BaseGeometry2, black);
  lock.rotation.x = Math.PI / 2;
  base2.rotation.x = Math.PI / 2;
  lock.position.y = -0.03;
  base2.position.y = -0.033;
  if (!handleSide_value) base1.position.x = 0.4;
  base2.scale.z = 1.5;
  base1.add(lock);
  base1.add(base2);
  base.add(base1);
  return base;
}

function makeLockKey() {

  var Lock = new Three.Object3D();
  var geometry1 = new Three.CylinderGeometry(0.005, 0.005, 0.02, Math.round(32));
  var geometry2 = new Three.BoxGeometry(0.008, 0.02, 0.02);
  var geometry3 = new Three.BoxGeometry(0.007, 0.0203, 0.0018);
  var LockPiece1 = new Three.Mesh(geometry1, metalBlue);
  var LockPiece2 = new Three.Mesh(geometry2, metalBlue);
  var LockPiece3 = new Three.Mesh(geometry3, metalBlueGrey);
  LockPiece2.position.z = 0.01;
  LockPiece1.add(LockPiece2);
  LockPiece1.add(LockPiece3);
  Lock.add(LockPiece1);

  return Lock;
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
  door.scale.x = 1.3;
  return door;
}

exports.default = {
  name: 'panic door',
  prototype: 'holes',

  info: {
    tag: ['door'],
    title: 'panic door',
    description: 'iron door',
    image: require('./panicDoor.png')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 100,
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
      label: 'horizontal flip',
      type: 'checkbox',
      defaultValue: 'none',
      values: {
        'none': 'none',
        'yes': 'yes'
      }
    },
    flip_vertical: {
      label: 'vertical flip',
      type: 'checkbox',
      defaultValue: 'right',
      values: {
        'right': 'right',
        'left': 'left'
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
    var handleSide = element.properties.get('flip_vertical');
    var holeWidth = element.properties.get('width').get('length');
    var holePath = 'M' + 0 + ' ' + -epsilon + '  L' + holeWidth + ' ' + -epsilon + '  L' + holeWidth + ' ' + epsilon + '  L' + 0 + ' ' + epsilon + '  z';
    var arcPath = 'M' + 0 + ',' + 0 + '  A' + holeWidth + ',' + holeWidth + ' 0 0,1 ' + holeWidth + ',' + holeWidth;
    var holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    var arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    var length = element.properties.get('width').get('length');

    var scaleX = void 0,
        scaleY = void 0;
    var rotateAngle = void 0;
    var tX = void 0,
        tY = void 0;
    var pX1 = void 0,
        pX2 = void 0,
        pY1 = void 0,
        pY2 = void 0;

    flip ? flip_value = 'yes' : flip_value = 'none';
    handleSide ? handleSide_value = 'right' : handleSide_value = 'left';

    if (flip_value === 'yes') {
      scaleX = 1;
      if (handleSide_value === 'right') {
        tX = holeWidth;
        tY = -holeWidth;
        pX1 = -holeWidth;
        pY1 = 0;
        pX2 = -holeWidth;
        pY2 = holeWidth;
        rotateAngle = 180;
        scaleY = -1;
      } else {
        tX = 0;
        tY = -holeWidth;
        pX1 = 0;
        pY1 = 0;
        pX2 = 0;
        pY2 = -holeWidth;
        scaleY = 1;
        rotateAngle = 0;
      }
    } else if (flip_value === 'none') {
      scaleX = -1;
      if (handleSide_value === 'left') {
        tX = holeWidth;
        tY = 0;
        pX1 = 0;
        pY1 = 0;
        pX2 = 0;
        pY2 = -holeWidth;
        rotateAngle = -90;
        scaleY = -1;
      } else {
        tX = 0;
        tY = 0;
        pX1 = holeWidth;
        pY1 = 0;
        pX2 = holeWidth;
        pY2 = holeWidth;
        rotateAngle = 90;
        scaleY = 1;
      }
    }

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -element.properties.get('width').get('length') / 2 + ', 0)' },
      _react2.default.createElement('path', { key: '1', d: arcPath, style: arcStyle,
        transform: 'translate(' + tX + ',' + tY + ') scale(' + scaleX + ',' + scaleY + ') rotate(' + rotateAngle + ')' }),
      _react2.default.createElement('line', { key: '2', x1: pX1, y1: pY1 - epsilon, x2: pX2, y2: pY2 - epsilon, style: holeStyle,
        transform: 'scale(' + -scaleX + ',' + scaleY + ')' }),
      _react2.default.createElement('path', { key: '5', d: holePath, style: holeStyle })
    );
  },

  render3D: function render3D(element, layer, scene) {

    var flip = element.properties.get('flip_horizontal');
    var handleSide = element.properties.get('flip_vertical');
    var width = element.properties.get('width').get('length');
    var height = element.properties.get('height').get('length');
    var thickness = element.properties.get('thickness').get('length');
    var newAltitude = element.properties.get('altitude').get('length');

    var panicDoor = new Three.Object3D();
    panicDoor.add(makePanicDoor(handleSide).clone());

    if (element.selected) {
      var boundingBox = new Three.BoxHelper(panicDoor, 0x99c3fb);
      boundingBox.material.linewidth = 5;
      boundingBox.renderOrder = 1000;
      boundingBox.material.depthTest = false;
      panicDoor.add(boundingBox);
    }

    var valuePosition = new Three.Box3().setFromObject(panicDoor);

    var deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    var deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    var deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    if (flip) panicDoor.rotation.y += Math.PI;

    panicDoor.position.y += newAltitude;
    panicDoor.scale.set(width / deltaX, height / deltaY, thickness / deltaZ);

    return Promise.resolve(panicDoor);
  }
};