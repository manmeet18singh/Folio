import React from "react";
import "../App.css";
import ProfileModal from "./ProfileModal";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showProfile: false };
    this.friend = React.createRef();
  }
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  showProfileModal = (e) => {
    this.setState({
      showProfile: !this.state.showProfile,
    });
  };
  render() {
    if (this.props.type === "follower") {
      return (
        <div className="userlist" onClick={(e) => this.showProfileModal(e)}>
          {this.props.friend.user_name}
          <ProfileModal
            show={this.state.showProfile}
            onClose={(e) => this.showProfileModal(e)}
            userid={this.props.friend.user_id}
          />
        </div>
      );
    } else {
      return (
        <div className="userlist" onClick={(e) => this.showProfileModal(e)}>
          {this.props.friend.name}
          <ProfileModal
            show={this.state.showProfile}
            onClose={(e) => this.showProfileModal(e)}
            userid={this.props.friend.connect_user_id}
          />
        </div>
      );
    }
  }
}
