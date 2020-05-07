import React from "react";
import "../App.css";
import CommentForm from "./CommentForm.js";
import ProfileModal from "./ProfileModal";

export default class ExPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comments: this.props.post.comment_flag,
      title: "",
      caption: "",
      showProfile: false,
      liked: false,
      artifactID: "",
      isNotBlocked: true,
      publicPosts: true,
    };
    this.post = React.createRef();
  }
  componentDidMount() {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifacturl: this.props.post.post_id,
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
    this.checkBlockAndPrivate();
  }
  addLike(e) {
    // var likedUser = this.props.post.user_id;
    //Adds the notification for the other user
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: this.props.post.user_id,
        artifacturl: sessionStorage.getItem("dname") + " has liked your post",
        artifacttype: "like",
        artifactcategory: "NotificationNew",
      }),
    });
    //Add the crumb to the user who liked the post
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("user"),
        artifacturl: this.props.post.post_id,
        artifacttype: "liked-list2",
        artifactcategory: "Like-Check",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          liked: true,
          artifactID: result["Record Id"],
        });
        // console.log(this.state.artifactID);
      });

    // console.log(this.props.post.user_id);
  }
  deleteLike(e) {
    // console.log(this.state.artifactID);
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "deleteUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        artifactid: this.state.artifactID,
      }),
    })
      .then((res) => res.json())
      .then((result) => {});
    this.setState({
      liked: false,
      artifactID: "",
    });
  }
  showModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  getCommentCount() {
    if (!this.state.comments || this.state.comments === "0") {
      return 0;
    }
    return parseInt(this.state.comments);
  }
  checkBlockAndPrivate() {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifacturl: this.props.post.user_id,
        artifacttype: "block-list2",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //
        if (result.user_artifacts != null) {
          this.setState({
            isNotBlocked: false,
          });
        } else {
          this.setState({
            isNotBlocked: true,
          });
        }
      });

    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: this.props.post.user_id,
        status: "private",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.users != null) {
          this.setState({
            publicPosts: false,
          });
        }
      });
  }

  showHideComments() {
    if (this.state.showModal) {
      return "comments show";
    }
    return "comments hide";
  }

  conditionalDisplay() {

    if (this.props.post.parent_id) {
      return "";
    } else {
      return (
        <div className="comment-block">
          <div className="comment-indicator">
            <div className="comment-indicator-text">
              {this.getCommentCount()} Comments
            </div>
            <img
              src={require("../Images/comment.svg")}
              className="comment-icon"
              onClick={(e) => this.showModal()}
              alt="View Comments"
            />
          </div>
          <div className={this.showHideComments()}>
            <CommentForm
              onAddComment={this.setCommentCount}
              parent={this.props.post.post_id}
              commentCount={this.getCommentCount()}
            />
          </div>
        </div>
      );
    }
  }

  getTitle = () => {
    var separator = this.props.post.post_text.indexOf("~@~");
    this.state.title = this.props.post.post_text.substring(0, separator);
    return this.state.title;
  };

  showProfileModal = (e) => {
    if (sessionStorage.getItem("user") !== this.props.post.user_id) {
      this.setState({
        showProfile: !this.state.showProfile,
      });
    }
  };

  getCaption = () => {
    var titleSep = this.props.post.post_text.indexOf("~@~");
    var collabSep = this.props.post.post_text.indexOf("~*~");
    if (collabSep !== -1) {
      //Some Collabs
      this.state.caption = this.props.post.post_text.substring(
        titleSep + 3,
        collabSep
      );
      return this.state.caption;
    } else {
      //No collabs
      this.state.caption = this.props.post.post_text.substring(
        titleSep + 3,
        this.props.post.post_text.length
      );
      return this.state.caption;
    }
  };

  getCollab = () => {
    var collabSep = this.props.post.post_text.indexOf("~*~");
    if (collabSep !== -1) {
      //Some Collabs
      this.state.collab = this.props.post.post_text.substring(
        collabSep + 3,
        this.props.post.post_text.length
      );
      return this.state.collab;
    } else {
      //No collabs
      return "";
    }
  };

  render() {
    // console.log(this.props);
    return (
      <div className={this.state.publicPosts ? "card" : "no-display"}>
        <div className=" row card-header">
          <div
            className={
              this.props.post.user_id === sessionStorage.getItem("user")
                ? "my-username"
                : "username"
            }
            onClick={(e) => this.showProfileModal(e)}
          >
            {this.props.post.name}
          </div>
        </div>
        <div className="row card-body">
          <img
            className="post-img"
            src={
              !this.props.post.post_pic_url || this.state.isNotBlocked === false
                ? require("../Images/blocked.jpg")
                : this.props.post.post_pic_url
            }
            alt="post"
          />
          <div className=" row title">
            <h4>
              {!this.getTitle() || this.state.isNotBlocked === false
                ? "You have blocked this user"
                : this.getTitle()}
            </h4>
          </div>
        </div>
        <div className="row card-footer">
          <div className="tag">
            <p>
              <b># </b>
              {this.props.post.post_type}
            </p>
          </div>
        </div>
        <ProfileModal
          show={this.state.showProfile}
          onClose={(e) => this.showProfileModal(e)}
          userid={this.props.post.user_id}
        />
      </div>
    );
  }
}
