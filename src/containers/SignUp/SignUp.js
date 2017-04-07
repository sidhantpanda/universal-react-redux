import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { signUpLocal } from 'redux/modules/auth';
import { Grid, Form, Button } from 'semantic-ui-react';

@connect(
  state => ({
    signingUpLocal: state.auth.signingUpLocal,
    signedUpLocal: state.auth.signedUpLocal,
    signUpLocalError: state.auth.signUpLocalError,
  }),
  {signUpLocal, pushState: push})
export default class SignUp extends Component {
  static propTypes = {
    signingUpLocal: PropTypes.bool,
    signedUpLocal: PropTypes.bool,
    signUpLocalError: PropTypes.object,
    signUpLocal: PropTypes.func,
    pushState: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.signingUpLocal && nextProps.signedUpLocal) {
      // signup success
      this.props.pushState('/');
    } else if (this.props.signingUpLocal && nextProps.signUpLocalError) {
      // Error, display error message

    }
  }

  checkValidations = (user) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      alert('Please enter a valid email address');
      this.refs.email.focus();
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    if (this.checkValidations(user)) {
      this.props.signUpLocal(user);
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Sign Up"/>
        <Grid verticalAlign="middle" textAlign="left" centered>
          <Grid.Column width={6}>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Name</label>
                <input ref="name" placeholder="Name" />
              </Form.Field>

              <Form.Field>
                <label>Email</label>
                <input ref="email" placeholder="Email" />
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input ref="password" placeholder="Password" type="password" />
              </Form.Field>

              <Button primary onSubmit={this.handleSubmit} type="submit">Sign Up</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
