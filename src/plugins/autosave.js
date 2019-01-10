const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import { loadProject } from '../actions/project-actions';

const TIMEOUT_DELAY = 100;

let timeout = null;

export default function autosave(autosaveKey, delay) {

  return (store, stateExtractor) => {

    delay = delay || TIMEOUT_DELAY;

    if (!autosaveKey) return;
    if (!localStorage) return;


    setInterval(() => {
      var state = stateExtractor(store.getState());
      localStorage.setItem(
        "react-planner-state",
        JSON.stringify(state.scene.toJS())
      );
    }, 200);

    //revert
    if (localStorage.getItem(autosaveKey) !== null) {
      let data = localStorage.getItem(autosaveKey);
      let json = JSON.parse(data);
      store.dispatch(loadProject(json));
    }

    //update
    store.subscribe(() => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        let state = stateExtractor(store.getState());
        localStorage.setItem(autosaveKey, JSON.stringify(state.scene.toJS()));
        /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
      }, delay);
    });
  };
}
