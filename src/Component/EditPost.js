import React from "react";
import "../App.css";
import "../css/modal.css";
import "../css/postform.css";
import PropTypes from "prop-types";

const urlRegex = new RegExp(
  /(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg))/g
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

export default class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postid: this.props.postId,
      title: this.props.title,
      caption: this.props.text,
      collab: this.props.collab,
      tag: this.props.tag,
      url: this.props.pic,
      time: this.props.time,
      isDisabled: true,

      formErrors: {
        title: "",
        caption: "",
        tag: "",
        url: "",
      },
    };
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  createPost = (event) => {
    this.state.title = this.state.title.concat("~@~");

    if (this.state.collab !== "") {
      this.state.caption = this.state.caption.concat("~*~");
      this.state.caption = this.state.title.concat(
        this.state.caption.concat(this.state.collab)
      );
    } else {
      this.state.caption = this.state.title.concat(this.state.caption);
    }

    //keep the form from actually submitting
    event.preventDefault();

    if (formValid(this.state)) {
      //make the api call to the authentication page
      fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditPosts",
          user_id: sessionStorage.getItem("user"),
          userid: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          postid: this.state.postid,
          timestamp: this.state.time,
          posttext: this.state.caption,
          postpicurl: this.state.url,
          posttype: this.state.tag,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.Status === "SUCCESS - Updated 1 Rows") {
              window.location.reload(false);
            } else {

            }
          },
          (error) => {}
        );
    }
  };

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "title":
        formErrors.title = value.length < 2 ? "Required" : "";
        break;
      case "caption":
        formErrors.caption = value.length < 2 ? "Required" : "";
        break;
      case "tag":
        formErrors.tag = value === "" ? "Required" : "";
        break;
      case "url":
        formErrors.url = urlRegex.test(value) ? "" : "invalid image URL";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });

    this.setState({ formErrors, isDisabled: !formValid(this.state) });
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={this.onClose}>
              &times;
            </span>
            <h2>Edit your project</h2>
          </div>
          <div className="modal-body">
            <div id="modalcontent">
              <form onSubmit={this.createPost}>
                <div className="data-input">
                  <div className="data-label">Name of the Project: </div>
                  <input
                    className={formErrors.title.length > 0 ? "error" : null}
                    name="title"
                    placeholder={this.props.title}
                    onChange={(e) => this.handleChange(e)}
                  ></input>
                  {formErrors.title.length > 0 && (
                    <span className="error-message">{formErrors.title}</span>
                  )}
                </div>

                <div className="data-input">
                  <div className="data-label">Caption: </div>
                  <textarea
                    className={formErrors.caption.length > 0 ? "error" : null}
                    type="text"
                    name="caption"
                    placeholder={this.props.text}
                    onChange={(e) => this.handleChange(e)}
                  />
                  {formErrors.caption.length > 0 && (
                    <span className="error-message">{formErrors.caption}</span>
                  )}
                </div>

                <div className="data-input">
                  <div className="data-label">Collaborators: </div>
                  <input
                    name="collab"
                    placeholder={this.props.collab}
                    onChange={(e) => this.handleChange(e)}
                  ></input>
                </div>

                <div className="data-input">
                  <div className="data-label">Tags: </div>
                  <select
                    className={formErrors.tag.length > 0 ? "error" : null}
                    name="tag"
                    onChange={(e) => this.handleChange(e)}
                  >
                    <option value="">{this.props.tag}</option>
                    <option value="Art">Art</option>
                    <option value="Code">Code</option>
                    <option value="Music">Music</option>
                    <option value="Film">Film</option>
                    <option value="Writing">Writing</option>
                  </select>
                  {formErrors.tag.length > 0 && (
                    <span className="error-message">{formErrors.tag}</span>
                  )}
                </div>

                <div className="data-input">
                  <div className="data-label">URL To Picture: </div>
                  <input
                    className={formErrors.url.length > 0 ? "error" : null}
                    name="url"
                    placeholder={this.props.pic}
                    onChange={(e) => this.handleChange(e)}
                  ></input>
                  {formErrors.url.length > 0 && (
                    <span className="error-message">{formErrors.url}</span>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="submit"
              disabled={this.state.isDisabled}
              className="button post-button"
              onClick={this.createPost}
            >
              <span>Update</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
