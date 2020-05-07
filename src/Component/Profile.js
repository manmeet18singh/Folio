import React from "react";
import "../App.css";
import "../css/profile.css";
import "./Post.js";
import "./PostingList.js";
import Settings from "./Settings";
import "../css/settings.css";
import FriendList from "./FriendList";
import FollowersList from "./FollowersList";
import Modal from "./Modal";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal2: false,
      showModal3: false,
      dname: "",
      fname: "",
      lname: "",
      bio: "",
      crowdfunding: "",
      profilePic: "",
      liked: false,
      artifactID: "",
      freelance: "",
    };
  }

  componentDidMount() {
    this.getUserArtifacts(
      "profilePic",
      "https://www.svgrepo.com/show/213315/avatar-profile.svg"
    );
    this.getUserArtifacts("bio", "Hey Update Me!");
    this.getUserArtifacts("crowdfunding", "Hey Update Me!");
    this.getUserArtifacts("freelance", "Hey Update Me");
    this.getUsername(sessionStorage.getItem("user"));
  }

  getUsername = (userid) => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: userid,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {

          this.setState({
            fname: result.users[0].first_name,
            lname: result.users[0].last_name,
          });
        },
        (error) => {}
      );
  };

  showSettingsModal = (e) => {
    if (this.state.showModal === true) {


      this.loadProfileValues();
    }
    this.setState({
      showModal: !this.state.showModal,
    });


  };
  showFollowingModal = (e) => {
    this.setState({
      showModal2: !this.state.showModal2,
    });

  };
  showFollowersModal = (e) => {
    this.setState({
      showModal3: !this.state.showModal3,
    });
  };

  logout = (e) => {
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
          return fetch(
            "http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "logout",
                username: email,
                session_token: sessionStorage.getItem("token"),
              }),
            }
          )
            .then((resp) => resp.json())
            .then(
              (response) => {
                sessionStorage.clear();
                window.location.reload(false);
              },
              (error) => {}
            );
        },
        (error) => {}
      );
  };

  getUserArtifacts = (artifact_cat, artifact_item) => {
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
          if (result.user_artifacts === undefined) {
            return fetch(
              "http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php",
              {
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
              }
            )
              .then((resp) => resp.json())
              .then(
                (response) => {},
                (error) => {}
              );
          } else {
            if (artifact_cat === "profilePic") {
              this.setState({
                profilePic: result.user_artifacts[0].artifact_url,
              });
            } else if (artifact_cat === "bio") {
              this.setState({
                bio: result.user_artifacts[0].artifact_url,
              });
            } else if (artifact_cat === "crowdfunding") {
              this.setState({
                crowdfunding: result.user_artifacts[0].artifact_url,
              });
            } else if (artifact_cat === "freelance") {
              this.setState({
                freelance: result.user_artifacts[0].artifact_url,
              });
            }
          }
        },
        (error) => {}
      );
  };
  loadProfileValues() {
    this.getUserArtifacts(
      "profilePic",
      "https://www.svgrepo.com/show/213315/avatar-profile.svg"
    );
    this.getUserArtifacts("bio", "Hey Update Me!");
    this.getUserArtifacts("crowdfunding", "Hey Update Me!");
    this.getUserArtifacts("freelance", "Hey Update Me");
  }

  render() {
    // Check If we have a profile pic already loaded, if not get info from user artifacts
    return (
      <div className="side-bar">
        <div className="edit-profile">
          <img
            alt=""
            className="edit-img"
            src={require("../Images/pencil_white.svg")}
            onClick={(e) => this.showSettingsModal(e)}
          />
        </div>
        <div className="profile-pic-container">
          <img alt="" className="profile-pic" src={this.state.profilePic} />
        </div>
        <div className="user-info">
          <div className="name-container">
            <div className="display-name">
              <b>{sessionStorage.getItem("dname")}</b>
            </div>
            <div className="display-flname">
              {this.state.fname} {this.state.lname}
            </div>
          </div>
          <div className="follow-container">
            <button
              className="followinglist-button"
              onClick={(e) => this.showFollowingModal(e)}
            >
              Following
            </button>
            <button
              className="followerlist-button"
              onClick={(e) => this.showFollowersModal(e)}
            >
              Followers
            </button>
          </div>

          <div className="user-bio">
            <h3>Bio: </h3>
            {this.state.bio}
          </div>
          <div className="crowdfund-link">
            <h3>Crowdfunding: </h3>
            <a href={this.state.crowdfunding}>{this.state.crowdfunding}</a>
          </div>
          <div className="freelance-link">
            <h3>Freelance: </h3>
            <a href={this.state.freelance}>{this.state.freelance}</a>
          </div>
          <button className="logout-button" onClick={(e) => this.logout(e)}>
            LOGOUT
          </button>
        </div>
        <Settings
          show={this.state.showModal}
          onClose={(e) => this.showSettingsModal(e)}
        />
        <Modal
          show={this.state.showModal2}
          onClose={(e) => this.showFollowingModal(e)}
        >
          <FriendList />
        </Modal>
        <Modal
          show={this.state.showModal3}
          onClose={(e) => this.showFollowersModal(e)}
        >
          <FollowersList />
        </Modal>
      </div>
    );
  }
}
