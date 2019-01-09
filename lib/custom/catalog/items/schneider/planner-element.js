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

//color
var grey = new Three.MeshLambertMaterial({ color: 0xd3d3d3 });
var white = new Three.MeshLambertMaterial({ color: 0xf5f5f5 });
var darkGrey = new Three.MeshLambertMaterial({ color: 0x3d3d3d });
var black = new Three.MeshLambertMaterial({ color: 0x000000 });
var boxMaterials = [grey, darkGrey, grey, grey, grey, grey];
var boxMaterials2 = [grey, grey, grey, grey, grey, darkGrey];
var boxMaterials3 = [grey, grey, grey, grey, darkGrey, grey];

var textureLoader = new Three.TextureLoader();
var lcdTexture = textureLoader.load(require('./monitor.png'));

//dimensions
var width = 258;
var depth = 87;
var height = 195;
var filterWidth = 48;
var filterDepth = 10;
var filterHeight = 52;
var gridThickness = 3;

function makeObjectMaxLOD() {

  var schneider = new Three.Mesh();

  var gridVerticalElemGeometry = new Three.BoxGeometry(gridThickness / 2, filterHeight, filterDepth);
  var gridHorizontalElemGeometry = new Three.BoxGeometry(filterWidth, gridThickness, filterDepth);

  var filter = new Three.Object3D();

  for (var i = 0.25; i < 48; i += 3.32) {
    var gridVerticalElem = new Three.Mesh(gridVerticalElemGeometry, white);
    gridVerticalElem.position.x = i;
    gridVerticalElem.position.y = 26;
    filter.add(gridVerticalElem);
  }

  for (var _i = 0; _i < 52; _i += 7.4) {
    var gridHorizontalElem = new Three.Mesh(gridHorizontalElemGeometry, white);
    gridHorizontalElem.position.x = 23.5;
    gridHorizontalElem.position.y = _i;
    filter.add(gridHorizontalElem);
  }

  for (var k = 0; k <= 54; k += 46) {
    for (var j = 10; j < 240; j += 48) {
      var filterClone = filter.clone();
      filterClone.position.x += j;
      filterClone.position.y += k;
      filterClone.rotation.x -= Math.PI / 6;
      if (k === 0) filterClone.position.z += 18;else filterClone.position.z -= 10;
      schneider.add(filterClone);
    }
  }

  var panelSideElemGeometry = new Three.BoxGeometry(5, height, depth);
  var panelSideElemLeft = new Three.Mesh(panelSideElemGeometry, boxMaterials);
  panelSideElemLeft.rotation.y += Math.PI;
  schneider.add(panelSideElemLeft);

  var panelSideElemRight = new Three.Mesh(panelSideElemGeometry, boxMaterials);
  panelSideElemRight.position.x += 258;
  schneider.add(panelSideElemRight);

  var panelSideBackElemGeometry = new Three.BoxGeometry(width, height, 5);
  var panelSideElemBack = new Three.Mesh(panelSideBackElemGeometry, boxMaterials3);
  panelSideElemBack.position.x += 129;
  panelSideElemBack.position.z -= 43.5;
  schneider.add(panelSideElemBack);

  var boxElemGeometry = new Three.BoxGeometry(width / 3, height / 3, depth / 8);
  var boxElem = new Three.Mesh(boxElemGeometry, grey);
  boxElem.position.x += 212;
  boxElem.position.y += 65;
  boxElem.position.z += 35;
  schneider.add(boxElem);

  var panelSideFrontElemGeometry = new Three.BoxGeometry(width / 3, height, 5);
  var panelSideElemFront_P1 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P1.position.x += 43.5;
  panelSideElemFront_P1.position.z += 43.5;
  schneider.add(panelSideElemFront_P1);

  var panelSideElemFront_P2 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P2.position.x += 130;
  panelSideElemFront_P2.position.z += 43.5;
  schneider.add(panelSideElemFront_P2);

  var panelSideElemFront_P3 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P3.position.x += 217;
  panelSideElemFront_P3.position.z += 43.5;
  schneider.add(panelSideElemFront_P3);

  var planeGeometryFront = new Three.PlaneGeometry(width / 16, height / 12);
  var planeMaterialFront = new Three.MeshLambertMaterial({ map: lcdTexture, transparent: true, overdraw: true });

  var planeGeometryFront1 = new Three.PlaneGeometry(width / 8, height / 3);
  var panelBase = new Three.Mesh(planeGeometryFront1, darkGrey);
  panelBase.position.set(217, 65, 46.5);
  schneider.add(panelBase);

  var lcd = new Three.Mesh(planeGeometryFront, planeMaterialFront);
  lcd.position.set(217, 60, 46.55);
  schneider.add(lcd);

  var panelSideMiddleElemGeometry = new Three.BoxGeometry(width, 5, depth);
  var panelSideElemMiddle = new Three.Mesh(panelSideMiddleElemGeometry, grey);
  panelSideElemMiddle.position.x += 129;
  panelSideElemMiddle.position.y -= 10;
  schneider.add(panelSideElemMiddle);

  var panelSideElemFooter = new Three.Mesh(panelSideMiddleElemGeometry, black);
  panelSideElemFooter.position.x += 129;
  panelSideElemFooter.position.y -= 97.5;
  schneider.add(panelSideElemFooter);

  return schneider;
}

