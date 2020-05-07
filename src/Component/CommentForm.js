import React from "react";
import "../App.css";
import "../css/CommentForm.css";

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_text: "",
      postmessage: "",
      newComment: false,
    };
    // this.postListing = React.createRef();
  }

  submitHandler = (event) => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditPosts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("user"),
        posttype: "comment",
        posttext: this.state.post_text,
        parentid: this.props.postid,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {

          // window.location.reload(false);
          // update the count in the UI manually, to avoid a database hit
          // this.props.onAddComment(this.props.commentCount + 1);
        }
        // (error) => {
        //
        // }
      );
  };
  // follow_user(userid) {
  //   FETCH;
  // }
  addCommentNotification(e) {
    // var likedUser = this.props.post.user_id;
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        // userid: sessionStorage.getItem("user"),
        userid: this.props.userid,
        artifacturl:
          sessionStorage.getItem("user") +
          "~@~" +
          sessionStorage.getItem("dname") +
          " has left a comment on your post",
        artifacttype: "comment",
        artifactcategory: "NotificationNew",
      }),
    });


    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "incrementUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: this.props.userid,
        artifactcategory: "Notificationcount",
      }),
    });
    window.location.reload(false);
  }
  componentDidMount() {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifacturl: this.props.postid,
        artifacttype: "liked-list2",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.user_artifacts != null) {
          this.setState({
            liked: true,
            artifactID: result.user_artifacts[0].artifact_id,
          });
        } else {
          this.setState({
            liked: false,
          });
        }
      });
  }
  myChangeHandler = (event) => {
    this.setState({
      post_text: event.target.value,
    });
  };
  //not working for some reason. moved into addCommentNotification
  // refresh() {
  //   console.log("refresh working");
  //   window.location.reload(false);
  // }
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>
            <br />
            <textarea rows="10" cols="30" onChange={this.myChangeHandler} />
          </label>
          <br />
          {/* <div className="submit-container"> */}
          <input
            type="submit"
            value="submit"
            onClick={(e) => this.addCommentNotification(e)}
            className="comment-submit"
          />
          {/* </div> */}
          <br />
        </form>
      </div>
    );
  }
}
