import React from "react";
import "../css/post.css";
import "../css/firsttimelogin.css";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "profileSettings",
      dname: "",
      fname: "",
      lname: "",
      bio: "",
      crowdfunding: "",
      freelance: "",
      profilePic: "",
      email: "",
      artMessage: "",
      nameMessage: "",
    };
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  updateUserArtifacts = (e, artifact_cat, artifact_item) => {
    e.preventDefault();
    if (artifact_item !== "") {
      fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserArtifacts",
          user_id: sessionStorage.getItem("user"),
          userid: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          artifacttype: "profileSettings",
          artifactcategory: artifact_cat,
          artifacturl: artifact_item,
        }),
      })
        .then((resp) => resp.json())
        .then(
          (response) => {
            if (response.Status.includes("SUCCESS")) {
              this.setState({
                artMessage: "Updated Successfully",
              });
            }
          },
          (error) => {}
        );
    }
  };

  createNotificationArtifact() {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("user"),
        artifacturl: "0",
        artifactcategory: "Notificationcount",
      }),
    })
      .then((res) => res.json())
      .then((result) => {});
  }
  updateUserName = (e) => {
    e.preventDefault();
    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: sessionStorage.getItem("user"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return fetch(
          "http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php",
          {
            method: "post",
            body: JSON.stringify({
              action: "addOrEditUsers",
              user_id: sessionStorage.getItem("user"),
              userid: sessionStorage.getItem("user"),
              session_token: sessionStorage.getItem("token"),
              name: this.state.dname,
              firstname: this.state.fname,
              lastname: this.state.lname,
            }),
          }
        )
          .then((resp) => resp.json())
          .then((response) => {
            if (result) {
              sessionStorage.setItem("dname", this.state.dname);
              sessionStorage.setItem("fname", this.state.fname);
              sessionStorage.setItem("lname", this.state.lname);

              this.setState({
                nameMessage: "Successfully Updated!",
              });
              window.location.reload(false);
            } else {
              sessionStorage.removeItem("dname");
              sessionStorage.removeItem("fname");
              sessionStorage.removeItem("lname");
            }
          });
      });
    this.createNotificationArtifact();
  };

  render() {
    if (this.state.section === "profileSettings") {
      return (
        <div className="tab-content">
          <h2>Profile Page Settings</h2>
          <form>
            <div className="profile-input">
              <div className="profile-label">Change Profile Picture: </div>
              <input
                name="profilePic"
                placeholder="Picture URL"
                onChange={(e) => this.handleChange(e)}
              ></input>
              <button
                className="update-button"
                onClick={(e) =>
                  this.updateUserArtifacts(
                    e,
                    "profilePic",
                    this.state.profilePic
                  )
                }
              >
                Update
              </button>
            </div>

            <div className="profile-input">
              <div className="profile-label">Bio: </div>
              <textarea
                type="text"
                name="bio"
                onChange={(e) => this.handleChange(e)}
              />
              <button
                className="update-button"
                onClick={(e) =>
                  this.updateUserArtifacts(e, "bio", this.state.bio)
                }
              >
                Update
              </button>
            </div>
            <div className="profile-input">
              <br />
              <br />
              <div className="profile-label">Crowdfunding Link: </div>
              <input
                name="crowdfunding"
                onChange={(e) => this.handleChange(e)}
              ></input>
              <button
                className="update-button"
                onClick={(e) =>
                  this.updateUserArtifacts(
                    e,
                    "crowdfunding",
                    this.state.crowdfunding
                  )
                }
              >
                Update
              </button>
            </div>
            <div className="profile-input">
              <br />
              <br />
              <div className="profile-label">Freelance Link: </div>
              <input
                name="freelance"
                onChange={(e) => this.handleChange(e)}
              ></input>
              <button
                className="update-button"
                onClick={(e) =>
                  this.updateUserArtifacts(e, "freelance", this.state.freelance)
                }
              >
                Update
              </button>
              <div className="message">{this.state.artMessage}</div>
            </div>
          </form>
        </div>
      );
    } else if (this.state.section === "nameSettings") {
      return (
        <div className="tab-content">
          <h2>Name Settings</h2>
          <form>
            <div className="profile-input">
              <div className="profile-label">Change Display Name: </div>
              <input
                type="text"
                name="dname"
                placeholder="Display Name"
                onChange={(e) => this.handleChange(e)}
              ></input>
            </div>
            <div className="profile-input">
              <div className="profile-label">Change First Name: </div>
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                onChange={(e) => this.handleChange(e)}
              ></input>
            </div>
            <div className="profile-input">
              <div className="profile-label">Change Last Name: </div>
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                onChange={(e) => this.handleChange(e)}
              />
              <div className="message">{this.state.nameMessage}</div>
              <br />
              <br />
              <button
                className="update-button"
                onClick={(e) => this.updateUserName(e)}
              >
                Update
              </button>
            </div>
          </form>
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

export default class FirstTimeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dname: "",
      fname: "",
      lname: "",
      otp: "",
      email: "",
      pass: "",
      result: "",
    };
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  render() {
    let mainContent = React.createRef();
    let logo = require("../logo.svg");
    return (
      <div className="firsttime">
        <div className="firsttime-tab">
          <button
            onClick={(e) => setMenuOption("profileSettings", mainContent, e)}
          >
            Profile Settings
          </button>
          <button
            onClick={(e) => setMenuOption("nameSettings", mainContent, e)}
          >
            Name Settings
          </button>
          <div className="welcome-tab">
            <img src={logo} alt="logo" className="logo" />
            <div className="welcome">
              <b>Welcome!!</b> <br /> <br />
              The Team at Folio wants to thank you for joining! <br /> <br />
              <b>Lets Get Started With Your Basic Information:</b>
            </div>
          </div>
        </div>

        <MainContent ref={mainContent} />
      </div>
    );
  }
}
