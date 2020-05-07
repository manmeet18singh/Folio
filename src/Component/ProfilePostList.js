import React from "react";
import ProfilePost from "./ProfilePost.js";

export default class ProfilePostingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      success: false,
    };
  }

  render() {
    const { error, posts } = this.props;

    if (error) {
      return <div> Error: {error.message} </div>;
    } else {
      return (
        <div className="horizontal-scroll">
          {posts.map((post) => (
            <ProfilePost
              key={post.post_id}
              post={post}
              type={this.props.type}
            />
          ))}
        </div>
      );
    }
  }
}
