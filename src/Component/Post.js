import React from "react";
import "../App.css";
import "../css/post.css";
import CommentForm from "./CommentForm.js";
import Modal from "./Modal";
import EditPost from "./EditPost";
import CommentList from "./CommentList.js";
import ProfileModal from "./ProfileModal.js";

class MainContent extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      section: this.props.modalPage,
      comments: "",
    };
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  deletePost = (event) => {
    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "deletePosts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        postid: this.props.postId,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.Status === "SUCCESS - Deleted 1 Rows") {
            window.location.reload(false);
          } else {

          }
        },
        (error) => {}
      )
      .catch((err) => {
        console.error("Request failed");
      });
  };

  handleDelete(e) {
    this.setState({
      section: "delete",
    });
  }

  handleEdit(e) {
    this.setState({
      section: "edit",
    });
  }

  render() {
    if (this.state.section === "options") {
      return (
        <div className="modal-buttons">
          <div className="button1-container">
            <button className="button1" onClick={(e) => this.handleEdit(e)}>
              <span>Edit</span>
            </button>
          </div>
          <div className="button2-container">
            <button className="button2" onClick={(e) => this.handleDelete(e)}>
              <span>Delete</span>
            </button>
          </div>
        </div>
      );
    } else if (this.state.section === "delete") {
      return (
        <div>
          <div className="mod-title">Are You Sure?</div>
          <div className="modal-buttons">
            <div className="button1-container">
              <button className="button1" onClick={this.onClose}>
                <span>No</span>
              </button>
            </div>
            <div className="button2-container">
              <button className="button2" onClick={(e) => this.deletePost(e)}>
                <span>Yes</span>
              </button>
            </div>
          </div>
        </div>
      );
    } else if (this.state.section === "edit") {
      return (
        <div>
          <EditPost
            postId={this.props.postId}
            time={this.props.time}
            text={this.props.text}
            title={this.props.title}
            collab={this.props.collab}
            pic={this.props.pic}
            tag={this.props.tag}
            onClose={this.props.onClose}
          />
        </div>
      );
    } else if (this.state.section === "comment") {
      return (
        <div className="comment-modal">
          <CommentList postid={this.props.postId} userid={this.props.userid} />

        </div>
      );
    }
  }
}

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showProfile: false,
      comments: this.props.post.comment_flag,
      title: "",
      caption: "",
      collab: "",
      modalPage: "",
      commentPosts: "",
      liked: false,
      artifactID: "",
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
      .then(
        (result) => {
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
        }
        // (error) => {
        //
        // }
      );

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
        artifacturl:
          sessionStorage.getItem("user") +
          "~@~" +
          sessionStorage.getItem("dname") +
          " has liked your post",
        artifacttype: "like",
        artifactcategory: "NotificationNew",
      }),
    })
      .then((res) => res.json())
      .then((result) => {});
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "incrementUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: this.props.post.user_id,
        artifactcategory: "Notificationcount",
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
  showHideComments() {
    if (this.state.showModal) {
      return "comments show";
    }
    return "comments hide";
  }
  showDeleteModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
      modalPage: "delete",
    });
  };
  showCommentModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
      modalPage: "comment",
      commentPosts: this.props.post,
    });
    // console.log(this.props.post.post_id);
  };
  showEditModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
      modalPage: "edit",
    });
  };
  showProfileModal = (e) => {
    if (sessionStorage.getItem("user") !== this.props.post.user_id) {
      this.setState({
        showProfile: !this.state.showProfile,
      });
    }
  };

  showModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
      modalPage: "options",
    });
  };

  setCommentCount = (newcount) => {
    this.setState({
      comments: newcount,
    });
  };

  showHideComments() {
    if (this.state.showModal) {
      return "comments show";
    }
    return "comments hide";
  }

  // conditionalDisplay() {
  //   console.log("Parent is " + this.props.post.parent_id);
  //   // if (this.props.post.parent_id) {
  //   //   return "";
  //   // } else {
  //   return (
  //     <div className="comment-block">
  //       <div className="comment-indicator">
  //         <div className="comment-indicator-text">
  //           {this.getCommentCount()} Comments
  //         </div>
  //         <img
  //           src={require("../Images/comment.svg")}
  //           className="comment-icon"
  //           onClick={(e) => this.showModal()}
  //           alt="View Comments"
  //         />
  //       </div>
  //       <div className={this.showHideComments()}>
  //         <CommentForm
  //           onAddComment={this.setCommentCount}
  //           parent={this.props.post.post_id}
  //           commentCount={this.getCommentCount()}
  //         />
  //       </div>
  //     </div>
  //   );
  //   // }
  // }
  // render() {
  //   // console.log(this.props);

  //   var separator = this.props.post.post_text.indexOf("~@~");
  //   this.state.title = this.props.post.post_text.substring(0, separator);
  //   this.state.caption = this.props.post.post_text.substring(
  //     separator + 3,
  //     this.props.post.post_text.length
  //   );

  //   // console.log("THIS IS TITLE: ", this.state.title);
  //   // console.log("THIS IS BODY: ", this.state.caption);
  //   // this.getTags();
  getTitle = () => {
    var separator = this.props.post.post_text.indexOf("~@~");
    this.state.title = this.props.post.post_text.substring(0, separator);
    return this.state.title;
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
    // console.log(this.props.post);
    // console.log("THIS IS SESSION ID ", sessionStorage.getItem("user"));
    let mainContent = React.createRef();
    let title = this.getTitle();
    let caption = this.getCaption();
    let collab = this.getCollab();

    let like;
    if (this.state.liked == false) {
      like = (
        <button className="interact-button">
          <img
            alt="Like Button-empty"
            src={require("../Images/star.svg")}
            className="button-icon"
            onClick={(e) => this.addLike()}
          />
        </button>
      );
    } else {
      like = (
        <button className="interact-button">
          <img
            alt="Like Button-liked"
            src={require("../Images/star-liked.svg")}
            className="button-icon"
            onClick={(e) => this.deleteLike()}
          />
        </button>
      );
    }

    return (
      <div className="card">
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
              !this.props.post.post_pic_url
                ? require("../Images/defaultPic.jpg")
                : this.props.post.post_pic_url
            }
            alt="post"
          />
          <div className=" row title">
            <h4>{this.getTitle()}</h4>
          </div>
          <div className="caption">
            <p>{this.getCaption()}</p>
          </div>
          <div className={this.state.collab !== "" ? "collab" : "no-display"}>
            <p>
              <b>Collaborators:</b> {collab}
            </p>
          </div>
        </div>
        <div className="row card-footer">
          <div className="tag">
            <p>
              <b># </b>
              {this.props.post.post_type}
            </p>
          </div>
          <div className="interact-group">
            {/* Like Button */}
            {like}
            {/* Comment Button */}
            <button
              className="interact-button"
              onClick={(e) => {
                this.showCommentModal(e);
              }}
            >
              <img
                alt="Comment Button"
                src={require("../Images/comment.svg")}
                className="button-icon"
              />
              {this.props.post.comment_flag}
            </button>
            <div
              className={
                this.props.post.user_id === sessionStorage.getItem("user")
                  ? "interact-button-edit-del"
                  : "no-display"
              }
            >
              <button
                onClick={(e) => this.showDeleteModal(e)}
                className="trash"
              >
                <img
                  alt="Delete Button"
                  src={require("../Images/trash.svg")}
                  className="button-icon"
                />
              </button>
              <button onClick={(e) => this.showEditModal(e)} className="pencil">
                <img
                  alt="Edit Button"
                  src={require("../Images/pencil.svg")}
                  className="button-icon"
                />
              </button>
              <button onClick={(e) => this.showModal(e)} className="kabab">
                <img
                  alt="Post menu"
                  src={require("../Images/menu.svg")}
                  className="button-icon"
                />
              </button>
            </div>
          </div>
          <Modal show={this.state.showModal} onClose={(e) => this.showModal(e)}>
            <MainContent
              ref={mainContent}
              modalPage={this.state.modalPage}
              postId={this.props.post.post_id}
              time={this.props.post.timestamp}
              text={caption}
              title={title}
              collab={collab}
              pic={this.props.post.post_pic_url}
              tag={this.props.post.post_type}
              onClose={(e) => this.showModal(e)}
              post={this.props.posts}
              userid={this.props.post.user_id}
            />
          </Modal>
          <ProfileModal
            show={this.state.showProfile}
            onClose={(e) => this.showProfileModal(e)}
            userid={this.props.post.user_id}
          />
        </div>
      </div>
    );
  }
}
