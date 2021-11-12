import React from "react";
import ReactDOM from "react-dom";
import Calls from "./components/Calls.jsx";
import Header from "./Header.jsx";
import calls from "../calls.json";
import {Link, Route,withRouter} from 'react-router-dom'
const App = () => {
  return (
    <div className="container">
      <Header />
      <Calls/>
      <div className="container-view">Tah-da!</div>
    </div>
    
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;