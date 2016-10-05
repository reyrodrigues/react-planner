"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Viewer2D;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSvgPanZoom = require('react-svg-pan-zoom');

var _constants = require('../../constants');

var _scene = require('./scene.jsx');

var _scene2 = _interopRequireDefault(_scene);

var _snap = require('./snap.jsx');

var _snap2 = _interopRequireDefault(_snap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mode2Tool(mode) {
  switch (mode) {
    case _constants.MODE_2D_PAN:
      return _reactSvgPanZoom.TOOL_PAN;
    case _constants.MODE_2D_ZOOM_IN:
      return _reactSvgPanZoom.TOOL_ZOOM_IN;
    case _constants.MODE_2D_ZOOM_OUT:
      return _reactSvgPanZoom.TOOL_ZOOM_OUT;
    default:
      return _reactSvgPanZoom.TOOL_NONE;
  }
}

function extractElementData(node) {
  while (!node.attributes.getNamedItem('data-element-root') && node.tagName !== 'svg') {
    node = node.parentNode;
  }
  if (node.tagName === 'svg') return null;

  return {
    layer: node.attributes.getNamedItem('data-layer').value,
    prototype: node.attributes.getNamedItem('data-prototype').value,
    selected: node.attributes.getNamedItem('data-selected').value === 'true',
    id: node.attributes.getNamedItem('data-id').value
  };
}

function Viewer2D(_ref, _ref2) {
  var scene = _ref.scene;
  var width = _ref.width;
  var height = _ref.height;
  var viewer2D = _ref.viewer2D;
  var mode = _ref.mode;
  var activeSnapElement = _ref.activeSnapElement;
  var snapElements = _ref.snapElements;
  var editingActions = _ref2.editingActions;
  var viewer2DActions = _ref2.viewer2DActions;
  var linesActions = _ref2.linesActions;
  var holesActions = _ref2.holesActions;
  var verticesActions = _ref2.verticesActions;
  var itemsActions = _ref2.itemsActions;


  var layerID = scene.selectedLayer;

  var mapCursorPosition = function mapCursorPosition(_ref3) {
    var x = _ref3.x;
    var y = _ref3.y;

    return { x: x, y: -y + scene.height };
  };

  var onClick = function onClick(event) {
    var _mapCursorPosition = mapCursorPosition(event);

    var x = _mapCursorPosition.x;
    var y = _mapCursorPosition.y;


    switch (mode) {
      case _constants.MODE_IDLE:
        var elementData = extractElementData(event.originalEvent.target);

        if (elementData && elementData.selected) return;

        switch (elementData ? elementData.prototype : 'none') {
          case 'areas':
            editingActions.selectArea(elementData.layer, elementData.id);
            break;

          case 'lines':
            editingActions.selectLine(elementData.layer, elementData.id);
            break;

          case 'holes':
            editingActions.selectHole(elementData.layer, elementData.id);
            break;

          case 'items':
            editingActions.selectItem(elementData.layer, elementData.id);
            break;

          case 'none':
            editingActions.unselectAll();
            break;
        }
        break;

      case _constants.MODE_WAITING_DRAWING_LINE:
        linesActions.beginDrawingLine(layerID, x, y);
        break;

      case _constants.MODE_DRAWING_LINE:
        linesActions.endDrawingLine(x, y);
        break;

      case _constants.MODE_DRAWING_HOLE:
        holesActions.endDrawingHole(layerID, x, y);
        break;

      case _constants.MODE_DRAWING_ITEM:
        itemsActions.endDrawingItem(layerID, x, y);
        break;
    }
  };

  var onMouseMove = function onMouseMove(event) {
    var _mapCursorPosition2 = mapCursorPosition(event);

    var x = _mapCursorPosition2.x;
    var y = _mapCursorPosition2.y;


    switch (mode) {
      case _constants.MODE_DRAWING_LINE:
        linesActions.updateDrawingLine(x, y);
        break;

      case _constants.MODE_DRAWING_HOLE:
        holesActions.updateDrawingHole(layerID, x, y);
        break;

      case _constants.MODE_DRAWING_ITEM:
        itemsActions.updateDrawingItem(layerID, x, y);
        break;

      case _constants.MODE_DRAGGING_LINE:
        linesActions.updateDraggingLine(x, y);
        break;

      case _constants.MODE_DRAGGING_VERTEX:
        verticesActions.updateDraggingVertex(x, y);
        break;
    }
  };

  var onMouseDown = function onMouseDown(event) {
    var _mapCursorPosition3 = mapCursorPosition(event);

    var x = _mapCursorPosition3.x;
    var y = _mapCursorPosition3.y;


    switch (mode) {
      case _constants.MODE_IDLE:

        var elementData = extractElementData(event.originalEvent.target);
        if (!(elementData && elementData.selected)) return;

        switch (elementData ? elementData.prototype : 'none') {
          case 'lines':
            linesActions.beginDraggingLine(elementData.layer, elementData.id, x, y);
            break;

          case 'vertices':
            verticesActions.beginDraggingVertex(elementData.layer, elementData.id, x, y);
            break;
        }
    }
  };

  var onMouseUp = function onMouseUp(event) {
    var _mapCursorPosition4 = mapCursorPosition(event);

    var x = _mapCursorPosition4.x;
    var y = _mapCursorPosition4.y;


    switch (mode) {
      case _constants.MODE_DRAGGING_LINE:
        linesActions.endDraggingLine(x, y);
        break;

      case _constants.MODE_DRAGGING_VERTEX:
        verticesActions.endDraggingVertex(x, y);
        break;
    }
  };

  var detectAutoPan = [_constants.MODE_DRAWING_LINE, _constants.MODE_DRAGGING_LINE, _constants.MODE_DRAGGING_VERTEX, _constants.MODE_DRAWING_LINE, _constants.MODE_DRAWING_HOLE, _constants.MODE_DRAWING_ITEM].includes(mode);

  var onChange = function onChange(event) {
    return viewer2DActions.updateCameraView(event.value);
  };

  activeSnapElement = activeSnapElement ? _react2.default.createElement(_snap2.default, { snap: activeSnapElement, width: scene.width, height: scene.height }) : null;
  // snapElements = snapElements.map((snap,id) => <Snap key={id} snap={snap} width={scene.width} height={scene.height}/>);
  snapElements = null; //only for debug purpose

  return _react2.default.createElement(
    _reactSvgPanZoom.Viewer,
    { value: viewer2D.isEmpty() ? null : viewer2D.toJS(), tool: mode2Tool(mode), width: width, height: height, detectAutoPan: detectAutoPan,
      onMouseMove: onMouseMove, onChange: onChange, onClick: onClick, onMouseDown: onMouseDown,
      onMouseUp: onMouseUp },
    _react2.default.createElement(
      'svg',
      { width: scene.width, height: scene.height, style: { cursor: "crosshair" } },
      _react2.default.createElement(
        'g',
        { transform: 'translate(0, ' + scene.height + ') scale(1, -1)' },
        _react2.default.createElement(_scene2.default, { scene: scene, mode: mode }),
        activeSnapElement,
        snapElements
      )
    )
  );
}

Viewer2D.propTypes = {
  mode: _react.PropTypes.string.isRequired,
  scene: _react.PropTypes.object.isRequired,
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  viewer2D: _react.PropTypes.object.isRequired,
  activeDrawingHelper: _react.PropTypes.object
};

Viewer2D.contextTypes = {
  viewer2DActions: _react.PropTypes.object.isRequired,
  editingActions: _react.PropTypes.object.isRequired,
  linesActions: _react.PropTypes.object.isRequired,
  holesActions: _react.PropTypes.object.isRequired,
  verticesActions: _react.PropTypes.object.isRequired,
  itemsActions: _react.PropTypes.object.isRequired
};