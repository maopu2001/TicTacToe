import "./App.css";
import { Component } from "react";
import TableComp from "./components/tableComp.js";
import ChooseSignComp from "./components/chooseSignComp.js";

class App extends Component {
  render() {
    return (
      <div>
        <h1 id="headline">Tic-Tac-Toe</h1>
        <ChooseSignComp />
        <TableComp />
      </div>
    );
  }
}

export default App;
