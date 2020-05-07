import React from "react";
import Comment from "./Comment.js";
import CommentForm from "./CommentForm.js";

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      commentPosts: [],
    };
    // this.posts = React.createRef();
  }
  componentDidMount() {
    // console.log(this.props.posts.user_id);

    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getPosts",
        parentid: this.props.postid,
        max_posts: 25,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.posts) {
            this.setState({
              commentPosts: result.posts,
            });

          }
        }
        // (error) => {
        //
        // }
      );
  }

  render() {
    const { error, isLoaded, commentPosts } = this.state;

    return (
      <div className="comments">
        {commentPosts.map((comment) => (
          <Comment key={comment.post_id} post={comment} />
        ))}

        <h1 className="text-above-commentBox">Add your comment!</h1>
        <CommentForm postid={this.props.postid} userid={this.props.userid} />
      </div>
    );
  }
}
