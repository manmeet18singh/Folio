import React from "react";
import "../App.css";
import "../css/signup.css";

export default class LoginForm extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      sessiontoken: "",
      result: "",
    };
  }
  changeHandler = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  signOut = (event) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.setState({
      sessiontoken: "",
      alanmessage: "You Signed Out",
    });
  };

  login = (event) => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "login",
        username: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.user) {
            sessionStorage.setItem("token", result.user.session_token);
            sessionStorage.setItem("user", result.user.user_id);
            if (this._isMounted) {
              this.setState({
                sessiontoken: result.user.session_token,
              });
            }
            this.props.togglePage("main");
            this.props.loadPosts();
          } else {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              result: result.message,
            });
          }
        },
        (error) => {}
      );
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // console.log("Rendering login, token is " + sessionStorage.getItem("token"));
    return (
      <div>
        <form>
          <div className="form-input">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => this.changeHandler(e)}
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => this.changeHandler(e)}
            />
            <div className="message-bad">{this.state.result}</div>
          </div>
        </form>
        <div className="row card-footer">
          <button className="submit-button" onClick={(e) => this.login(e)}>
            <span>Log In!</span>
          </button>
        </div>
      </div>
    );
    // return (
    // console.log("Returning welcome message");
    // if (this.state.username) {
    //   return <p>Welcome, {this.state.username}</p>;
    // } else {
    //   return <p>{this.state.alanmessage}</p>;
    // }

    // <form onSubmit={this.signOut}>
    //   <input type="submit" value="Sign Out" />
    //   <p>{this.state.alanmessage}</p>
    // </form>
    // );
    // }
  }
}
