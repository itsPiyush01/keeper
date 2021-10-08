import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="h1">
        <HighlightIcon />
        Keeper
      </h1>
    </header>
  );
}

export default Header;
