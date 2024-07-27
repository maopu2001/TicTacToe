import { Component } from "react";
import "./css/footer.css";

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <code>
          Source Code:{" "}
          <a href="https://github.com/maopu2001/TicTacToe" target="blank">
            Github
          </a>
          <br />
          &copy; M. Aktaruzzaman Opu
        </code>
      </div>
    );
  }
}

export default Footer;
