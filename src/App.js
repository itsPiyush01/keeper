import React from "react";
import Header from "./components/UI/Header/Header";
import Notes from "./components/Notes/Notes";
// import createDate from "../utility/dateFormatter";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Notes />
    </React.Fragment>
  );
}

export default App;
