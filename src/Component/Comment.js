import React from "react";
import "../App.css";
import "../css/comment.css";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { post } = this.props;
    return (
      <div className="comment-container">
        <h1 className="comment-header">{this.props.post.name}</h1>
        <div className="comment-text-container">
          <div className="comment-text">{this.props.post.post_text}</div>
        </div>
        <div className="comment-timestamp">
          <p>{this.props.post.timestamp}</p>
        </div>
      </div>
    );
  }
}
