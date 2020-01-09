import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ConnectedBottomToolbar extends Component {

  static propTypes = {
    from: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
    children: PropTypes.node,
    height: PropTypes.string,
  };

  render() {
    const styles = this.props.height
      ? {
        maxHeight: this.props.height,
        color: 'white',
        marginRight: this.props.isOpen
          ? '0'
          : Number.parseInt(this.props.height) * -1,
      }
      : {};

    if (this.props.isHidden) {
      return (
        <div className={classNames('row-bottom-toolbar', 'is-hidden')}>
        </div>
      )
    } else {
      return (
        <div style={styles} className={classNames('row-bottom-toolbar', {
          'is-hidden': this.props.isHidden,
        })}>
          Hey! I am fucking awesome.
        {this.props.children}
        </div>
      )
    }
  }

}


export default ConnectedBottomToolbar;
