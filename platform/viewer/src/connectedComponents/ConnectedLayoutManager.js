import OHIF from '@ohif/core';
import store from "../store";
import { commandsModule } from '@ohif/extension-cornerstone';

console.log("Reading redux actions")
const { setLayout, setViewportSpecificData, setViewportDisplaySettings } = OHIF.redux.actions;
console.log("Reading redux actions")

export default class LayoutManager {

  constructor() {
    this.commands = commandsModule({});
  }

  setLayout = (numRows, numColumns) => {

    if (numRows < 1 && numColumns < 1) {
      log.error(`Invalid layout ${numRows} x ${numColumns}`);
      return;
    }

    let viewports = [];
    const numViewports = numRows * numColumns;

    for (let i = 0; i < numViewports; i++) {
      viewports.push({});
    }
    store.dispatch(setLayout({ numRows, numColumns, viewports }));
  }

  setViewportSpecificData = (viewportIndex, viewportSpecificData) => {
    store.dispatch(setViewportSpecificData(viewportIndex, viewportSpecificData))
  }

  setDisplaySettings = (viewportIndex, displaySettings) => {
    console.log("Setting display settings", viewportIndex, displaySettings);
    store.dispatch(setViewportDisplaySettings(viewportIndex, displaySettings))
  }

};
