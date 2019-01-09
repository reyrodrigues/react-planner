'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var WIDTH = 70;
var DEPTH = 100;
var HEIGHT = 100;

exports.default = {
  name: 'child chair desk',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'wood', 'metal'],
    title: 'child chair desk',
    description: 'child chair desk',
    image: require('./chairDesk.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var angle = element.rotation;

    if (angle > -180 && angle < 0) angle = 360;else angle = 0;

    var rect_style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH, style: rect_style }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0', transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + angle / 2 + ')',
          style: { textAnchor: 'middle', fontSize: '11px' } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var grey = new Three.MeshLambertMaterial({ color: 0xd9d7d7 });
    var red = new Three.MeshPhongMaterial({ color: 0xff0000 });
    var black = new Three.MeshPhongMaterial({ color: 0x000000 });

    var newAltitude = element.properties.get('altitude').get('length');

    var chairDesk = new Three.Object3D();

    var roundedRectShapeTable = new Three.Shape();

    var x = 0;
    var y = 0;
    var width = 1;
    var height = 1.2;
    var radius = 0.25;

    roundedRectShapeTable.moveTo(x, y + radius);
    roundedRectShapeTable.lineTo(x, y + height - radius);
    roundedRectShapeTable.quadraticCurveTo(x, y + height, x + radius, y + height);
    roundedRectShapeTable.lineTo(x + width - radius, y + height);
    roundedRectShapeTable.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    roundedRectShapeTable.lineTo(x + width, y + radius);
    roundedRectShapeTable.quadraticCurveTo(x + width, y, x + width - radius, y);
    roundedRectShapeTable.lineTo(x + radius, y);
    roundedRectShapeTable.quadraticCurveTo(x, y, x, y + radius);

    var extrudeSettingsTable = {
      steps: 2,
      depth: 0.1,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

    var tableGeometry = new Three.ExtrudeGeometry(roundedRectShapeTable, extrudeSettingsTable);
    var table = new Three.Mesh(tableGeometry, red);

    table.position.set(0, 1.2, 0);
    table.rotation.x += Math.PI / 2;
    chairDesk.add(table);

    var baseGeometry = new Three.CylinderGeometry(0.08, 0.08, 1, 32);
    var baseVerticalGeometry = new Three.CylinderGeometry(0.08, 0.08, .6, 32);
    var unionGeometry = new Three.CylinderGeometry(0.08, 0.08, .2, 32);
    var footGeometry = new Three.CylinderGeometry(0.06, 0.06, .025, 32);
    var closureGeometry = new Three.CylinderGeometry(0.08, 0.08, .02, 32);

    var basePiece1 = new Three.Mesh(baseGeometry, grey);
    basePiece1.rotation.x += Math.PI / 2;
    basePiece1.position.set(0.5, 0.6, 0.6);
    table.add(basePiece1);

    var basePiece2 = new Three.Mesh(baseGeometry, grey);
    basePiece2.position.set(0.5, 0.6, 1.1);
    table.add(basePiece2);

    var basePiece3 = new Three.Mesh(baseGeometry, grey);
    basePiece3.rotation.z += Math.PI / 2;
    basePiece3.position.set(0, 0.6, 1.1);
    table.add(basePiece3);

    var baseVerticalPiece = new Three.Mesh(baseVerticalGeometry, grey);
    baseVerticalPiece.rotation.x += Math.PI / 2;
    baseVerticalPiece.position.set(-0.5, 0.6, 0.8);
    table.add(baseVerticalPiece);

    var unionPiece = new Three.Mesh(unionGeometry, grey);
    unionPiece.position.set(-0.5, 0.6, 1.1);
    table.add(unionPiece);

    var foot1 = new Three.Mesh(footGeometry, black);
    foot1.position.set(0.5, 0.2, 1.18);
    foot1.rotation.x += Math.PI / 2;
    table.add(foot1);

    var foot2 = new Three.Mesh(footGeometry, black);
    foot2.position.set(0.5, 1, 1.18);
    foot2.rotation.x += Math.PI / 2;
    table.add(foot2);

    var foot3 = new Three.Mesh(footGeometry, black);
    foot3.position.set(-.9, 0, 1.18);
    foot3.rotation.x += Math.PI / 2;
    table.add(foot3);

    var foot4 = new Three.Mesh(footGeometry, black);
    foot4.position.set(-.9, 1.2, 1.18);
    foot4.rotation.x += Math.PI / 2;
    table.add(foot4);

    var closurePiece1 = new Three.Mesh(closureGeometry, grey);
    closurePiece1.position.set(-1, 0, 1.1);
    closurePiece1.rotation.z += Math.PI / 2;
    table.add(closurePiece1);

    var closurePiece2 = new Three.Mesh(closureGeometry, grey);
    closurePiece2.position.set(-1, 1.2, 1.1);
    closurePiece2.rotation.z += Math.PI / 2;
    table.add(closurePiece2);

    var curve = new Three.CatmullRomCurve3([new Three.Vector3(.35, 0, 0), new Three.Vector3(0, 0, 0), new Three.Vector3(-.05, .25, 0)]);

    var barGeometry = new Three.TubeGeometry(curve, 32, 0.03, 16, false);
    var leftBar = new Three.Mesh(barGeometry, grey);
    leftBar.rotation.x -= Math.PI / 2;
    leftBar.position.set(-1, .35, .48);
    table.add(leftBar);

    var rightBar = new Three.Mesh(barGeometry, grey);
    rightBar.position.set(-1, .85, .48);
    rightBar.rotation.x -= Math.PI / 2;
    table.add(rightBar);

    var baseCurvedGeometry = new Three.TorusGeometry(.5, .08, 32, 32, Math.PI / 2);
    var baseCurvePiece1 = new Three.Mesh(baseCurvedGeometry, grey);
    baseCurvePiece1.position.set(-1, .70, 1.1);
    table.add(baseCurvePiece1);

    var baseCurvePiece2 = new Three.Mesh(baseCurvedGeometry, grey);
    baseCurvePiece2.rotation.x += Math.PI;
    baseCurvePiece2.position.set(-1, .50, 1.1);
    table.add(baseCurvePiece2);

    var roundedRectShapeStairPiece1 = new Three.Shape();

    var x1 = 0;
    var y1 = 0;
    var width1 = .8;
    var height1 = .8;
    var radius1 = 0.25;

    roundedRectShapeStairPiece1.moveTo(x1, y1 + radius1);
    roundedRectShapeStairPiece1.lineTo(x1, y1 + height1 - radius1);
    roundedRectShapeStairPiece1.quadraticCurveTo(x1, y1 + height1, x1 + radius1, y1 + height1);
    roundedRectShapeStairPiece1.lineTo(x1 + width1 - radius1, y1 + height1);
    roundedRectShapeStairPiece1.quadraticCurveTo(x1 + width1, y1 + height1, x1 + width1, y1 + height1 - radius1);
    roundedRectShapeStairPiece1.lineTo(x1 + width1, y1 + radius1);
    roundedRectShapeStairPiece1.quadraticCurveTo(x1 + width1, y1, x1 + width1 - radius1, y1);
    roundedRectShapeStairPiece1.lineTo(x1 + radius1, y1);
    roundedRectShapeStairPiece1.quadraticCurveTo(x1, y1, x1, y1 + radius1);

    var extrudeSettingsStairPiece1 = {
      steps: 2,
      depth: 0.1,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

    var stairGeometryPiece1 = new Three.ExtrudeGeometry(roundedRectShapeStairPiece1, extrudeSettingsStairPiece1);
    var stairPiece1 = new Three.Mesh(stairGeometryPiece1, red);

    stairPiece1.position.set(-.9, .2, .45);
    table.add(stairPiece1);

    var roundedRectShapeStairPiece2 = new Three.Shape();

    var x2 = 0;
    var y2 = 0;
    var width2 = .8;
    var height2 = .8;
    var radius2 = 0.25;

    roundedRectShapeStairPiece2.moveTo(x2, y2 + radius2);
    roundedRectShapeStairPiece2.lineTo(x2, y2 + height2 - radius2);
    roundedRectShapeStairPiece2.quadraticCurveTo(x2, y2 + height2, x2 + radius2, y2 + height2);
    roundedRectShapeStairPiece2.lineTo(x2 + width2 - radius2, y2 + height2);
    roundedRectShapeStairPiece2.quadraticCurveTo(x2 + width2, y2 + height2, x2 + width2, y2 + height2 - radius2);
    roundedRectShapeStairPiece2.lineTo(x2 + width2, y2 + radius2);
    roundedRectShapeStairPiece2.quadraticCurveTo(x2 + width2, y2, x2 + width2 - radius2, y2);
    roundedRectShapeStairPiece2.lineTo(x2 + radius2, y2);
    roundedRectShapeStairPiece2.quadraticCurveTo(x2, y2, x2, y2 + radius2);

    var holePath = new Three.Path();
    holePath.moveTo(3.5, 3.5);
    holePath.absellipse(.65, .4, .035, .125, .125, Math.PI * 2, false);
    roundedRectShapeStairPiece2.holes.push(holePath);

    var stairGeometryPiece2 = new Three.ExtrudeGeometry(roundedRectShapeStairPiece2, extrudeSettingsStairPiece1);
    var stairPiece2 = new Three.Mesh(stairGeometryPiece2, red);
    stairPiece2.position.set(-1.08, .2, .45);
    stairPiece2.rotation.y += Math.PI / 2;
    table.add(stairPiece2);

    var value = new Three.Box3().setFromObject(chairDesk);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    if (element.selected) {
      var boundingBox = new Three.BoxHelper(chairDesk, 0x99c3fb);
      boundingBox.material.linewidth = 5;
      boundingBox.renderOrder = 1000;
      boundingBox.material.depthTest = false;
      chairDesk.add(boundingBox);
    }

    chairDesk.rotation.y += Math.PI / 2;
    chairDesk.position.x += -DEPTH / 2.75;
    chairDesk.scale.set(WIDTH / deltaZ, HEIGHT / deltaY, 1.25 * DEPTH / deltaX);

    return Promise.resolve(chairDesk);
  }

};