import React from "react";
import "../App.css";
import "../css/suggestedusers.css";

export default class SuggestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      connectfollowerID: "",
    };
  }

  // Code for unfollowing
  // unfollow_users = () => {
  //   fetch("http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php", {
  //         method: "post",
  //         body: JSON.stringify({
  //           action: "deleteConnections",
  //           user_id: sessionStorage.getItem("user"),
  //           session_token: sessionStorage.getItem("token"),
  //           userid: sessionStorage.getItem("user"),
  //           connectionid: this.state.connectfollowerID
  //         }),
  //       })
  // }

  follow_users = (e) => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditConnections",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          connectuserid: this.state.connectfollowerID,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {});
    // window.location.reload(false)
  };

  componentDidMount() {
    // console.log(this.props.users.userid)
    this.setState({
      name: this.props.users.name,
      connectfollowerID: this.props.users.userid,
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">{this.state.name}</div>
        <div className="card-body">
          <img
            className="post-img"
            // src={this.props.post.post_pic_url}
            // alt="post"
          />
          {/* <div className="username">{this.props.post.name}</div> */}
        </div>
        <div className="card-footer">
          <button onClick={(e) => this.follow_users(e)}>
            <span>Follow</span>
          </button>
        </div>
      </div>
    );
  }
}
