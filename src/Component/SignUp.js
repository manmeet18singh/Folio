import React from "react";
import LoginForm from "./LoginForm.js";
import "../App.css";
import "../css/signup.css";

class MainContent extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      section: "signup",
      email: "",
      username: "",
      password: "",
      confirmpass: "",
      otp: "",
      accountres: "",
      passres: "",
      resetres: "",
    };
  }

  forgotPass = () => {
    this.setState({
      section: "forgot",
    });
  };

  createAccount = (event) => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        emailaddr: this.state.email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //
        if (result.users) {
          this.setState({
            accountres: "A user with that email already exists!",
          });
        } else {
          return fetch(
            "http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "register",
                email_addr: this.state.email,
              }),
            }
          )
            .then((resp) => resp.json())
            .then((response) => {
              this.setState({
                accountres: response.message,
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  setPass = (event) => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "setpassword",
        email_addr: this.state.email,
        token: this.state.otp,
        newpassword: this.state.password,
        confirmpassword: this.state.confirmpass,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            passres: "Set your password! Proceed to Login.",
          });
          sessionStorage.setItem("pass", this.state.password);
        },
        (error) => {}
      );
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  forgotPassword = (event) => {
    //keep the form from actually submitting
    event.preventDefault();
    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "forgotpassword",
        email_addr: this.state.email,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            resetres: result.message,
          });
        },
        (error) => {}
      );
  };

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  render() {
    if (this.state.section === "signup") {
      return (
        <div>
          <p className="subtitle">
            Sign up and start your very own professional portfolio
          </p>
          <form>
            <div className="form-input">
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => this.handleChange(e)}
              ></input>
              <div className="message">{this.state.accountres}</div>
            </div>
          </form>

          <div className="row signup-footer">
            <button
              className="submit-button"
              onClick={(e) => this.createAccount(e)}
            >
              <span>Sign Up!</span>
            </button>
          </div>
        </div>
      );
    } else if (this.state.section === "login") {
      return (
        <div>
          <LoginForm
            togglePage={this.props.togglePage}
            loadPosts={this.props.loadPosts}
          />
          <button className="forgot-button" onClick={this.forgotPass}>
            <span>Forgot Password?</span>
          </button>
        </div>
      );
    } else if (this.state.section === "otp") {
      return (
        <div>
          <form>
            <div className="form-input">
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => this.handleChange(e)}
              ></input>
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                onChange={(e) => this.handleChange(e)}
              ></input>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => this.handleChange(e)}
              />
              <input
                type="password"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={(e) => this.handleChange(e)}
              />
              <div className="message">{this.state.passres}</div>
            </div>
          </form>
          <div className="row signup-footer">
            <button
              className="submit-button"
              onClick={(e) => {
                this.setPass(e);
              }}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
      );
    }
    if (this.state.section === "forgot") {
      return (
        <div>
          <p className="subtitle">
            Forgot Your Password? No Problem! <br /> Enter Your Email
          </p>
          <form>
            <div className="form-input">
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => this.handleChange(e)}
              ></input>
              <div className="message">{this.state.resetres}</div>
            </div>
          </form>

          <div className="row signup-footer">
            <button
              className="submit-button"
              onClick={(e) => this.forgotPassword(e)}
            >
              <span>Send OTP</span>
            </button>
          </div>
        </div>
      );
    }
  }
}

function setMenuOption(mode, maincontent, e) {
  maincontent.current.setState({
    section: mode,
  });
}

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "",
    };
  }
  changeState(section) {
    this.setState({
      section: section,
    });
  }
  render() {
    let mainContent = React.createRef();
    let logo = require("../logo.svg");
    if (this.state.section === "login") {
      return (
        <div className="signup-middle">
          <div className="signup-card">
            <div>
              {/* Sign Up Button */}
              <div className="signup-tab">
                <button
                  className="signup-button"
                  onClick={(e) => {
                    setMenuOption("signup", mainContent, e);
                    this.changeState("signup");
                  }}
                >
                  <span>Sign Up</span>
                </button>
              </div>
              {/* Login Button */}
              <div className="login-tab-highlight">
                <button
                  className="login-button"
                  onClick={(e) => setMenuOption("login", mainContent, e)}
                >
                  <span>Log In</span>
                </button>
              </div>
            </div>

            <div className="row signup-body">
              <img className="logo" src={logo} alt=""></img>
              <MainContent
                ref={mainContent}
                togglePage={this.props.togglePage}
                loadPosts={this.props.loadPosts}
              />
            </div>
          </div>
          <div className="otp">
            <div className="col-6 txt">Have A One Time Password?</div>
            <div className="col-6 btn">
              <button
                className="otp-button"
                onClick={(e) => setMenuOption("otp", mainContent, e)}
              >
                <span>Set Password!</span>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="signup-middle">
          <div className="signup-card">
            <div>
              {/* Sign Up Button */}
              <div className="signup-tab-highlight">
                <button
                  className="signup-button"
                  onClick={(e) => setMenuOption("signup", mainContent, e)}
                >
                  <span>Sign Up</span>
                </button>
              </div>
              {/* Login Button */}
              <div className="login-tab">
                <button
                  className="login-button"
                  onClick={(e) => {
                    setMenuOption("login", mainContent, e);
                    this.changeState("login");
                  }}
                >
                  <span>Log In</span>
                </button>
              </div>
            </div>

            <div className="row signup-body">
              <img className="logo" src={logo} alt=""></img>
              <MainContent
                ref={mainContent}
                togglePage={this.props.togglePage}
                loadPosts={this.props.loadPosts}
              />
            </div>
          </div>
          <div className="otp">
            <div className="col-6 txt">Have A One Time Password?</div>
            <div className="col-6 btn">
              <button
                className="otp-button"
                onClick={(e) => setMenuOption("otp", mainContent, e)}
              >
                <span>Set Password!</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
