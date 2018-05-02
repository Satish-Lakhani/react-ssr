import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  login() {
    console.log("Logging In...");
  }

  render() {
    return (
      <div className="text-center" style={{marginTop: '23%'}}>
        <div>
          <img src={require('../../../assets/img/test.png')} />
        </div>
      </div>
    );
  }
}
