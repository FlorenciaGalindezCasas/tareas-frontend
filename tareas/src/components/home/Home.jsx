import React from "react";
import Main from "../main/Main";
import Menu from "../menu/Menu";

function Home() {
  return (
    <div className="d-flex">
      <Menu />
      <div className="main">
        <Main />
      </div>
    </div>
  );
}

export default Home;
