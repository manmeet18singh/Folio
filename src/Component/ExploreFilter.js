import React from "react";
import "../App.css";
import "../css/Explore.css";
import PostingList from "./PostForm.js";
import PostForm from "./PostForm.js";
import Post from "./Post.js";
import ExplorePostsList from "./ExplorePostsList.js";

// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;

//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });

//   Object.values(rest).forEach(val => {
//     val === null && (valid = false);
//   });

//   return valid;
// };

export default class ExploreFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userinput: "null",
      // tagged_ids: []
    };
  }
  // createPost = event => {
  //   this.state.title = this.state.title.concat("~@~");
  //   this.state.caption = this.state.title.concat(this.state.caption);

  //   //keep the form from actually submitting
  //   event.preventDefault();

  //   if (formValid(this.state)) {
  //     //make the api call to the authentication page
  //     fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
  //       method: "post",
  //       body: JSON.stringify({
  //         action: "addOrEditPosts",
  //         user_id: sessionStorage.getItem("user"),
  //         session_token: sessionStorage.getItem("token"),
  //         posttext: this.state.caption,
  //         postpicurl: this.state.url,
  //         posttype: this.state.tag
  //       })
  //     })
  //       .then(res => res.json())
  //       .then(
  //         result => {
  //           this.setState({
  //             apiReturnMessage: result.Status
  //             // post_id: result.Status.slice(-2)
  //           });

  //           // this.addTitle();
  //           // this.addTag();

  //           this.props.loadPosts();
  //           this.onClose();
  //         },
  //         error => {
  //
  //         }
  //       );
  //   }
  // };
  setUserInput(type, exploreForm, e) {
    this.setState({
      userinput: type,
    });
    // console.log("its working");
  }
  render() {
    let search = require("../Images/search.svg");
    let exploreForm = React.createRef();

    if (this.state.userinput === "Art") {
      getUserTags(this.state.userinput);
      return (
        <div>
          <button
            className="tag-button"
            onClick={(e) => this.setUserInput(null, exploreForm, e)}
          >
            Back
          </button>
          <ExplorePostsList valueFromParent={"Art"} />
        </div>
      );
    } else if (this.state.userinput === "Music") {
      getUserTags(this.state.userinput);
      return (
        <div>
          <button
            className="tag-button"
            onClick={(e) => this.setUserInput(null, exploreForm, e)}
          >
            Back
          </button>
          <ExplorePostsList valueFromParent={"Music"} />
        </div>
      );
    } else if (this.state.userinput === "Writing") {
      getUserTags(this.state.userinput);
      return (
        <div>
          <button
            className="tag-button"
            onClick={(e) => this.setUserInput(null, exploreForm, e)}
          >
            Back
          </button>
          <ExplorePostsList valueFromParent={"Writing"} />
        </div>
      );
    } else if (this.state.userinput === "Code") {
      //getUserTags(this.state.userinput);
      return (
        <div>
          <button
            className="tag-button"
            onClick={(e) => this.setUserInput(null, exploreForm, e)}
          >
            Back
          </button>
          <ExplorePostsList valueFromParent={"Code"} />
        </div>
      );
    } else if (this.state.userinput === "Film") {
      getUserTags(this.state.userinput);
      return (
        <div>
          <button
            className="tag-button"
            onClick={(e) => this.setUserInput(null, exploreForm, e)}
          >
            Back
          </button>
          <ExplorePostsList valueFromParent={"Film"} />
        </div>
      );
    }
    return (
      <div className="Explore">
        {/* <p>Does this even work</p> */}
        <button
          className="tag-button"
          onClick={(e) => this.setUserInput("Art", this.exploreForm, e)}
        >
          Art
        </button>
        <button
          className="tag-button"
          onClick={(e) => this.setUserInput("Music", this.exploreForm, e)}
        >
          Music
        </button>
        <button
          className="tag-button"
          onClick={(e) => this.setUserInput("Writing", this.exploreForm, e)}
        >
          Writing
        </button>
        <button
          className="tag-button"
          onClick={(e) => this.setUserInput("Code", this.exploreForm, e)}
        >
          Code
        </button>
        <button
          className="tag-button"
          onClick={(e) => this.setUserInput("Film", this.exploreForm, e)}
        >
          Film
        </button>
        <ExplorePostsList valueFromParent={null} />
        {/* <PostingList ref={this.postingList} type="postingList" /> */}
        {/* This is where the search bar component will be maybe something like
          <SearchBar > */}
      </div>
    );
  }
}

function getUserTags(input) {
  // api call to get users posts or just the tags idk
  fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
    method: "post",
    body: JSON.stringify({
      action: "getPosts",
      max_posts: "10",
      posttype: input,
    }),
  });
}
