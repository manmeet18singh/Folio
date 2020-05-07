import React from "react";
import "../css/modal.css";
import PropTypes from "prop-types";
import PostForm from "./PostForm";

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    // console.log("Modal Show is " + this.props.show);
    if (!this.props.show) {
      return null;
    }
    return (
      // the Modal
      <div id="myModal" className="modal">
        {/* modal content */}
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={this.onClose}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div id="modalcontent">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