function makeObjectMinLOD() {

  var schneider = new Three.Mesh();

  var gridVerticalElemGeometry = new Three.BoxGeometry(gridThickness / 2, filterHeight, filterDepth);
  var gridHorizontalElemGeometry = new Three.BoxGeometry(filterWidth, gridThickness, filterDepth);

  var filter = new Three.Object3D();

  for (var i = 0.25; i < 48; i += 3.32) {
    var gridVerticalElem = new Three.Mesh(gridVerticalElemGeometry, white);
    gridVerticalElem.position.x = i;
    gridVerticalElem.position.y = 26;
    filter.add(gridVerticalElem);
  }

  for (var _i2 = 0; _i2 < 52; _i2 += 7.4) {
    var gridHorizontalElem = new Three.Mesh(gridHorizontalElemGeometry, white);
    gridHorizontalElem.position.x = 23.5;
    gridHorizontalElem.position.y = _i2;
    filter.add(gridHorizontalElem);
  }

  for (var k = 0; k <= 54; k += 46) {
    for (var j = 10; j < 240; j += 48) {
      var filterClone = filter.clone();
      filterClone.position.x += j;
      filterClone.position.y += k;
      filterClone.rotation.x -= Math.PI / 6;
      if (k === 0) filterClone.position.z += 18;else filterClone.position.z -= 10;
      schneider.add(filterClone);
    }
  }

  var panelSideElemGeometry = new Three.BoxGeometry(5, height, depth);
  var panelSideElemLeft = new Three.Mesh(panelSideElemGeometry, boxMaterials);
  panelSideElemLeft.rotation.y += Math.PI;
  schneider.add(panelSideElemLeft);

  var panelSideElemRight = new Three.Mesh(panelSideElemGeometry, boxMaterials);
  panelSideElemRight.position.x += 258;
  schneider.add(panelSideElemRight);

  var panelSideBackElemGeometry = new Three.BoxGeometry(width, height, 5);
  var panelSideElemBack = new Three.Mesh(panelSideBackElemGeometry, boxMaterials3);
  panelSideElemBack.position.x += 129;
  panelSideElemBack.position.z -= 43.5;
  schneider.add(panelSideElemBack);

  var boxElemGeometry = new Three.BoxGeometry(width / 3, height / 3, depth / 8);
  var boxElem = new Three.Mesh(boxElemGeometry, grey);
  boxElem.position.x += 212;
  boxElem.position.y += 65;
  boxElem.position.z += 35;
  schneider.add(boxElem);

  var panelSideFrontElemGeometry = new Three.BoxGeometry(width / 3, height, 5);
  var panelSideElemFront_P1 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P1.position.x += 43.5;
  panelSideElemFront_P1.position.z += 43.5;
  schneider.add(panelSideElemFront_P1);

  var panelSideElemFront_P2 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P2.position.x += 130;
  panelSideElemFront_P2.position.z += 43.5;
  schneider.add(panelSideElemFront_P2);

  var panelSideElemFront_P3 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P3.position.x += 217;
  panelSideElemFront_P3.position.z += 43.5;
  schneider.add(panelSideElemFront_P3);

  var planeGeometryFront = new Three.PlaneGeometry(width / 16, height / 12);
  var planeMaterialFront = new Three.MeshLambertMaterial({ map: lcdTexture, transparent: true, overdraw: true });

  var planeGeometryFront1 = new Three.PlaneGeometry(width / 8, height / 3);
  var panelBase = new Three.Mesh(planeGeometryFront1, darkGrey);
  panelBase.position.set(217, 65, 46.5);
  schneider.add(panelBase);

  var lcd = new Three.Mesh(planeGeometryFront, planeMaterialFront);
  lcd.position.set(217, 60, 46.55);
  schneider.add(lcd);

  var panelSideMiddleElemGeometry = new Three.BoxGeometry(width, 5, depth);
  var panelSideElemMiddle = new Three.Mesh(panelSideMiddleElemGeometry, grey);
  panelSideElemMiddle.position.x += 129;
  panelSideElemMiddle.position.y -= 10;
  schneider.add(panelSideElemMiddle);

  var panelSideElemFooter = new Three.Mesh(panelSideMiddleElemGeometry, black);
  panelSideElemFooter.position.x += 129;
  panelSideElemFooter.position.y -= 97.5;
  schneider.add(panelSideElemFooter);

  return schneider;
}

exports.default = {
  name: "schneider",
  prototype: "items",

  info: {
    tag: ['metal'],
    title: "schneider",
    description: "schneider",
    image: require('./schneider.png')
  },
  properties: {
    patternColor: {
      label: "pattern colori",
      type: "color",
      defaultValue: "#f5f4f4"
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

    var fillValue = element.selected ? "#99c3fb" : element.properties.get('patternColor');

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }
    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -width / 2 + ',' + -depth / 2 + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: width, height: depth,
        style: { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: fillValue } }),
      _react2.default.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + width / 2 + ', ' + depth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.get('name')
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /**************** LOD max ***********************/

    var rackMaxLOD = new Three.Object3D();

    var objectMaxLOD = makeObjectMaxLOD(width, height, depth);
    rackMaxLOD.add(objectMaxLOD.clone());
    rackMaxLOD.rotation.y = Math.PI;
    rackMaxLOD.position.x += width / 2;
    rackMaxLOD.position.y += height / 1.8 + newAltitude;

    /**************** LOD min ***********************/

    var rackMinLOD = new Three.Object3D();
    var objectMinLOD = makeObjectMinLOD(width, height, depth);
    rackMinLOD.add(objectMinLOD.clone());
    rackMinLOD.rotation.y = Math.PI;
    rackMinLOD.position.x += width / 2;
    rackMinLOD.position.y += height / 1.8 + newAltitude;

    /*** add all Level of Detail ***/

    var lod = new Three.LOD();

    lod.addLevel(rackMaxLOD, 100);
    lod.addLevel(rackMinLOD, 1800);
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