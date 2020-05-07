import React from "react";
import "./App.css";
import "./css/navbar.css";
import "./css/fab.css";
import PostForm from "./Component/PostForm.js";
import Profile from "./Component/Profile.js";
import PostingList from "./Component/PostingList";
import SignUp from "./Component/SignUp";
import FirstTimeLogin from "./Component/FirstTimeLogin";
// import StyleGuide from "./Component/StyleGuide";
import Settings from "./Component/Profile.js";
import ExploreFilter from "./Component/ExploreFilter";
import ExplorePostsList from "./Component/ExplorePostsList";
import NotificationList from "./Component/NotificationList.js";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "main",
      openModal: false,
      dname: "",
      posts: "",
      error: "",
      isLoaded: "",
    };
  }

  togglePage = (toggle) => {
    this.setState({ section: toggle });
  };

  getDname = () => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: sessionStorage.getItem("user"),
        user_id: sessionStorage.getItem("user"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {

        if (result.users[0].name !== null) {
          this.setState({
            dname: result.users[0].name,
          });
          sessionStorage.setItem("dname", result.users[0].name);
        }
      });
  };

  render() {
    if (this.state.dname === "") {
      this.getDname();
    }
    if (this.state.dname === "") {
      return (
        <div>
          <div className="col-md-2 col-1 App-left"></div>
          <div className="col-md-8 col-10 App-middle">
            <FirstTimeLogin togglePage={this.togglePage} />
          </div>
          <div className="col-md-2 col-1 App-right"></div>
        </div>
      );
    } else {
      if (this.state.section === "main") {
        return (
          <div>
            <div className="col-md-2 col-2 App-left"></div>
            <div className="col-md-8 col-7 App-middle">
              <PostingList
                posts={this.props.posts}
                error={this.props.error}
                isLoaded={this.props.isLoaded}
                onMain={"main"}
                notifcount={this.props.notifcount}
                notificationid={this.props.notificationid}
              />
            </div>
            <div className="col-md-2 col-3 App-right"></div>
          </div>
        );
      } else if (this.state.section === "explore") {
        return (
          <div>
            <div className="col-md-2 col-2 App-left"></div>
            <div className="col-md-12 col-10 App-middle">
              <ExploreFilter />
            </div>
          </div>
        );
      } else if (this.state.section === "profile") {
        // FILTER OUT POSTS TO LOGGED IN USER
        let myPosts = [];
        for (var i = 0; i < this.props.posts.length; i++) {
          if (this.props.posts[i].user_id === sessionStorage.getItem("user")) {
            myPosts.push(this.props.posts[i]);
          }
        }
        return (
          <div>
            <div className="col-3 App-left">
              <Profile userid={sessionStorage.getItem("user")} />
            </div>
            <div className="col-9 App-middle profile-posts">
              <PostingList
                posts={myPosts}
                error={this.props.error}
                isLoaded={this.props.isLoaded}
                onMain={"profile"}
                notifcount={this.props.notifcount}
                notificationid={this.props.notificationid}
              />
            </div>
          </div>
        );
      } else if (this.state.section === "notification") {
        return (
          <div>
            <div className="col-md-2 col-2 App-left"></div>
            <div className="col-md-8 col-7 App-middle">
              <NotificationList />
            </div>
            <div className="col-md-2 col-3 App-right"></div>
          </div>
        );
        // } else if (this.state.section === "styleguide") {
        //   return (
        //     <div>
        //       <div className="col-md-2 col-2 App-left"></div>
        //       <div className="col-md-8 col-7 App-middle">
        //         <StyleGuide />
        //       </div>
        //       <div className="col-md-2 col-3 App-right"></div>
        //     </div>
        //   );
      } else {
        return <p>Unidentified Section!</p>;
      }
    }
  }
}

function setMenuOption(mode, maincontent, e) {
  maincontent.current.setState({
    section: mode,
  });
}

