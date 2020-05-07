import React from "react";
import Post from "./Post.js";
import SuggestionCard from "./SuggestionCard.js";
import "../css/suggestedusers.css";
import "../css/suggestiongrid.css";
export default class PostingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      comments: [],
      hasConnections: false,
      u1Status: "Follow",
      u2Status: "Follow",
      u3Status: "Follow",
      success: false,
    };
  }

  checkConnections = () => {
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
      .then((result) => {
        if (result.connections !== undefined) {
          this.setState({
            hasConnections: true,
          });
        }
      });
  };

  changeButton = (button, buttonState) => {
    if (buttonState === "Follow") {
      if (button === "u1Status") {
        this.setState({
          u1Status: "Unfollow",
        });
      } else if (button === "u2Status") {
        this.setState({
          u2Status: "Unfollow",
        });
      }
      if (button === "u3Status") {
        this.setState({
          u3Status: "Unfollow",
        });
      }
    } else if (buttonState === "Unfollow") {
      if (button === "u1Status") {
        this.setState({
          u1Status: "Follow",
        });
      } else if (button === "u2Status") {
        this.setState({
          u2Status: "Follow",
        });
      }
      if (button === "u3Status") {
        this.setState({
          u3Status: "Follow",
        });
      }
    }
  };

  changeConnection = (e) => {
    if (this.state.u1Status === "Unfollow") {
      // console.log("HERE");
      fetch(
        "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            action: "getConnections",
            userid: sessionStorage.getItem("user"),
            connectuserid: 450,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (!result.connections) {
            return fetch(
              "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
              {
                method: "post",
                body: JSON.stringify({
                  action: "addOrEditConnections",
                  user_id: sessionStorage.getItem("user"),
                  session_token: sessionStorage.getItem("token"),
                  userid: sessionStorage.getItem("user"),
                  connectuserid: 450,
                }),
              }
            )
              .then((res) => res.json())
              .then((result) => {
                if (result.Status.includes("SUCCESS")) {
                  window.location.reload(false);
                }
              });
          }
        });
    }
    if (this.state.u2Status === "Unfollow") {
      fetch(
        "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            action: "getConnections",
            userid: sessionStorage.getItem("user"),
            connectuserid: 439,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (!result.connections) {
            return fetch(
              "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
              {
                method: "post",
                body: JSON.stringify({
                  action: "addOrEditConnections",
                  user_id: sessionStorage.getItem("user"),
                  session_token: sessionStorage.getItem("token"),
                  userid: sessionStorage.getItem("user"),
                  connectuserid: 439,
                }),
              }
            )
              .then((res) => res.json())
              .then((result) => {
                if (result.Status.includes("SUCCESS")) {
                  window.location.reload(false);
                }
              });
          }
        });
    }
    if (this.state.u3Status === "Unfollow") {
      fetch(
        "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            action: "getConnections",
            userid: sessionStorage.getItem("user"),
            connectuserid: 440,
          }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (!result.connections) {
            return fetch(
              "http://stark.cse.buffalo.edu/cse410/atam/api/connectioncontroller.php",
              {
                method: "post",
                body: JSON.stringify({
                  action: "addOrEditConnections",
                  user_id: sessionStorage.getItem("user"),
                  session_token: sessionStorage.getItem("token"),
                  userid: sessionStorage.getItem("user"),
                  connectuserid: 440,
                }),
              }
            )
              .then((res) => res.json())
              .then((result) => {
                if (result.Status.includes("SUCCESS")) {
                  window.location.reload(false);
                }
              });
          }
        });
    }
  };

  render() {
    //this.loadPosts();
    const { error, isLoaded, posts } = this.props;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (
      this.state.hasConnections === false &&
      this.props.onMain === "main"
    ) {
      this.checkConnections();
      return (
        <div>
          <h3>
            You are currently not following anyone. <br /> Here are some
            suggested users to follow:
          </h3>
          <div className="suggested-user-card">
            <div className="user">
              <div
                className="profile-pic-container"
                style={{ margin: "15px", border: "1px solid #dbdbdb" }}
              >
                <img
                  className="profile-pic"
                  src={
                    "https://image.shutterstock.com/image-photo/portrait-photo-person-project-concept-260nw-507830914.jpg"
                  }
                  alt="post"
                />
              </div>
              <div className="sug-user-info">
                <h1>Jon Smith</h1>
                <div className="sug-bio">
                  Hello! My name is Jon Smith. I am a programmer currently
                  employed at Microsoft. I like to make websites, and have been
                  working on web dev for 5 years now. I hope you guys enjoy some
                  of my work here!
                </div>
              </div>
              <div className="sugg-btn-container">
                <button
                  className="sugg-btn"
                  onClick={() =>
                    this.changeButton("u1Status", this.state.u1Status)
                  }
                >
                  <span>{this.state.u1Status}</span>
                </button>
              </div>
            </div>

            <div className="user">
              <div
                className="profile-pic-container"
                style={{ margin: "15px", border: "1px solid #dbdbdb" }}
              >
                <img
                  className="profile-pic"
                  src={
                    "https://t4.ftcdn.net/jpg/02/89/99/33/240_F_289993382_QJID0KDhWhwp8JX3llcoD8V9jDKAZnpq.jpg"
                  }
                  alt="post"
                />
              </div>
              <div className="sug-user-info">
                <h1>Tessa Samson</h1>
                <div className="sug-bio">
                  Hello! My name is Tessa! I make music! I am a Music teacher at
                  an Elementary School. I love to explore different genres of
                  music and create unique sounding songs.
                </div>
              </div>

              <div className="sugg-btn-container">
                <button
                  className="sugg-btn"
                  onClick={() =>
                    this.changeButton("u2Status", this.state.u2Status)
                  }
                >
                  <span>{this.state.u2Status}</span>
                </button>
              </div>
            </div>

            <div className="user">
              <div
                className="profile-pic-container"
                style={{ margin: "15px", border: "1px solid #dbdbdb" }}
              >
                <img
                  className="profile-pic"
                  src={
                    "https://media.gettyimages.com/photos/portrait-of-japanese-man-picture-id650171629"
                  }
                  alt="post"
                />
              </div>
              <div className="sug-user-info">
                <h1>Suki Ryo</h1>
                <div className="sug-bio">
                  Hello! I am Suki. I am a Japanese Filmaker and I enjoy
                  exploring the Horror Genre. I have released many indie films
                  in the past and am looking to continue working on larger
                  projects. I hope you like what I have worked on!
                </div>
              </div>
              <div className="sugg-btn-container">
                <button
                  className="sugg-btn"
                  onClick={() =>
                    this.changeButton("u3Status", this.state.u3Status)
                  }
                >
                  <span>{this.state.u3Status}</span>
                </button>
              </div>
            </div>
          </div>

          <button
            className="confirm-btn"
            onClick={(e) => this.changeConnection(e)}
          >
            <span>Let's Start!</span>
          </button>
        </div>
      );
    } else if (!isLoaded) {
      return <div> </div>;
    } else if (this.props.type == "comment") {
      return (
        <div>
          {/* <Post
        post={posts[0]}
        title={"aslkdlnknnkssksksksk"}
        genre={"c  mcmcmcmcm"}
      /> */}
          {this.state.comments.map((post) => (
            <Post
              key={post.post_id}
              post={post}
              notifcount={this.props.notifcount}
              notificationid={this.props.notificationid}
            />
          ))}
        </div>
      );
    } else {
      // this.getTitle(125);
      // console.log(this.state.title);
      // var titles = [];
      // var genres = [];

      // for (var i = 0; i < posts.length; i++) {
      //   // console.log(this.getTitle(posts[i].post_id));
      //   titles[i] = this.getTitle(posts[i].post_id);
      //   genres[i] = this.getGenre(posts[i].post_id);
      // }

      // console.log(titles);


      return (
        <div className="posts">
          {posts.map((post) => (
            <Post
              key={post.post_id}
              post={post}
              type={this.props.type}
              notifcount={this.props.notifcount}
              notificationid={this.props.notificationid}
            />
          ))}
        </div>
      );
    }
  }
}
