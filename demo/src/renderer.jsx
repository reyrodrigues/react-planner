import React from "react";
import ReactDOM from "react-dom";
import ContainerDimensions from "react-container-dimensions";
import Immutable, { Map } from "immutable";
import immutableDevtools from "immutable-devtools";
import { createStore } from "redux";
import { Provider } from "react-redux";

import MyCatalog from "./catalog/mycatalog";

import ToolbarScreenshotButton from "./ui/toolbar-screenshot-button";

import { ReadySetPlan } from "../../src/ready-set-plan"; //react-planner // react-planner

//render
ReactDOM.render(<ReadySetPlan />, document.getElementById("app"));
