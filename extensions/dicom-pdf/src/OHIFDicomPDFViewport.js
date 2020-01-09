import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OHIF from '@ohif/core';
import OHIFComponentPlugin from './OHIFComponentPlugin.js';
import DicomPDFViewport from './DicomPDFViewport';

const { DicomLoaderService } = OHIF.utils;

class OHIFDicomPDFViewport extends Component {

  _isMounted = false;

  static propTypes = {
    studies: PropTypes.object,
    displaySet: PropTypes.object,
    viewportIndex: PropTypes.number,
    viewportData: PropTypes.object,
    activeViewportIndex: PropTypes.number,
    setViewportActive: PropTypes.func,
  };

  state = {
    byteArray: null,
    error: null,
  };

  static id = 'DicomPDFViewportPDF';

  static init() {
    console.log('DicomPDFViewport init()');
  }

  static destroy() {
    console.log('DicomPDFViewport destroy()');
  }

  componentDidMount() {
    this._isMounted = true;
    const { displaySet, studies } = this.props.viewportData;
    /* This operation was leading to the warning:
    "Can't call setState (or forceUpdate) on an unmounted component. This is a no-op,"
    due to the promise resolving and calling setState after the component
    had already unmounted. For this reason we added the
    this._isMounted check.
    */
    DicomLoaderService.findDicomDataPromise(displaySet, studies).then(
      data => {
        if (this._isMounted) {
          this.setState({ byteArray: new Uint8Array(data) })
        }
      },
      error => {
        if (this._isMounted) {
          this.setState({ error });
        }
        throw new Error(error);
      }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      setViewportActive,
      viewportIndex,
      activeViewportIndex,
    } = this.props;
    const { byteArray, error } = this.state;
    const { id, init, destroy } = OHIFDicomPDFViewport;
    const pluginProps = { id, init, destroy };

    return (
      <OHIFComponentPlugin {...pluginProps}>
        {byteArray && (
          <DicomPDFViewport
            byteArray={byteArray}
            setViewportActive={setViewportActive}
            viewportIndex={viewportIndex}
            activeViewportIndex={activeViewportIndex}
          />
        )}
        {error && <h2>{JSON.stringify(error)}</h2>}
      </OHIFComponentPlugin>
    );
  }
}

export default OHIFDicomPDFViewport;
