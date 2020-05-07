import React from "react";
import "../css/settings.css";
import Modal from "./Modal";

let val;
class SettingsContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "",
      showModal: false,
      delMessage: "",
    };
  }
  showDeleteModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
      // modalPage: "delete",
    });
  };
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  signOut = (e) => {
    sessionStorage.clear();
  };
  deleteAccount(e) {

    this.showDeleteModal(e);
    this.handleDelete(e);
    this.handleDeleteAccount(e);
    this.signOut(e);
    window.location.reload(false);
  }
  handleDeleteAccount(e) {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "deleteUsers",
        user_id: sessionStorage.getItem("user"),
        userid: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.Status.includes("SUCCESS")) {
          this.setState({
            delMessage: "Your account has now been permanently deleted.",
          });
          // sessionStorage.setItem("", this.state.status);
        }

        // (error) => {
        //
        // };
      });
  }

  handleDelete(e) {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        userid: sessionStorage.getItem("user"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        let artifactid = result.user_artifacts;
        let num = artifactid.length;

        for (var i = 0; i < num; i++) {
          fetch(
            "http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "deleteUserArtifacts",
                user_id: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                artifactid: artifactid[i].artifact_id,
              }),
            }
          )
            .then((res) => res.json())
            .then((result) => {});
        }
      });
  }
  render() {
    return (
      <div>
        <div className="mod-title">
          Are You Sure You Want To Delete Your Account Permanently?
        </div>
        <div className="modal-buttons">
          <div className="button1-container">
            <button className="button1" onClick={(e) => this.onClose(e)}>
              <span>No</span>
            </button>
          </div>
          <div className="button2-container">
            <button className="button2" onClick={(e) => this.deleteAccount(e)}>
              <span>Yes</span>
            </button>
            <div className="message">{this.state.delMessage}</div>
          </div>
        </div>
      </div>
    );
  }
}
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
      otp: "",
      password: "",
      confirmpass: "",
      artMessage: "",
      nameMessage: "",
      otpMessage: "",
      passMessage: "",
      status: "public",
      privMessage: "",
      check: "",
      delMessage: "",
      showModal: false,
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
          action: "getUserArtifacts",
          userid: sessionStorage.getItem("user"),
          artifactcategory: artifact_cat,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // user_artifacts[] =>
            //artifact_category: "profilePic"​​
            // artifact_id: "513"
            // artifact_type: "profileSettings"
            // artifact_url: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
            // user_id: "356"

            let artifactid = result.user_artifacts[0].artifact_id;

            return fetch(
              "http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php",
              {
                method: "post",
                body: JSON.stringify({
                  action: "addOrEditUserArtifacts",
                  user_id: sessionStorage.getItem("user"),
                  userid: sessionStorage.getItem("user"),
                  session_token: sessionStorage.getItem("token"),
                  artifactid: artifactid,
                  artifacttype: "profileSettings",
                  artifactcategory: artifact_cat,
                  artifacturl: artifact_item,
                }),
              }
            )
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
          },
          (error) => {}
        );
    }
  };

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
      .then(
        (result) => {
          let email = result.users[0].email_addr;
          let otp = result.users[0].otp;
          let pass = result.users[0].password;

          return fetch(
            "http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "addOrEditUsers",
                user_id: sessionStorage.getItem("user"),
                userid: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                emailaddr: email,
                password: pass,
                otp: otp,
                name: this.state.dname,
                firstname: this.state.fname,
                lastname: this.state.lname,
              }),
            }
          )
            .then((resp) => resp.json())
            .then(
              (response) => {
                if (result) {
                  sessionStorage.setItem("dname", this.state.dname);

                  this.setState({
                    nameMessage: "Successfully Updated!",
                  });
                } else {
                  sessionStorage.removeItem("dname");
                }
              },
              (error) => {
                alert("THIS IS SETTING USER NAME!");
              }
            );
        },
        (error) => {
          alert("THIS IS GETTING USER INFO!");
        }
      );
  };

  getOTP = (event) => {
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
            otpMessage: result.message,
          });
        },
        (error) => {}
      );
  };

  updatePass = (event) => {
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
            passMessage: "Updated your password!",
          });
          sessionStorage.setItem("pass", this.state.password);
        },
        (error) => {}
      );
  };
  updatePrivacy = (event) => {
    // event.preventDefault();
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUsers",
        user_id: sessionStorage.getItem("user"),
        userid: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        status: this.state.status,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {

          if (
            result.Status.includes("SUCCESS") &&
            this.state.status === "private"
          ) {
            this.setState({
              privMessage:
                "Your account is now PUBLIC. Creatives who don't follow you can now view your posts.",
            });
          } else if (
            result.Status.includes("SUCCESS") &&
            this.state.status === "public"
          ) {
            this.setState({
              privMessage:
                "Your account is now PRIVATE. Only your followers can now see your content.",
            });
          }
          // sessionStorage.setItem("", this.state.status);
        },
        (error) => {}
      );
  };
  handleSwitch(e) {
    this.handleChange(e);
    this.updatePrivacy(e);
  }
  componentWillMount() {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        // status: this.state.status,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //
        // console.log("this is results: ", result.users[0].status);
        if (result.users[0].status == "private") {
          // console.log("Inside COMPONENT DID MOUNT PRIVATE");
          this.setState({
            check: true,
          });
        } else if (result.users[0].status == "public") {
          // console.log("Inside COMPONENT DID MOUNT PUBLIC");
          this.setState({
            check: false,
          });
        } else if (result.users[0].status == "") {
          // console.log("Inside COMPONENT DID MOUNT NOTHING");
          this.setState({
            check: false,
          });
        }

        // (error) => {
        //
      });
  }
  showDeleteModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
      // modalPage: "delete",
    });
  };
  render() {
    let mainSettings = React.createRef();
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
    } else if (this.state.section === "passwordSettings") {
      return (
        <div className="tab-content">
          <h2>Password Settings</h2>
          <form>
            <div className="profile-input">
              <div className="profile-label">Change Your Password: </div>
              <input
                name="email"
                placeholder="Email"
                onChange={(e) => this.handleChange(e)}
              ></input>
              <button
                className="get-otp-button"
                onClick={(e) => this.getOTP(e)}
              >
                Get OTP
              </button>
              <br />
              <div className="message">{this.state.otpMessage}</div>
              <br />
              <br />
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
              <div className="message">{this.state.passMessage}</div>
              <button
                className="update-button"
                onClick={(e) => this.updatePass(e)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      );
    } else if (this.state.section === "privacySettings") {
      // this.checkToggle();
      if (this.state.status === "public") {
        this.state.check = true;
        val = "private";

      } else if (this.state.status === "private") {
        this.state.check = false;
        val = "public";

      } else if (this.state.status === "") {
        this.state.check = true;
        val = "public";

      }
      return (
        <div className="tab-content">
          <h2>Privacy Settings</h2>
          <div>
            You can make your account Private from people you do not follow. You
            can also disable it right here!
          </div>
          <div>
            {/* <button onClick={(e) => this.updatePrivacy(e)}>UPDATE</button> */}
            <label className="switch">
              <input
                name="status"
                type="checkbox"
                value={val}
                checked={this.state.check}
                onChange={(e) => this.handleSwitch(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="message">{this.state.privMessage}</div>
        </div>
      );
    } else if (this.state.section === "dangerZone") {
      return (
        <div className="tab-content">
          <h2 style={{ color: "#da2c38" }}>Delete Your Account Permanently</h2>
          <div>This is where we would delete your account</div>
          <div>
            <button
              className="delete-button"
              // onClick={(e) => this.handleDelete(e)}
              onClick={(e) => this.showDeleteModal(e)}
            >
              DELETE ME
            </button>
            <div className="message">{this.state.delMessage}</div>
          </div>
          <Modal
            show={this.state.showModal}
            onClose={(e) => this.showDeleteModal(e)}
          >
            <SettingsContent
              ref={mainSettings}
              onClose={(e) => this.showDeleteModal(e)}
            ></SettingsContent>
            >
          </Modal>
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

export default class Settings extends React.Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
    window.location.reload(false);
  };

  render() {
    // console.log("Modal Show is " + this.props.show);
    if (!this.props.show) {
      return null;
    }
    let mainContent = React.createRef();
    return (
      <div className="settings-modal">
        {/* modal content */}
        <div className="settings-content">
          <div className="settings-header">
            <span className="close" onClick={this.onClose}>
              &times;
            </span>
          </div>
          <div className="settings-body">
            <div className="tab-page">
              <button
                onClick={(e) =>
                  setMenuOption("profileSettings", mainContent, e)
                }
              >
                Profile Settings
              </button>
              <button
                onClick={(e) => setMenuOption("nameSettings", mainContent, e)}
              >
                Name Settings
              </button>
              <button
                onClick={(e) =>
                  setMenuOption("passwordSettings", mainContent, e)
                }
              >
                Password Settings
              </button>
              <button
                onClick={(e) =>
                  setMenuOption("privacySettings", mainContent, e)
                }
              >
                Privacy Settings
              </button>
              <button
                onClick={(e) => setMenuOption("dangerZone", mainContent, e)}
              >
                <span className="danger">Danger Zone</span>
              </button>
            </div>

            <MainContent ref={mainContent} />
          </div>
        </div>
      </div>
    );
  }
}
