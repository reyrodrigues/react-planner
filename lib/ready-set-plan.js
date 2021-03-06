"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadySetPlan = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactContainerDimensions = require("react-container-dimensions");

var _reactContainerDimensions2 = _interopRequireDefault(_reactContainerDimensions);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _immutableDevtools = require("immutable-devtools");

var _immutableDevtools2 = _interopRequireDefault(_immutableDevtools);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _mycatalog = require("./custom/catalog/mycatalog");

var _mycatalog2 = _interopRequireDefault(_mycatalog);

var _reducer = require("./reducers/reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _reactPlanner = require("./react-planner");

var _reactPlanner2 = _interopRequireDefault(_reactPlanner);

var _export = require("./plugins/export");

var _export2 = _interopRequireDefault(_export);

var _models = require("./models");

var PlannerModels = _interopRequireWildcard(_models);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//define state
var AppState = (0, _immutable.Map)({
  "react-planner": new PlannerModels.State()
});

//define reducer
var reducer = function reducer(state, action) {
  state = state || AppState;
  state = state.update("react-planner", function (plannerState) {
    return (0, _reducer2.default)(plannerState, action);
  });
  return state;
};

var blackList = [];

//init store
var store = (0, _redux.createStore)(reducer, null, function (f) {
  return f;
});

var plugins = [_export2.default.Keyboard(), _export2.default.Autosave("react-planner_v0"), _export2.default.ConsoleDebugger()];

var toolbarButtons = [];

var ReadySetPlan = exports.ReadySetPlan = function ReadySetPlan() {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactContainerDimensions2.default,
      null,
      function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return _react2.default.createElement(_reactPlanner2.default, {
          catalog: _mycatalog2.default,
          width: width,
          height: height,
          plugins: plugins,
          toolbarButtons: [toolbarButtons],
          stateExtractor: function stateExtractor(state) {
            return state.get("react-planner");
          }
        });
      }
    )
  );
};