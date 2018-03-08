import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
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

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be longer than 8 characters.'
      });
    }
    Accounts.createUser({ email, password }, err => {
      if (err) {
        // Show built-in Meteor error text to the screen, i.e. reason property
        this.setState({ error: err.reason });
      } else {
        // Clean up errors when successful.
        this.setState({ error: '' });
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Join Short Lnk</h1>
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
          <button>Create Account</button>
        </form>
        <Link to="/">Already have an account?</Link>
      </div>
    );
  }
}
