import React from "react";
import ContainerDimensions from "react-container-dimensions";
import Immutable, { Map } from "immutable";
import immutableDevtools from "immutable-devtools";
import { createStore } from "redux";
import { Provider } from "react-redux";
import MyCatalog from "./custom/catalog/mycatalog";
import PlannerReducer from "./reducers/reducer";
import ReactPlanner from "./react-planner";
import PlannerPlugins from "./plugins/export";
import * as PlannerModels from "./models";

//define state
var AppState = Map({
  "react-planner": new PlannerModels.State()
});

//define reducer
var reducer = function reducer(state, action) {
  state = state || AppState;
  state = state.update("react-planner", function (plannerState) {
    return PlannerReducer(plannerState, action);
  });
  return state;
};

var blackList = [];

//init store
var store = createStore(reducer, null, function (f) {
  return f;
});

var plugins = [PlannerPlugins.Keyboard(), PlannerPlugins.Autosave("react-planner_v0"), PlannerPlugins.ConsoleDebugger()];

var toolbarButtons = [];

export var ReadySetPlan = function ReadySetPlan() {
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(
      ContainerDimensions,
      null,
      function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return React.createElement(ReactPlanner, {
          catalog: MyCatalog,
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