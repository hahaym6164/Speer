import React from "react";
import ReactDOM from "react-dom";
import Calls from "./components/Calls.jsx";
import Header from "./Header.jsx";
import calls from "../calls.json";
const App = () => {
  return (
    <div className="container">
      <Header />
      <Calls data={calls} />
      {calls | JSON} {"calls"}
      <div className="container-view">Some activities should be here</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
