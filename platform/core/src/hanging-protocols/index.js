import ProtocolEngine from './ProtocolEngine.js';
import { ProtocolStore, ProtocolStrategy } from './protocolStore';
import { addCustomAttribute } from './customAttributes';
import { addCustomViewportSetting } from './customViewportSettings';
import { LayoutManager } from './LayoutMananger';


const setEngine = (engine) => {
}

const hangingProtocols = {
  ProtocolEngine,
  ProtocolStore,
  ProtocolStrategy,
  addCustomAttribute,
  addCustomViewportSetting,
  setEngine,
  LayoutManager,
};

export default hangingProtocols;
