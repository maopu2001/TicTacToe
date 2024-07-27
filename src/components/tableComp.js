import React, { Component } from "react";
import "./css/tableComp.css";
import Circle from "./images/circle.png";
import Cross from "./images/cross.png";
import { startingPlayer } from "./chooseSignComp.js";

const CircleColor = ["#f7a5a6", "red"];
const CrossColor = ["#85c0ea", "blue"];
const DrawColor = ["#c7c7c7", "grey"];

const blinkAnimation = "animation: blink 0.5s 3";

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

  // Set the Staring Player
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

    this.player = startingPlayer;
    this.changeColor();
  };

  // this will reset the gameTable
  resetTable = () => {
    const gameTable = document.getElementById("gameTable");
    for (let row of gameTable.rows) {
      for (let cell of row.cells) {
        cell.firstChild.setAttribute("src", "");
        cell.firstChild.setAttribute("name", "");
        cell.firstChild.removeAttribute("style");
      }
    }
  };

  //this will reset the whole webapp
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
    winnerBanner.innerText = "";
    winnerBanner.setAttribute("hidden", true);
    this.changeColor();
  };

  //this will update any cell which is clicked and change the background based on current player
  update_cell = (cell_id) => {
    if (this.winner !== "") return;
    const cell = document.getElementById(cell_id);
    if (cell.getAttribute("name") !== "") return;
    this.setMark(cell, this.player);
    this.getResult();
    this.changePlayer(this.player);
  };

  //this will change the player after each step
  changePlayer = (player) => {
    if (player === "Circle") this.player = "Cross";
    else if (player === "Cross") this.player = "Circle";

    this.changeColor();
  };

  // this will change the background color after each step
  changeColor = () => {
    let player, color, winnerBannerColor;
    if (this.winner === "") player = this.player;
    else player = this.winner;

    if (player === "Circle") {
      color = CircleColor[0];
      winnerBannerColor = CircleColor[1];
    } else if (player === "Cross") {
      color = CrossColor[0];
      winnerBannerColor = CrossColor[1];
    } else if (player === "Draw") {
      color = DrawColor[0];
      winnerBannerColor = DrawColor[1];
    }

    document.querySelector(
      "body"
    ).style.cssText = `background-color: ${color};`;

    const winnerBanner = document.getElementById("winnerBanner");
    winnerBanner.style.cssText = `background-color: ${winnerBannerColor};`;
  };

  // this will set the marker according to the current player
  setMark = (cell, player) => {
    cell.setAttribute("name", player);
    if (player === "Circle") cell.setAttribute("src", Circle);
    else if (player === "Cross") cell.setAttribute("src", Cross);
  };

  // this will find among all the winning combination and check winner and animate the gameTable
  getResult = () => {
    const cellCombination = [
      ["c11", "c12", "c13"],
      ["c21", "c22", "c23"],
      ["c31", "c32", "c33"],
      ["c11", "c21", "c31"],
      ["c12", "c22", "c32"],
      ["c13", "c23", "c33"],
      ["c11", "c22", "c33"],
      ["c13", "c22", "c31"],
    ];

    // checking if there is any winner
    for (let combination of cellCombination) {
      const [a, b, c] = combination;
      const cells = [
        document.getElementById(a),
        document.getElementById(b),
        document.getElementById(c),
      ];
      if (
        cells[0].getAttribute("name") === cells[1].getAttribute("name") &&
        cells[1].getAttribute("name") === cells[2].getAttribute("name") &&
        cells[0].getAttribute("name") !== ""
      ) {
        this.winner = this.player;
        const winnerBanner = document.getElementById("winnerBanner");
        winnerBanner.removeAttribute("hidden");
        winnerBanner.innerText =
          `Congratulations ${String(this.winner).toUpperCase()}.` +
          "\n" +
          `YOU ARE THE WINNER!`;
        winnerBanner.style.cssText = `background-color: ${this.winner};`;
        this.changeColor();
        for (let cell of cells) {
          cell.style.cssText = blinkAnimation;
        }
        return;
      }
    }

    //checking if there is a draw\
    const gameTable = document.getElementById("gameTable");
    for (let row of gameTable.rows) {
      for (let cell of row.cells) {
        if (cell.firstChild.getAttribute("name") === "") return; //Not draw
      }
    }
    //Draw
    this.winner = "Draw";
    const winnerBanner = document.getElementById("winnerBanner");
    winnerBanner.removeAttribute("hidden");
    winnerBanner.innerText = "It's a DRAW!";
    this.changeColor();
  };
}

export default TableComp;
