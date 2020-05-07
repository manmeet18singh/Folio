import React from "react";
import "../App.css";
import Friends from "./Friends.js";
import "../css/followers-followinglist.css";

export default class FollowersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal3: false,
      connections: [],
      error: null,
      userid: sessionStorage.getItem("user"),
      followername: "",
      showProfile: false,
      currentProfile:"",
    };
  }

  showFollowingModal = (e) => {
    this.setState({
      showModal3: !this.state.showModal3,
    });
  };

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  loadConnections = () => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          connectuserid: sessionStorage.getItem("user"),
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.connections !== undefined) {
            this.setState({
              connections: result.connections,
            });
          }
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  };

  showProfileModal = (e) => {
    this.setState({
      showProfile: !this.state.showProfile,
    });
  };

  componentDidMount() {
    this.loadConnections();
  }

  render() {
    //this.loadPosts();
    const { error, connections } = this.state;
    let outerModal = React.createRef();

    if (error) {
      return <div> Error: {error.message} </div>;
    } else {
      return (
        <div>
          {connections.map((connection) => (
            <Friends
              key={connection.connection_id}
              friend={connection}
              type={"follower"}
            />
          ))}
        </div>
      );
    }
  }
}
