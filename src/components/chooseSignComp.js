import { Component } from "react";
import "./css/chooseSignComp.css";

let startingPlayer = "Cross";

class ChooseSignComp extends Component {
  render() {
    return (
      <div id="chooseSign">
        <h2 id="chooseSignHeader">Choose your Marker:</h2>
        <div id="chooseSignRadio">
          <input
            id="Cross"
            type="radio"
            onClick={this.chooseCross}
            defaultChecked={true}
          />
          <label id="CrossLabel" htmlFor="Cross">
            Cross
          </label>
          <input id="Circle" type="radio" onClick={this.chooseCircle} />
          <label id="CircleLabel" htmlFor="Circle">
            Circle
          </label>
        </div>
      </div>
    );
  }

  chooseCross = () => {
    const Cross = document.getElementById("Cross");
    const Circle = document.getElementById("Circle");
    if (Cross.checked) {
      Circle.checked = false;
      startingPlayer = "Cross";
    }
  };

  chooseCircle = () => {
    const Cross = document.getElementById("Cross");
    const Circle = document.getElementById("Circle");
    if (Circle.checked) {
      Cross.checked = false;
      startingPlayer = "Circle";
    }
  };
}
export { startingPlayer };

export default ChooseSignComp;
