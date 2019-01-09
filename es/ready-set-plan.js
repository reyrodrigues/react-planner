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

var blackList = isProduction === true ? [] : ["UPDATE_MOUSE_COORDS", "UPDATE_ZOOM_SCALE", "UPDATE_2D_CAMERA"];

if (!isProduction) {
  console.info("Environment is in development and these actions will be blacklisted", blackList);
  console.info("Enable Chrome custom formatter for Immutable pretty print");
  immutableDevtools(Immutable);
}

//init store
var store = createStore(reducer, null, !isProduction && window.devToolsExtension ? window.devToolsExtension({
  features: {
    pause: true, // start/pause recording of dispatched actions
    lock: true, // lock/unlock dispatching actions and side effects
    persist: true, // persist states on page reloading
    export: true, // export history of actions in a file
    import: "custom", // import history of actions from a file
    jump: true, // jump back and forth (time travelling)
    skip: true, // skip (cancel) actions
    reorder: true, // drag and drop actions in the history list
    dispatch: true, // dispatch custom actions or action creators
    test: true // generate tests for the selected actions
  },
  actionsBlacklist: blackList,
  maxAge: 999999
}) : function (f) {
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