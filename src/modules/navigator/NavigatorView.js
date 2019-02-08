import React, { Component } from 'react';
import PropTypes from 'prop-types';


import AppNavigator from './Navigator';

class NavigatorView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <AppNavigator
      />
    );
  }
}

export default NavigatorView;
