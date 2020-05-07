import React from "react";
import "../css/Notification.css";

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: "",
      caption: "",
      collab: "",
      modalPage: "",
      user: "",
      proPic: "",
      userID: "",
      userSep: this.props.notification.artifact_url.indexOf("~@~"),
    };
    // this.post = React.createRef();
  }

  getUser(userid) {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: userid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.users) {
          this.setState({
            user: result.users[0],
          });
        }
      });
  }
  getProPic(userid) {
    this.state.userID = this.props.notification.artifact_url.substring(
      0,
      this.state.userSep
    );

    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: this.state.userID,
        artifactcategory: "profilePic",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.user_artifacts) {
          this.setState({
            proPic: result.user_artifacts[0].artifact_url,
          });
        }
      });
  }
  componentDidMount() {
    this.getProPic(this.props.notification.userid);
    this.getUser(this.props.notification.user_id);
  }
  render() {
    return (
      <div className="notification-section">
        <div className="notif">
          <img
            alt="profile picture"
            className="pro-pic"
            src={this.state.proPic}
          />
        </div>
        <p className="notifblock">
          {this.props.notification.artifact_url.substring(
            this.state.userSep + 3,
            this.props.notification.artifact_url.length
          )}
        </p>
      </div>
    );
  }
}
