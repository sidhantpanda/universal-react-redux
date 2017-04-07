import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { loginLocal } from 'redux/modules/auth';
import { Grid, Form, Button } from 'semantic-ui-react';

@connect(
  state => ({
    loggingIn: state.auth.loggingIn,
    loggedIn: state.auth.loggedIn,
    loginError: state.auth.loginError,
    user: state.auth.user
  }),
  {loginLocal, pushState: push})
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    loggingIn: PropTypes.bool,
    loginError: PropTypes.object,
    loggedIn: PropTypes.bool,
    loginLocal: PropTypes.func,
    pushState: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loggingIn && nextProps.loggedIn && nextProps.user !== null) {
      // login success
      this.props.pushState('/');
    } else if (this.props.loggingIn && !nextProps.loggedIn && nextProps.user === null) {
      // Error, display error message
      alert('Error logging in. Please check if username and password are correct');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };

    this.props.loginLocal(user);
  }

  render() {
    return (
      <div>
        <Helmet title="Login"/>
        <Grid verticalAlign="middle" textAlign="left" centered>
          <Grid.Column width={6}>
            <Form size="large" onSubmit={this.handleSubmit}>

              <Form.Field>
                <label>Username</label>
                <input ref="username" placeholder="Username/Email" />
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input ref="password" placeholder="Password" type="password" />
              </Form.Field>

              <Button primary onSubmit={this.handleSubmit} type="submit">Login</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
