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
let AppState = Map({
  "react-planner": new PlannerModels.State()
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update("react-planner", plannerState =>
    PlannerReducer(plannerState, action)
  );
  return state;
};

let blackList = [];

//init store
let store = createStore(
  reducer,
  null,
  f => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger()
];

let toolbarButtons = [];

export const ReadySetPlan = () => (
  <Provider store={store}>
    <ContainerDimensions>
      {({ width, height }) => (
        <ReactPlanner
          catalog={MyCatalog}
          width={width}
          height={height}
          plugins={plugins}
          toolbarButtons={[toolbarButtons]}
          stateExtractor={state => state.get("react-planner")}
        />
      )}
    </ContainerDimensions>
  </Provider>
);
