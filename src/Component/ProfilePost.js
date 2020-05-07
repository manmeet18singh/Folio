import React from "react";
import "../App.css";
import "../css/profilepost.css";

export default class ProfilePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      caption: "",
      collab: "",
      modalPage: "",
    };
    this.post = React.createRef();
  }

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
    let title = this.getTitle();
    let caption = this.getCaption();
    let collab = this.getCollab();
    return (
      <div className="pfm-card">
        <div className="row pfm-card-body">
          <div className="pfm-img-container">
            <img
              className="pfm-post-img"
              src={
                !this.props.post.post_pic_url
                  ? require("../Images/defaultPic.jpg")
                  : this.props.post.post_pic_url
              }
              alt="post"
            />
          </div>
          <div className=" row title">
            <h4>{title}</h4>
          </div>
          <div className="caption">
            <p>{caption}</p>
          </div>
          <div className={this.state.collab !== "" ? "collab" : "no-display"}>
            <p>
              <b>Collaborators:</b> {collab}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
