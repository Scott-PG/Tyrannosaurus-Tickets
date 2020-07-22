import React, { Component } from "react";
import { signUp, signIn } from "../services/user";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      userRealName: "",
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

    const { history, setUser } = this.props;

    signUp(this.state)
      .then(() => signIn(this.state))
      .then((res) => setUser(res.user))
      .then(() => history.push("/"))
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

  renderError = () => {
    const toggleForm = this.state.isError ? "danger" : "";
    if (this.state.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      );
    } else {
      return (
        <button className="button" type="submit">
          Sign Up
        </button>
      );
    }
  };

  render() {
    const {
      username,
      userRealName,
      password,
      passwordConfirmation,
    } = this.state;

    return (
      <div className="form-container">
        <div className="form-user-info">
          <form onSubmit={this.onSignUp}>
            <label>Username</label>
            <input
              required
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={this.handleChange}
            />
            <label>Given Name</label>
            <input
              required
              type="text"
              name="userRealName"
              value={userRealName}
              placeholder="Given Name"
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
            <label>Password Confirmation</label>
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
        </div>
      </div>
    );
  }
}

export default SignUp;
