import Protocol from '../classes/Protocol';
import ViewportStructure from '../classes/ViewportStructure';
import Viewport from '../classes/Viewport';
import Stage from '../classes/Stage';

function getDefaultProtocol() {
  const protocol = new Protocol('Default');
  protocol.id = 'defaultProtocol';
  protocol.locked = true;

  const nRows = 2;
  const nCols = 2;

  const oneByOne = new ViewportStructure('grid', {
    rows: nRows,
    columns: nCols,
  });

  const first = new Stage(oneByOne, 'oneByOne');
  const numViewports = nRows * nCols;
  for (let i = 0; i < numViewports; i++) {
    const viewport = new Viewport();
    first.viewports.push(viewport);
  }

  protocol.stages.push(first);

  return protocol;
}

const defaultProtocol = getDefaultProtocol();

export default defaultProtocol;
