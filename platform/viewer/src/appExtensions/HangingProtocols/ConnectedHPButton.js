import { HPButton } from './HPButton';
import OHIF from '@ohif/core';
import { connect } from 'react-redux';

const { setLayout, setViewportActive } = OHIF.redux.actions;

const mapStateToProps = state => {
  return {
    currentLayout: state.viewports.layout,
    activeViewportIndex: state.viewports.activeViewportIndex,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: Change if layout switched becomes more complex
    onChange: (selectedHP, currentLayout, activeViewportIndex) => {
      const viewports = [];
      const numRows = selectedHP.row + 1;
      const numColumns = selectedHP.col + 1;
      const numViewports = numRows * numColumns;

      for (let i = 0; i < numViewports; i++) {
        // Hacky way to allow users to exit MPR "mode"
        const viewport = currentLayout.viewports[i];
        let plugin = viewport && viewport.plugin;
        if (viewport && viewport.vtk) {
          plugin = 'cornerstone';
        }
        viewports.push({
          plugin,
        });
      }
      const layout = {
        numRows,
        numColumns,
        viewports,
      };

      const maxActiveIndex = numViewports - 1;
      if (activeViewportIndex > maxActiveIndex) {
        dispatch(setViewportActive(0));
      }

      dispatch(setLayout(layout));
    },
  };
};

const mergeProps = (propsFromState, propsFromDispatch) => {
  const onChangeFromDispatch = propsFromDispatch.onChange;
  const { currentLayout, activeViewportIndex } = propsFromState;

  return {
    onChange: selectedHP =>
      onChangeFromDispatch(selectedHP, currentLayout, activeViewportIndex),
  };
};

const ConnectedHPButton = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(HPButton);

export default ConnectedHPButton;
