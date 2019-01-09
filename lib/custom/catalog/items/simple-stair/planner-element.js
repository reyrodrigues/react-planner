'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  name: "simple-stair",
  prototype: "items",

  info: {
    title: "simple stair",
    tag: ['building', 'stair'],
    description: "Simple stair",
    image: require('./simple-stair.png')
  },

  properties: {
    width: {
      label: "Width",
      type: "length-measure",
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    depth: {
      label: "Depth",
      type: "length-measure",
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    height: {
      label: "Height",
      type: "length-measure",
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    altitude: {
      label: "Altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var newWidth = (0, _convertUnits2.default)(element.properties.get('width').get('length')).from(element.properties.get('width').get('unit')).to(scene.unit);

    var newDepth = (0, _convertUnits2.default)(element.properties.get('depth').get('length')).from(element.properties.get('depth').get('unit')).to(scene.unit);

    var angle = element.rotation + 90;
    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    var style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce" };
    var arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: "2px", fill: "#84e1ce" };

    return _react2.default.createElement(
      'g',
      { transform: 'translate(' + -newWidth / 2 + ',' + -newDepth / 2 + ')' },
      _react2.default.createElement('rect', { key: '1', x: '0', y: '0', width: newWidth, height: newDepth, style: style }),
      _react2.default.createElement('line', { key: '2', x1: newWidth / 2, x2: newWidth / 2, y1: newDepth, y2: newDepth + 30, style: arrow_style }),
      _react2.default.createElement('line', { key: '3', x1: .35 * newWidth, x2: newWidth / 2, y1: newDepth + 15, y2: newDepth + 30, style: arrow_style }),
      _react2.default.createElement('line', { key: '4', x1: newWidth / 2, x2: .65 * newWidth, y1: newDepth + 30, y2: newDepth + 15, style: arrow_style }),
      _react2.default.createElement(
        'text',
        { key: '5', x: '0', y: '0',
          transform: 'translate(' + newWidth / 2 + ', ' + newDepth / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: "middle", fontSize: "11px" } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var loader = new Three.TextureLoader();
    var whitePaintTextureRepeatFactor = 1 / 20; // In a 100x100 area i want to repeat this texture 5x5 times

    var newWidth = (0, _convertUnits2.default)(element.properties.get('width').get('length')).from(element.properties.get('width').get('unit')).to(scene.unit);

    var newDepth = (0, _convertUnits2.default)(element.properties.get('depth').get('length')).from(element.properties.get('depth').get('unit')).to(scene.unit);

    var newHeight = (0, _convertUnits2.default)(element.properties.get('height').get('length')).from(element.properties.get('height').get('unit')).to(scene.unit);

    var newAltitude = (0, _convertUnits2.default)(element.properties.get('altitude').get('length')).from(element.properties.get('altitude').get('unit')).to(scene.unit);

    var stair = new Three.Object3D();

    // compute step dimensions with Blondel formula
    var a = 63 * newHeight / (newDepth + 2 * newHeight);
    var p = 63 - 2 * a;

    var numberOfSteps = Math.round(newHeight / a);
    var stepHeight = newHeight / numberOfSteps;
    var stepDepth = newDepth / numberOfSteps;
    var stepWidth = newWidth;

    // Build planes for every step
    var stepPlaneGeometry = new Three.PlaneGeometry(stepWidth, stepHeight);
    assignUVs(stepPlaneGeometry);
    var stepPlaneMaterial = new Three.MeshBasicMaterial({ side: Three.FrontSide });
    stepPlaneMaterial.map = loader.load(require('./textures/white-paint.jpg'));
    stepPlaneMaterial.needsUpdate = true;
    stepPlaneMaterial.map.wrapS = Three.RepeatWrapping;
    stepPlaneMaterial.map.wrapT = Three.RepeatWrapping;
    stepPlaneMaterial.map.repeat.set(stepWidth * whitePaintTextureRepeatFactor, stepHeight * whitePaintTextureRepeatFactor);

    // Build stair profile shape
    var starProfileShapePoints = [];

    for (var i = 0; i < numberOfSteps; i++) {
      starProfileShapePoints.push([(numberOfSteps - i) * stepDepth, i * stepHeight], [(numberOfSteps - i) * stepDepth, (i + 1) * stepHeight]);

      var stepPlane = new Three.Mesh(stepPlaneGeometry, stepPlaneMaterial);
      stepPlane.position.x += stepWidth / 2;
      stepPlane.position.z = (numberOfSteps - i) * stepDepth;
      stepPlane.position.y = i * stepHeight + stepHeight / 2;
      stair.add(stepPlane);

      var stepCover = buildStepCover(stepWidth, stepHeight, stepDepth);
      stepCover.position.y += stepHeight * i + stepHeight / 2;
      stepCover.position.z += (numberOfSteps - i) * stepDepth;

      stair.add(stepCover);
    }

    starProfileShapePoints.push([0, numberOfSteps * stepHeight], [0, (numberOfSteps - 1) * stepHeight], [(numberOfSteps - 1) * stepDepth, 0]);

    var stairShapeProfile = new Three.Shape();
    stairShapeProfile.moveTo(starProfileShapePoints[0][0], starProfileShapePoints[0][1]);
    for (var _i = 1; _i < starProfileShapePoints.length; _i++) {
      stairShapeProfile.lineTo(starProfileShapePoints[_i][0], starProfileShapePoints[_i][1]);
    }

    var stairShapeProfileGeometry = new Three.ShapeGeometry(stairShapeProfile);
    assignUVs(stairShapeProfileGeometry);
    var stairProfileMaterial = new Three.MeshPhongMaterial({ side: Three.FrontSide });

    stairProfileMaterial.map = loader.load(require('./textures/white-paint.jpg'));
    stairProfileMaterial.needsUpdate = true;
    stairProfileMaterial.map.wrapS = Three.RepeatWrapping;
    stairProfileMaterial.map.wrapT = Three.RepeatWrapping;
    stairProfileMaterial.map.repeat.set(numberOfSteps * stepDepth * whitePaintTextureRepeatFactor, numberOfSteps * stepHeight * whitePaintTextureRepeatFactor);

    var stairProfile = new Three.Mesh(stairShapeProfileGeometry, stairProfileMaterial);

    stairProfile.rotation.y = -Math.PI / 2;

    stair.add(stairProfile);

    var stairProfileMaterial2 = new Three.MeshPhongMaterial({ side: Three.BackSide });

    stairProfileMaterial2.map = loader.load(require('./textures/white-paint.jpg'));
    stairProfileMaterial2.needsUpdate = true;
    stairProfileMaterial2.map.wrapS = Three.RepeatWrapping;
    stairProfileMaterial2.map.wrapT = Three.RepeatWrapping;
    stairProfileMaterial2.map.repeat.set(numberOfSteps * stepDepth * whitePaintTextureRepeatFactor, numberOfSteps * stepHeight * whitePaintTextureRepeatFactor);

    var stairProfile2 = new Three.Mesh(stairShapeProfileGeometry, stairProfileMaterial2);

    stairProfile2.rotation.y = -Math.PI / 2;
    stairProfile2.position.x += newWidth;

    stair.add(stairProfile2);

    // Build closures for the stair

    /*** CLOSURE 1 ***/
    var closure1Slope = -Math.atan(stepDepth / stepHeight);
    var stairClosure1Width = newWidth;
    var stairClosure1Height = (numberOfSteps - 1) * stepHeight / Math.cos(closure1Slope);
    var stairClosure1Geometry = new Three.PlaneGeometry(stairClosure1Width, stairClosure1Height);

    var closure1Material = new Three.MeshPhongMaterial({ side: Three.BackSide });
    closure1Material.map = loader.load(require('./textures/white-paint.jpg'));
    closure1Material.needsUpdate = true;
    closure1Material.map.wrapS = Three.RepeatWrapping;
    closure1Material.map.wrapT = Three.RepeatWrapping;
    closure1Material.map.repeat.set(stairClosure1Width * whitePaintTextureRepeatFactor, stairClosure1Height * whitePaintTextureRepeatFactor);
    var stairClosure1 = new Three.Mesh(stairClosure1Geometry, closure1Material);
    var pivotClosure1 = new Three.Object3D();
    stairClosure1.position.y += stairClosure1Height / 2;
    pivotClosure1.add(stairClosure1);

    pivotClosure1.position.x = newWidth / 2;
    pivotClosure1.position.z = (numberOfSteps - 1) * stepDepth;

    pivotClosure1.rotation.x = closure1Slope;

    stair.add(pivotClosure1);

    /*** CLOSURE 2 ***/
    var closure2 = new Three.Mesh(stepPlaneGeometry, stepPlaneMaterial);
    closure2.rotation.y = Math.PI;
    closure2.position.x = stepWidth / 2;
    closure2.position.y = numberOfSteps * stepHeight - stepHeight / 2;
    stair.add(closure2);

    /*** CLOSURE 2 ***/
    var closure3Width = 0;
    var closure3Depth = 0;
    var stairClosure3Geometry = new Three.PlaneGeometry(stepWidth, stepDepth);
    var closure3 = new Three.Mesh(stairClosure3Geometry, stepPlaneMaterial);
    closure3.rotation.x = Math.PI / 2;
    closure3.position.x = stepWidth / 2;
    closure3.position.z = (numberOfSteps - 1) * stepDepth + stepDepth / 2;

    stair.add(closure3);

    if (element.selected) {
      var box = new Three.BoxHelper(stair, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      stair.add(box);
    }

    // Normalize the origin of the object
    var boundingBox = new Three.Box3().setFromObject(stair);

    var center = [(boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x, (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y, (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

    stair.position.x -= center[0];
    stair.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
    stair.position.z -= center[2];

    // I re-scale the stair following the initial attributes
    stair.scale.set(newWidth / (boundingBox.max.x - boundingBox.min.x), newHeight / (boundingBox.max.y - boundingBox.min.y), newDepth / (boundingBox.max.z - boundingBox.min.z));

    stair.position.y += newAltitude;

    return Promise.resolve(stair);
  }

};


function assignUVs(geometry) {
  geometry.computeBoundingBox();

  var max = geometry.boundingBox.max;
  var min = geometry.boundingBox.min;

  var offset = new Three.Vector2(0 - min.x, 0 - min.y);
  var range = new Three.Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = [];
  var faces = geometry.faces;

  for (var i = 0; i < geometry.faces.length; i++) {

    var v1 = geometry.vertices[faces[i].a];
    var v2 = geometry.vertices[faces[i].b];
    var v3 = geometry.vertices[faces[i].c];

    geometry.faceVertexUvs[0].push([new Three.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y), new Three.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y), new Three.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)]);
  }
  geometry.uvsNeedUpdate = true;
}

var buildStepCover = function buildStepCover(width, height, depth) {

  var loader = new Three.TextureLoader();

  var stepCoverHeight = 2;

  var stepCoverLength = 2;

  var planeGeometry = new Three.PlaneGeometry(width + stepCoverLength * 2, depth + stepCoverHeight);
  var planeMaterial = new Three.MeshBasicMaterial({ side: Three.FrontSide });
  assignUVs(planeGeometry);

  var planeGeometry2 = new Three.PlaneGeometry(depth + stepCoverLength, stepCoverHeight);
  assignUVs(planeGeometry2);

  var planeGeometry3 = new Three.PlaneGeometry(width + stepCoverLength * 2, stepCoverHeight);
  assignUVs(planeGeometry3);

  planeMaterial.map = loader.load(require('./textures/marble.jpg'));
  planeMaterial.needsUpdate = true;
  planeMaterial.map.wrapS = Three.RepeatWrapping;
  planeMaterial.map.wrapT = Three.RepeatWrapping;

  var plane = new Three.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;

  plane.position.x = width / 2;
  plane.position.z = -depth / 2;
  plane.position.y += height / 2 + stepCoverHeight;

  var plane2 = new Three.Mesh(planeGeometry2, planeMaterial);
  plane2.rotation.y = -Math.PI / 2;

  plane2.position.x -= stepCoverLength;
  plane2.position.y += height / 2 + stepCoverHeight / 2;
  plane2.position.z -= depth / 2;

  var plane3 = new Three.Mesh(planeGeometry, planeMaterial);
  plane3.rotation.x = Math.PI / 2;

  plane3.position.x = width / 2;
  plane3.position.z = -depth / 2;
  plane3.position.y += height / 2;

  var plane4 = new Three.Mesh(planeGeometry2, planeMaterial);
  plane4.rotation.y = Math.PI / 2;

  plane4.position.x += width + stepCoverLength;
  plane4.position.y += height / 2 + stepCoverHeight / 2;
  plane4.position.z -= depth / 2;

  var plane5 = new Three.Mesh(planeGeometry3, planeMaterial);

  plane5.position.x += width / 2;
  plane5.position.y += height / 2 + stepCoverHeight / 2;
  plane5.position.z += stepCoverLength / 2;

  var plane6 = new Three.Mesh(planeGeometry3, planeMaterial);

  plane6.rotation.y = Math.PI;

  plane6.position.x += width / 2;
  plane6.position.y += height / 2 + stepCoverHeight / 2;
  plane6.position.z -= depth + stepCoverLength / 2;

  var stepCover = new Three.Object3D();

  stepCover.add(plane);
  stepCover.add(plane2);
  stepCover.add(plane3);
  stepCover.add(plane4);
  stepCover.add(plane5);
  stepCover.add(plane6);

  return stepCover;
};