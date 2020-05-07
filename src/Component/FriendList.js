import React from "react";
import "../App.css";
import Friends from "./Friends.js";
import "../css/followers-followinglist.css";

export default class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal2: false,
      connections: [],
      error: null,
    };
  }

  showFollowingModal = (e) => {
    this.setState({
      showModal2: !this.state.showModal2,
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
          userid: sessionStorage.getItem("user"),
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

  componentDidMount() {
    this.loadConnections();
  }

  render() {
    //this.loadPosts();
    const { error, connections } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else {
      return (
        <div>
          {connections.map((connection) => (
            <Friends
              key={connection.connection_id}
              friend={connection}
              type={"following"}
            />
          ))}
        </div>
      );
    }
  }
}
