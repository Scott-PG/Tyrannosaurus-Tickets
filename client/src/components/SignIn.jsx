import React, { Component } from "react";
import { signIn } from "../services/user";

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

  onSignIn = (event) => {
    event.preventDefault();

    const { setUser } = this.props;

    signIn(this.state)
      .then((res) => {
        console.log(res.user);
        setUser(res.user);
      })
      // .then(() => history.push("/"))
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
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      );
    } else {
      return (
        <button type="submit" className="button">
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
          <h3>Sign In</h3>
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
      </div>
    );
  }
}

export default SignIn;
