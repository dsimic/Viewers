import React, { PureComponent } from 'react';


export class HPButton extends PureComponent {

  static defaultProps = {
    dropdownVisible: false,
  };

  static propTypes = {
    dropdownVisible: PropTypes.bool.isRequired,
    /** Called with the selectedCell number when grid sell is selected */
    onChange: PropTypes.func,
    /** The cell to show as selected */
    selectedHP: PropTypes.object,
  };

  state = {
    dropdownVisible: this.props.dropdownVisible,
  };

  componentDidUpdate(prevProps) {
    if (this.props.dropdownVisible !== prevProps.dropdownVisible) {
      this.setState({
        dropdownVisible: this.props.dropdownVisible,
      });
    }
  }

  onClick = () => {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible,
    });
  };

  onChange = selectedHP => {
    if (this.props.onChange) {
      this.props.onChange(selectedHP);
    }
  };
  render() {
    return (
      <div className="btn-group">
        <ToolbarButton
          isActive={this.state.dropdownVisible}
          label={'Layout'}
          icon="th"
          onClick={this.onClick}
        />
      </div>
    )
  }
}
