import React from "react";
import "../App.css";
import Notification from "../Component/Notification";
export default class NotificationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      notifications: [],
      reverseNotifications: [],
    };
  }

  componentDidMount() {
    //we call results here
    //make the api call to the user API to get the user with all of their attached preferences
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifactcategory: "NotificationNew",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.user_artifacts) {
            this.setState({
              notifications: result.user_artifacts,
            });
          }
        },
        (error) => {}
      );
  }

  render() {
    //console.log(this.props.notification.user_id)

    return (
      /* <h1> notifications</h1> */
      <div>
        {/* //     <button onClick={(e) => this.addNotification(e, "liked")}> */}
        {/* //       {" "} */}
        {/* //       Click here */}
        {/* //     </button> */}
        {/* //     <button onClick={(e) => this.addNotification(e)}> Comment</button> */}
        {reverseArray(this.state.notifications).map((notification) => (
          <Notification
            key={notification.user_id}
            notification={notification}
          />
        ))}
      </div>
    );
  }
  addNotification(e, artifacttype) {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("user"),

        artifactcategory: "Notification",

        artifacttype: artifacttype,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.user_artifacts) {
          this.setState({
            notifications: result.user_artifacts,
          });
        }
      });
    /* Second fetch call to count notifications */
  }
}
function reverseArray(arr) {
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
}
