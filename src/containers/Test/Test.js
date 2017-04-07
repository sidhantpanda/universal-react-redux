import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { TestComponent } from '../../components';
import { test } from '../../redux/modules/testReducer';

@connect(
  () => ({}),
  {test})
export default class Test extends Component {
  static propTypes = {
    test: PropTypes.func,
  }

  handleClick = () => {
    this.props.test();
  }

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <TestComponent />
        <button onClick={this.handleClick} >Click here!</button>
      </div>
    );
  }
}
