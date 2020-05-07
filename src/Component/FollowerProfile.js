import React from "react";
import "../App.css";
import "../css/followerprofile.css";

export default class FollowerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
    };
    this.fieldChangeHandler.bind(this);
  }

  /*
      fieldChangeHandler(field, e) {
        // console.log("field change");
        this.setState({
          [field]: e.target.value
        });
      }
    
      prefChangeHandler(field, e) {
        // console.log("pref field change " + field);
        // console.log(this.state.favoirtecolor);
        const prefs1 = JSON.parse(JSON.stringify(this.state.favoritecolor));
        // console.log(prefs1);
        prefs1.pref_value = e.target.value;
        // console.log(prefs1);
    
        this.setState({
          [field]: prefs1
        });
      }
    
      componentDidMount() {
        //make the api call to the user API to get the user with all of their attached preferences
        fetch("http://stark.cse.buffalo.edu/hci/usercontroller.php", {
          method: "post",
          body: JSON.stringify({
            action: "getCompleteUsers",
            user_id: this.props.userid
          })
        })
          .then(res => res.json())
          .then(
            result => {
              if (result.users) {
                // console.log(result.users);
                let favoritecolor = "";
    
                // read the user preferences and convert to an associative array for reference
              }
    
              this.setState({
                // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                // try and make the form component uncontrolled, which plays havoc with react
                username: result.users[0].username || "",
                firstname: result.users[0].first_name || "",
                lastname: result.users[0].last_name || ""
              });
            },
            error => {
              
            }
          );
      }
    
      submitHandler = event => {
        //keep the form from actually submitting
        event.preventDefault();
    
        //make the api call to the user controller
        fetch("http://stark.cse.buffalo.edu/hci/usercontroller.php", {
          method: "post",
          body: JSON.stringify({
            action: "addOrEditUsers",
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            user_id: sessionStorage.getItem("user"),
            session_token: sessionStorage.getItem("token"),
            mode: "ignorenull"
          })
        })
          .then(res => res.json())
          .then(
            result => {
              this.setState({
                responseMessage: result.Status
              });
            },
            error => {
              
            }
          );
    
        //make the api call to the user prefs controller
        fetch("http://stark.cse.buffalo.edu/hci/upcontroller.php", {
          method: "post",
          body: JSON.stringify({
            action: "addOrEditUserPrefs",
            prefname: "FavoriteColor",
            prefvalue: this.state.favoritecolor.pref_value,
            prefid: this.state.favoritecolor.pref_id,
            user_id: sessionStorage.getItem("user"),
            session_token: sessionStorage.getItem("token")
          })
        })
          .then(res => res.json())
          .then(
            result => {
              this.setState({
                responseMessage: result.Status
              });
            },
            error => {
              
            }
          );
      };
      */

  render() {
    return (
      <div>
        <div class="profile-left">
          <img
            src={require("../Images/avatar.png")}
            alt="Avatar"
            class="avatar"
          />
          <button> Follow </button>
          <p className="p-prof"> Bio </p>
          <p className="p-prof"> Projects </p>
          <p className="p-prof"> Contact Information </p>

          <button class="settings-btn">
            <img src={require("../Images/gear.svg")} alt="" class="settings" />
          </button>
        </div>
      </div>
    );
  }
}
