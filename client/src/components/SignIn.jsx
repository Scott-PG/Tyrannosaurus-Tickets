import React, { Component } from "react";
import { signIn } from "../services/user";
import "./SignUpSignIn.css";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      isError: false,
      errorMsg: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: "",
    });
  };

  setSignInToggleFalse = () => {
    const { signInToggleFalse } = this.props;
    signInToggleFalse();
  };

  onSignIn = (event) => {
    event.preventDefault();

    const { setUser } = this.props;

    signIn(this.state)
      .then((res) => {
        console.log(res.user);
        setUser(res.user);
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          isError: true,
          errorMsg: "Invalid Credentials",
          username: "",
          password: "",
        });
      });
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
        <button type="submit" className="submit-button">
          Sign In
        </button>
      );
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="form-container">
        <form className="sign-in-form" onSubmit={this.onSignIn}>
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={username}
            placeholder="Enter Username"
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
          {this.renderError()}
        </form>
        <button
          className="sign-switch-text"
          onClick={this.setSignInToggleFalse}
        >
          Don't have an account? Sign Up
        </button>
      </div>
    );
  }
}

export default SignIn;
