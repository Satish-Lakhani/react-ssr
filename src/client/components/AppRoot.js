import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

class AppRoot extends Component {
  render() {
    return(
      <div>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

export default AppRoot;
