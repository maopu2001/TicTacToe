import "./App.css";
import { Component } from "react";
import TableComp from "./components/tableComp.js";
import ChooseSignComp from "./components/chooseSignComp.js";
import Footer from "./components/footer.js";

class App extends Component {
  render() {
    return (
      <div>
        <h1 id="headline">Tic-Tac-Toe</h1>
        <ChooseSignComp />
        <TableComp />
        <Footer />
      </div>
    );
  }
}

export default App;
