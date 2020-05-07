import React from "react";
import "../css/profilemodal.css";
import ProfilePostList from "./ProfilePostList";
export default class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followStatus: "Follow",
      dname: "",
      bio: "",
      crowdfunding: "",
      profilePic: "",
      posts: [],
      isNotBlocked: true,
      blockID: "",
      blockStatus: "",
    };
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  checkConnections = (userid) => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          userid: sessionStorage.getItem("user"),
          connectuserid: userid,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.connections !== undefined) {
          this.setState({
            followStatus: "Unfollow",
          });
        }
      });
  };

  changeConnection = (e) => {
    if (this.state.followStatus === "Unfollow") {
      fetch(
        "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            action: "getConnections",
            userid: sessionStorage.getItem("user"),
            connectuserid: this.props.userid,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          let connectionId = result.connections[0].connection_id;

          return fetch(
            "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "deleteConnections",
                user_id: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                connectionid: connectionId,
              }),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              if (result.Status.includes("SUCCESS")) {
                this.setState({
                  followStatus: "Follow",
                });
                window.location.reload(false);
              }
            });
        });
    } else if (
      this.state.isNotBlocked === false &&
      this.state.followStatus === "Follow"
    ) {
      fetch(
        "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            action: "getConnections",
            userid: sessionStorage.getItem("user"),
            connectuserid: this.props.userid,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.connections === undefined) {
            return fetch(
              "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
              {
                method: "post",
                body: JSON.stringify({
                  action: "addOrEditConnections",
                  user_id: sessionStorage.getItem("user"),
                  session_token: sessionStorage.getItem("token"),
                  userid: sessionStorage.getItem("user"),
                  connectuserid: this.props.userid,
                }),
              }
            )
              .then((res) => res.json())
              .then((result) => {
                if (result.Status.includes("SUCCESS")) {
                  this.setState({
                    followStatus: "Unfollow",
                  });
                  window.location.reload(false);
                }
                this.deleteBlock();
              });
          }
        });
    } else {
      fetch(
        "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            action: "getConnections",
            userid: sessionStorage.getItem("user"),
            connectuserid: this.props.userid,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.connections === undefined) {
            return fetch(
              "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
              {
                method: "post",
                body: JSON.stringify({
                  action: "addOrEditConnections",
                  user_id: sessionStorage.getItem("user"),
                  session_token: sessionStorage.getItem("token"),
                  userid: sessionStorage.getItem("user"),
                  connectuserid: this.props.userid,
                }),
              }
            )
              .then((res) => res.json())
              .then((result) => {
                if (result.Status.includes("SUCCESS")) {
                  this.setState({
                    followStatus: "Unfollow",
                  });
                  window.location.reload(false);
                }
              });
          }
        });
    }
  };

  getUserArtifacts = (artifact_cat, artifact_item) => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: this.props.userid,
        artifactcategory: artifact_cat,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.user_artifacts === undefined) {
            if (artifact_cat === "profilePic") {
              this.setState({
                profilePic: artifact_item,
              });
            } else if (artifact_cat === "bio") {
              this.setState({
                bio: artifact_item,
              });
            } else if (artifact_cat === "crowdfunding") {
              this.setState({
                crowdfunding: artifact_item,
              });
            } else if (artifact_cat === "freelance") {
              this.setState({
                freelance: artifact_item,
              });
            }
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

  checkIfBlocked(userid) {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifacturl: userid,
        artifacttype: "block-list2",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.user_artifacts != null) {
            this.setState({
              isNotBlocked: false,
              blockStatus: "Blocked",
              blockID: result.user_artifacts[0].artifact_id,
            });
          } else {
            this.setState({
              isNotBlocked: true,
              blockStatus: "Block",
            });
          }
        }
        // (error) => {
        //
        // }
      );
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
            dname: result.users[0].name,
          });
        },
        (error) => {}
      );
  };

  getUserPosts = (userid) => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getPosts",
        userid: userid,
        max_posts: "5",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.posts) {
            this.setState({
              posts: result.posts,
            });
          }
        },
        (error) => {}
      );
  };

  addBlock() {
    if (this.state.followStatus === "Unfollow") {
      fetch(
        "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            action: "getConnections",
            userid: sessionStorage.getItem("user"),
            connectuserid: this.props.userid,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          let connectionId = result.connections[0].connection_id;
          return fetch(
            "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "deleteConnections",
                user_id: sessionStorage.getItem("user"),
                session_token: sessionStorage.getItem("token"),
                connectionid: connectionId,
              }),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              if (result.Status.includes("SUCCESS")) {
                this.setState({
                  followStatus: "Follow",
                });
                window.location.reload(false);
              }
              return fetch(
                "http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    action: "addOrEditUserArtifacts",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    artifacturl: this.props.userid,
                    artifacttype: "block-list2",
                  }),
                }
              )
                .then((res) => res.json())
                .then((result) => {
                  this.setState({
                    blockID: result["Record Id"],
                    blockStatus: "Blocked",
                    isNotBlocked: false,
                  });
                });
            });
        });
    } else {
      fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserArtifacts",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          artifacturl: this.props.userid,
          artifacttype: "block-list2",
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            blockID: result["Record Id"],
            blockStatus: "Blocked",
            isNotBlocked: false,
          });
          window.location.reload(false);
        });
    }
  }

  deleteBlock() {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "deleteUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        artifactid: this.state.blockID,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          blockStatus: "Block",
          isNotBlocked: true,
        });
        window.location.reload(false);
      });
  }
  componentDidMount() {
    this.getUserArtifacts(
      "profilePic",
      "https://www.svgrepo.com/show/213315/avatar-profile.svg"
    );
    this.getUserArtifacts("bio", "Hey Update Me!");
    this.getUserArtifacts("crowdfunding", "Hey Update Me!");
    this.getUserArtifacts("freelance", "Hey Update Me");
    this.getUsername(this.props.userid);
    this.getUserPosts(this.props.userid);
    this.checkConnections(this.props.userid);
    this.checkIfBlocked(this.props.userid);
  }

  render() {
    let blocked;
    if (!this.props.show) {
      return null;
    }
    if (this.state.isNotBlocked == true) {
      blocked = (
        <button
          alt="Block Button"
          className="pfm-block"
          onClick={(e) => this.addBlock()}
        >
          <span>{this.state.blockStatus}</span>
        </button>
      );
    }
    if (this.state.isNotBlocked == false) {
      blocked = (
        <button
          alt="Unblock Button"
          className="pfm-block"
          onClick={(e) => this.deleteBlock()}
        >
          <span>{this.state.blockStatus}</span>
        </button>
      );
    }
    return (
      <div className="pfmodal">
        <div className="pfmodal-content">
          <div className="pfmodal-header">
            <span className="close" onClick={this.onClose}>
              &times;
            </span>
          </div>
          <div className="pfmodal-body">
            <div className="pfm-pic-container">
              <img alt="" className="pfm-pic" src={this.state.profilePic} />
            </div>
            <div className="pfm-user-info">
              <div className="pfm-display-name">
                <h1>{this.state.dname}</h1>
              </div>
              <div className="pfm-user-bio">
                <h3>Bio: </h3> {this.state.bio}
              </div>
              <div className="pfm-crowdfund-link">
                <h3>Crowdfunding: </h3>
                {this.state.crowdfunding}
              </div>
            </div>
            <div className="pfm-buttons">
              <button
                className="pfm-follow"
                onClick={(e) => this.changeConnection(e)}
              >
                <span>{this.state.followStatus}</span>
              </button>
              {blocked}
            </div>
          </div>
          <div className="pfmodal-footer">
            <ProfilePostList
              posts={this.state.posts}
              error={""}
              isLoaded={""}
              onMain={"main"}
            />
          </div>
        </div>
      </div>
    );
  }
}
