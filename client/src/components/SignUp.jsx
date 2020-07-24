import React, { Component } from "react";
import { signUp, signIn } from "../services/user";
import "./SignUpSignIn.css";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      user_real_name: "",
      password: "",
      passwordConfirmation: "",
      userPermissions: "user",
      isError: false,
      errorMsg: "",
    };
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: "",
    });

  onSignUp = (event) => {
    event.preventDefault();

    const { setUser } = this.props;

    signUp(this.state)
      .then(() => signIn(this.state))
      .then((res) => setUser(res.user))
      .catch((error) => {
        console.error(error);
        this.setState({
          email: "",
          password: "",
          passwordConfirmation: "",
          isError: true,
          errorMsg: "Sign Up Details Invalid",
        });
      });
  };

  setSignInToggleTrue = () => {
    const { signInToggleTrue } = this.props;
    signInToggleTrue();
  };

  renderError = () => {
    const toggleForm = this.state.isError ? "danger" : "";
    if (this.state.isError) {
      return (
        <button type="submit" className={`submit-button ${toggleForm}`}>
          {this.state.errorMsg}
        </button>
      );
    } else {
      return (
        <button className="submit-button" type="submit">
          Sign Up
        </button>
      );
    }
  };

  render() {
    const {
      username,
      user_real_name,
      password,
      passwordConfirmation,
    } = this.state;

    return (
      <div className="form-container">
        <form className="sign-in-form" onSubmit={this.onSignUp}>
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={this.handleChange}
          />
          <label>Full Name</label>
          <input
            required
            type="text"
            name="user_real_name"
            value={user_real_name}
            placeholder="Full Name"
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <label>Confirm Password</label>
          <input
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          {this.renderError()}
        </form>
        <button className="sign-switch-text" onClick={this.setSignInToggleTrue}>
          Have an account? Sign-In
        </button>
      </div>
    );
  }
}

export default SignUp;