function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal,
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      page: "login",
      posts: [],
      error: "",
      isLoaded: false,
      notifcount: "0",
      notificationid: "0",
    };
  }

  componentDidMount() {
    this.loadPosts();
    this.loadNotificationCount();
    // this.clearNotifs();
  }

  loadPosts = () => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getConnectionPosts",
        userid: sessionStorage.getItem("user"),
        showuserposts: true,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //
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
            error: error,
          });
        }
      );
    setTimeout(() => {
      this.loadPosts();
    }, 60000);
  };
  // ----------------------------------Notification Stuff ----------------------------------------------------------
  loadNotificationCount = () => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifactcategory: "Notificationcount",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //
          if (result.user_artifacts) {
            //supposed to change something here.
            this.setState({
              notifcount: result.user_artifacts[0].artifact_url,
              notificationid: result.user_artifacts[0].artifact_id,
            });
          }
        },
        (error) => {
          this.setState({
            //something has to change here.
            error: error,
          });
        }
      );
    setTimeout(() => {
      this.loadNotificationCount();
    }, 5000);
  };
  // ----------------------------------Notification Stuff ----------------------------------------------------------
  togglePage = (toggle) => {
    this.setState({ page: toggle });
  };
  clearNotifs(e) {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("user"),

        artifactcategory: "Notificationcount",
        artifacturl: 0,
        artifactid: this.state.notificationid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.user_artifacts) {
          this.setState({
            notifications: result.user_artifacts,
            notifcount: 0,
          });
        }
      });
  }
  render() {
    let mainContent = React.createRef();
    let folioLogo = require("./logo.svg");
    let search = require("./Images/search.svg");
    let home = require("./Images/home.svg");
    let explore = require("./Images/explore.svg");
    let profile = require("./Images/profile.svg");
    let notification = require("./Images/notification.svg");
    // let styleguide = require("./Images/styleguide.svg");

    if (!sessionStorage.getItem("token")) {
      return (
        <div className="App">
          <div className="row App-body">
            <div className="col-md-2 col-3 App-left"></div>
            <div className="col-md-8 col-6 App-middle">
              <SignUp togglePage={this.togglePage} loadPosts={this.loadPosts} />
            </div>
            <div className="col-md-2 col-3 App-right"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <ul className="row col-12 navbar">
            {/* Folio Home Button */}
            <li className="col-sm-2 col-md-3 col-6 folio-logo">
              <img
                alt=""
                src={folioLogo}
                className="folio-img"
                onClick={(e) => setMenuOption("main", mainContent, e)}
              />
            </li>

            {/* Search Bar
            <div className="col-6 search-bar">
              <li className=" search">
                <form>
                  <input type="text" placeholder="Search"></input>
                  <button type="submit" className="search-button">
                    <img alt="" src={search} className="search-icon" />
                  </button>
                </form>
              </li>
            </div> */}

            {/* New Post Button */}
            <div className="col-sm-10 col-md-9 col-6 page-group">
              <li className="new-post-button">
                <button
                  className="new-post"
                  onClick={(e) => toggleModal(this, e)}
                >
                  <span>New Post</span>
                </button>
              </li>

              {/* Home Button */}
              <li className=" page-button">
                <img
                  alt=""
                  src={home}
                  className="button-icon"
                  onClick={(e) => setMenuOption("main", mainContent, e)}
                />
              </li>

              {/* Explore Page */}
              <li className=" page-button">
                <img
                  alt=""
                  src={explore}
                  className="button-icon"
                  onClick={(e) => setMenuOption("explore", mainContent, e)}
                />
              </li>

              {/* Notification Page */}
              <li className="page-button">
                <img
                  alt=""
                  src={
                    notification
                  } /* Notification bell here ----------------------- */
                  className="button-icon"
                  onClick={(e) => {
                    setMenuOption("notification", mainContent, e);
                    this.clearNotifs(e);
                  }}
                />
                <p className="badge">{this.state.notifcount}</p>
              </li>

              {/* Profile Page */}
              <li className=" page-button">
                <img
                  alt=""
                  src={profile}
                  className="button-icon"
                  onClick={(e) => setMenuOption("profile", mainContent, e)}
                />
              </li>
            </div>
          </ul>
          <div className="row App-body">
            <MainContent
              ref={mainContent}
              posts={this.state.posts}
              error={this.state.error}
              isLoaded={this.state.isLoaded}
              notifcount={this.state.notifcount}
              notificationid={this.state.notificationid}
            />
            <PostForm
              show={this.state.openModal}
              onClose={(e) => toggleModal(this, e)}
              loadPosts={this.loadPosts}
            />
            <div className="fab" onClick={(e) => toggleModal(this, e)}>
              +
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
