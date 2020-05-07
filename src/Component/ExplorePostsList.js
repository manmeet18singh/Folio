import React from "react";
import ExPost from "./ExPosts.js";
import PostForm from "./PostForm.js";
import "../css/Explore.css";
import "../css/grid.css";
import Profile from "./Profile.js";

export default class ExplorePostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      isPublic: false,
      publicUsers: [],
    };
  }

  componentDidMount() {
    if (this.props.specificUser != null) {
      this.loadUserPosts(this.props.specificUser);
    } else if (this.props.specificUser == null) {
      this.loadPosts();
    }
    // console.log(this.props.specificUser);
  }
  loadPosts(valueFromParent) {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getPosts",
        max_posts: "25",
        posttype: this.props.valueFromParent,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.posts) {
            this.setState({
              isLoaded: true,

              posts: result.posts,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    // console.log(this.props.valueFromParent);
  }

  // filtering(posts) {
  //   let filterPosts = [];

  //   fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
  //     method: "post",
  //     body: JSON.stringify({
  //       action: "getUsers",
  //       status: "public",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         //
  //         for (var i = 0; i < posts.length; i++) {
  //           for (var j = 0; j < result.users.length; j++) {
  //             if (posts[i].user_id === result.users[j].user_id) {
  //               filterPosts.push(posts[i]);
  //               this.setState({
  //                 publicUsers: filterPosts,
  //               });
  //             }
  //           }
  //         }
  //       },
  //       (error) => {}
  //     );
  // }
  // filterBlocks(posts) {

  // }
  render() {
    const { error, isLoaded, posts } = this.state;
    // this.filtering(posts);
    // this.filtering(posts);
    // console.log("THIS IS PUBLICUSERS", this.state.publicUsers);
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div class="grid">
          {this.state.posts.map((post) => (
            <div className={"grid-posts"}>
              <ExPost key={post.post_id} post={post} type={this.props.type} />
            </div>
          ))}
        </div>
      );
    }
  }
}
