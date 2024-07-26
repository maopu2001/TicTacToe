import React, { Component } from "react";
import "./css/tableComp.css";
import Circle from "./png/circle.png";
import Cross from "./png/cross.png";
import { startingPlayer } from "./chooseSignComp.js";

const CircleColor = "#f7a5a6";
const CrossColor = "#85c0ea";
const DrawColor = "#c7c7c7";

class TableComp extends Component {
  constructor(props) {
    super(props);
    this.player = "";
    this.winner = "";
  }

  render() {
    return (
      <div>
        <div className="submitBtn">
          <button id="submitBtn" onClick={this.setStaringPlayer}>
            Submit
          </button>
        </div>
        <div className="gameTable" hidden={true}>
          <table id="gameTable" border="1" cellSpacing="0">
            <tbody>
              <tr>
                <td onClick={() => this.update_cell("c11")}>
                  <img id="c11" src="" name="" alt="" />
                </td>
                <td onClick={() => this.update_cell("c12")}>
                  <img id="c12" src="" name="" alt="" />
                </td>
                <td onClick={() => this.update_cell("c13")}>
                  <img id="c13" src="" name="" alt="" />
                </td>
              </tr>
              <tr>
                <td onClick={() => this.update_cell("c21")}>
                  <img id="c21" src="" name="" alt="" />
                </td>
                <td onClick={() => this.update_cell("c22")}>
                  <img id="c22" src="" name="" alt="" />
                </td>
                <td onClick={() => this.update_cell("c23")}>
                  <img id="c23" src="" name="" alt="" />
                </td>
              </tr>
              <tr>
                <td onClick={() => this.update_cell("c31")}>
                  <img id="c31" src="" name="" alt="" />
                </td>
                <td onClick={() => this.update_cell("c32")}>
                  <img id="c32" src="" name="" alt="" />
                </td>
                <td onClick={() => this.update_cell("c33")}>
                  <img id="c33" src="" name="" alt="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="winnerBanner" hidden={true}></div>
        <div className="resetBtn">
          <button id="resetBtn" onClick={this.fullReset} hidden={true}>
            Reset
          </button>
        </div>
      </div>
    );
  }

  setStaringPlayer = () => {
    if (startingPlayer !== "Circle" && startingPlayer !== "Cross") {
      alert("Please Select a Marker");
      return;
    }

    const chooseSign = document.getElementById("chooseSign");
    chooseSign.setAttribute("hidden", true);
    const submitBtn = document.getElementsByClassName("submitBtn")[0];
    submitBtn.setAttribute("hidden", true);
    const gameTable = document.getElementsByClassName("gameTable")[0];
    gameTable.removeAttribute("hidden");
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.removeAttribute("hidden");
    const winnerBanner = document.getElementById("winnerBanner");
    winnerBanner.removeAttribute("hidden");

    this.player = startingPlayer;
    this.changeColor();
  };

  resetTable = () => {
    const gameTable = document.getElementById("gameTable");
    for (let row of gameTable.rows) {
      for (let cell of row.cells) {
        cell.firstChild.setAttribute("src", "");
        cell.firstChild.setAttribute("name", "");
      }
    }
  };

  fullReset = () => {
    this.player = "";
    this.winner = "";
    this.resetTable();
    const chooseSign = document.getElementById("chooseSign");
    chooseSign.removeAttribute("hidden");
    const submitBtn = document.getElementsByClassName("submitBtn")[0];
    submitBtn.removeAttribute("hidden");
    const gameTable = document.getElementsByClassName("gameTable")[0];
    gameTable.setAttribute("hidden", true);
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.setAttribute("hidden", true);
    const winnerBanner = document.getElementById("winnerBanner");
    winnerBanner.setAttribute("hidden", true);
    this.changeColor();
  };

  update_cell = (cell_id) => {
    if (this.winner !== "") return;
    const cell = document.getElementById(cell_id);
    if (cell.getAttribute("name") !== "") return;
    this.setMark(cell, this.player);
    this.getResult();
    this.changePlayer(this.player);
  };

  changePlayer = (player) => {
    if (player === "Circle") this.player = "Cross";
    else if (player === "Cross") this.player = "Circle";

    this.changeColor();
  };

  changeColor = () => {
    let player, color;
    if (this.winner === "") player = this.player;
    else player = this.winner;

    if (player === "Circle") color = CircleColor;
    else if (player === "Cross") color = CrossColor;
    else if (player === "Draw") color = DrawColor;

    document.querySelector(
      "body"
    ).style.cssText = `background-color: ${color};`;
  };

  setMark = (cell, player) => {
    cell.setAttribute("name", player);
    if (player === "Circle") cell.setAttribute("src", Circle);
    else if (player === "Cross") cell.setAttribute("src", Cross);
  };

  getResult = () => {
    const curr_player = this.player,
      c11 = document.getElementById("c11").getAttribute("name"),
      c12 = document.getElementById("c12").getAttribute("name"),
      c13 = document.getElementById("c13").getAttribute("name"),
      c21 = document.getElementById("c21").getAttribute("name"),
      c22 = document.getElementById("c22").getAttribute("name"),
      c23 = document.getElementById("c23").getAttribute("name"),
      c31 = document.getElementById("c31").getAttribute("name"),
      c32 = document.getElementById("c32").getAttribute("name"),
      c33 = document.getElementById("c33").getAttribute("name");

    if (
      (c11 === c12 && c12 === c13 && c11 !== "") ||
      (c21 === c22 && c22 === c23 && c21 !== "") ||
      (c31 === c32 && c32 === c33 && c31 !== "") ||
      (c11 === c21 && c21 === c31 && c11 !== "") ||
      (c12 === c22 && c22 === c32 && c12 !== "") ||
      (c13 === c23 && c23 === c33 && c13 !== "") ||
      (c11 === c22 && c22 === c33 && c11 !== "") ||
      (c13 === c22 && c22 === c31 && c13 !== "")
    ) {
      this.winner = curr_player;
      const winnerBanner = document.getElementById("winnerBanner");
      winnerBanner.innerText = `Congratulations ${this.winner}. You WON!`;
      this.changeColor();
    } else if (
      c11 !== "" &&
      c12 !== "" &&
      c13 !== "" &&
      c21 !== "" &&
      c22 !== "" &&
      c23 !== "" &&
      c31 !== "" &&
      c32 !== "" &&
      c33 !== ""
    ) {
      this.winner = "Draw";
      const winnerBanner = document.getElementById("winnerBanner");
      winnerBanner.innerText = "It's a DRAW!";
      this.changeColor();
    }
  };
}

export default TableComp;
