import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.emailInput.value.trim();
    let password = this.passwordInput.value.trim();

    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password.' });
      } else {
        this.setState({ error: '' });
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Short Lnk</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input
            type="email"
            ref={input => {
              this.emailInput = input;
            }}
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            ref={input => {
              this.passwordInput = input;
            }}
            name="password"
            placeholder="Password"
          />
          <button>Login</button>
        </form>

        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
}
