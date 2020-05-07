import React from "react";
// import "../css/Styleguide.css";

export default class StyleGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let Weblayout = require("../Images/Styleguide/Web-Layout.jpg");
    let WeblayoutGrid = require("../Images/Styleguide/Web-Layout-Grid.jpg");
    let Mobilelayout = require("../Images/Styleguide/Mobile-Layout.jpg");
    let MobilelayoutLandscape = require("../Images/Styleguide/Mobile-Layout-Landscape.jpg");
    let ErrorMessage = require("../Images/Styleguide/ErrorMessage.svg");

    return (
      <div>
        <div>
          <h1 className="h1-sg">
            <i>Color Palette</i>
          </h1>
          <p>Folio's color palette can be found right in our logo</p>
          <p>
            These first 4 colors are used as accents while Alto Grey is used for
            our site's body
          </p>
          <ul className={"Colors"}>
            <li>
              <p className={"color-names"}>Shakespeare Blue</p>
              <button className={"Blue"}></button>
              <p>Hex: #3399CC</p>
              <p>Hover: #9fCAE0</p>
            </li>
            <li className={"BAY"}>
              <p className={"color-names-East-Bay"}>East Bay</p>
              <button className={"East-Bay"}></button>
              <p>Hex: #4C518C</p>
              <p>Hover: #989AB6</p>
            </li>
            <li className={"Yellow-li"}>
              <p className={"color-names"}>Selective Yellow</p>
              <button className={"Yellow"}></button>
              <p>Hex: #ECA400</p>
              <p>Hover: #F4D693</p>
            </li>
            <li>
              <p className={"color-names"}>Alizarin Crimson</p>
              <button className={"Crimson"}></button>
              <p>Hex: #DA2C38</p>
              <p>Hover: #E37980</p>
            </li>
            <li className={"Black-li"}>
              <p className={"color-names"}>Jet Black</p>
              <button className={"Black"}></button>
              <p>Hex: #000000</p>
            </li>
            <li className={"Grey-li"}>
              <p className={"color-names"}>Alto Grey</p>
              <button className={"Grey"}></button>
              <p>Hex: #DBDBDB</p>
            </li>
            <li className={"ala-li"}>
              <p className={"color-names"}>Alabaster</p>
              <button className={"Ala"}></button>
              <p>Hex: #DBDBDB</p>
            </li>
            <li className={"white-li"}>
              <p className={"color-names"}>White</p>
              <button className={"White"}></button>
              <p>Hex: #DBDBDB</p>
            </li>
          </ul>
        </div>
        <div className={"Buttons"}>
          <p>For our site we use INSERT # button(s)</p>
          <button className={"Example-Button"}>Example</button>
          <p className={"css-section"}>
            <b>CSS:</b> background-color: #3399cc; border: none; color: white;
            padding: 5px 10px; text-align: center; display: inline-block;
            font-size: 15px; transition-duration: 0.4s; cursor: pointer;
            border-radius: 5px; margin-right: 10px;
          </p>
        </div>
        <div>
          <h1 className="h1-sg">
            <i>Typography</i>
          </h1>
          <div className={"fonts"}>
            <h1 className={"header-slab"}>Roboto Slab</h1>
            <div className={"RoBoSlabEx"}>
              <h1 className="h1-sg">
                Ex: The quick brown fox jumps over a lazy dog.
              </h1>
              <p>Roboto Slab is used for headers and the titles of posts</p>
              <p className={"css-section"}>
                <b>CSS: </b>font-family: "Roboto Slab", sans-serif;
              </p>
            </div>
            <h1 className={"header"}>Roboto</h1>
            <div className={"robo"}>
              <h1 className="h1-sg">
                Ex: The quick brown fox jumps over a lazy dog.
              </h1>
              <p>
                Roboto is used for the content of posts and anywhere else that
                their is body text
              </p>
              <p className={"css-section"}>
                <b>CSS: </b>font-family: "Roboto", sans-serif;
              </p>
            </div>
          </div>
        </div>
        <div className="layout">
          <h1 className="h1-sg">
            <i>Layout and posistioning</i>
          </h1>
          <div>
            <h1 className={"Header"}>Web layout</h1>
            <img src={Weblayout} className={"layout"} />
            <p>This is the default layout for Folio.</p>
            <img src={WeblayoutGrid} className={"layout"} />
            <p>
              This layout should be seen when on a user's profile page, the
              explore page, or when viewing a post.
            </p>
            <h1 className={"Header"}>Mobile layout</h1>
            <img src={Mobilelayout} className={"layout-image"} />
            <p>
              Portrait mode on mobile removes both left and right columns to
              maximize screen size
            </p>
            <img src={MobilelayoutLandscape} className={"layout-image"} />
            <p>
              When a mobile device is fliped into landscape mode, Folio's design
              reverts to the same dimensions as the web client.
            </p>
          </div>
        </div>
        <div className={"Errors"}>
          <h1 className="h1-sg">
            <i>Error Messages</i>
          </h1>
          <p>
            Error messages for input boxes will underline the incorrect{" "}
            <u>information</u> in red.
          </p>
          <p>Any other error will display this pop up window.</p>
          <img src={ErrorMessage} className={"Error-image"} />
        </div>
      </div>
    );
  }
}
