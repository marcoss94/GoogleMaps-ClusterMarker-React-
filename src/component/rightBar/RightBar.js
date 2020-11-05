import React from "react";
import "../../css/RightBar/RightBar.css";
import RightBarOpen from "./RightBarOpen";
import RightBarClose from "./RightBarClose";
import { ToggleButton } from "./Toggle";

function RightBar({ handleToggle, toggle }) {
  // barra lateral derecha
  return (
    <>
      <section className="rightBar-container">
        <div className={`rightBar-barra ${toggle ? "toggle" : ""}`}>
          <ToggleButton handleToggle={handleToggle} toggle={toggle} />
          {toggle ? (
            <RightBarOpen handleToggle={handleToggle} />
          ) : (
            <RightBarClose handleToggle={handleToggle} />
          )}
        </div>
      </section>
    </>
  );
}

export default RightBar;
